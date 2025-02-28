import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise()


export async function getAllUsers() { // Returns list of all users
    const [result] = await pool.query("SELECT * FROM users")
    return result;
}

export async function getUserFromId(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        WHERE user_id = ?
    `, [id]); //Send parameter as prepared statement for safe handling
    return rows[0];
}

export async function createUser(name) { // Returns new id
    const [result] = await pool.query(`
        INSERT INTO
        users (name)
        VALUE (?)
        
    `, [name])
    return getUserFromId(result.insertId);
}

export async function getTemplatesByUser(user_id) {
    const [result] = await pool.query(`
        SELECT *
        FROM interval_templates
        WHERE user_id = ?
    `, [user_id])
    return result;
}

export async function getTemplateFromId(template_id) {
    const [result] = await pool.query(`
        SELECT *
        FROM interval_templates
        WHERE template_id = ?
    `, [template_id])
    return result;
}

export async function createTemplate( {user_id, work_time, rest_time, name, number_of_intervals}) {
    const [result] = await pool.query(`
        INSERT INTO
        interval_templates (user_id, work_time, rest_time, name, 
	        number_of_intervals)
        VALUES (?, ?, ?, ?, ?)
    `, [user_id, work_time, rest_time, name, number_of_intervals])
    return getTemplateFromId(result.insertId)
}

export async function submitWorkoutDrags(workout_id, workout) {
    const values = []
    let placeholder = "";
    for(const row of workout) {
        values.push(
            workout_id,
            row.work_time,
            row.rest_time,
            row.pulse,
            row.meters_per_hour,
            row.incline_percent_tenths,
            row.rpe,
        )
        placeholder += "(?, ?, ?, ?, ?, ?, ?),"
    }
    placeholder = placeholder.slice(0,-1) //Remove last comma
    console.log(placeholder)
    console.log(values)
    const [result] = await pool.query(`
        INSERT INTO
        drags (workout_id, work_time, rest_time, 
            pulse, meters_per_hour, incline_percent_tenths, rpe)
        VALUES ${ placeholder }
    `, values)
    return result;
}

export async function submitWorkoutComment(user_id, comment) { //Returns workout ID
    //find current time
    const [result] = await pool.query(`
        INSERT INTO
        workouts (user_id, comment, timestamp)
        VALUES (?, ?, CURRENT_TIMESTAMP)
    `, [user_id, comment])
    return result.insertId;
}

export async function submitWorkout(user_id, comment, drags) {
    await pool.query('BEGIN')
    try {
        const [workout_result] = await pool.query(`
            INSERT INTO
            workouts (user_id, comment, timestamp)
            VALUES (?, ?, CURRENT_TIMESTAMP) 
        `, [user_id, comment])

        
        // Inject workout_id
        const newWorkoutId = workout_result.insertId
        const dragsWithId = drags.map(drag => ({
            ...drag,
            workout_id: newWorkoutId
        }))

        const {queryString: query, values: vals} = await queryFlattener("drags", dragsWithId)
        await pool.query(query, vals)
        await pool.query('COMMIT')
        return {
            "message": "Workout stored successfully", 
            workout_id: newWorkoutId
        }
    } catch(error) {
        await pool.query('ROLLBACK')
        console.error("DB Error: ", error.sqlMessage || error.message)
        throw error
    }
}

async function queryFlattener(tablename, data) {
    const values = data.flatMap(obj => Object.values(obj))
    const placeholderSingle = "(" + "?, ".repeat((Object.keys(data[0]).length)-1) + "?)"
    const placeholder = (placeholderSingle + ", ").repeat(data.length-1) + placeholderSingle
    const queryString = `
        INSERT INTO
        ${tablename} (${Object.keys(data[0]).join(", ")})
        VALUES ${placeholder}
    `
    return {queryString, values}
}


