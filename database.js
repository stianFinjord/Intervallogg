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

export async function submitWorkout() {

}

const users = await getAllUsers();
console.log(users);

const user = await getUserFromId(5);
console.log(user);

console.log(await getTemplatesByUser(1))
