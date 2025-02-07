import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise()


async function getAllUsers() { // Returns list of all users
    const [result] = await pool.query("SELECT * FROM users")
    return result;
}

async function getUserFromId(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM users
        WHERE user_id = ?
    `, [id]); //Send parameter as prepared statement for safe handling
    return rows[0];
}

async function createUser(name) { // Returns new id
    const [result] = await pool.query(`
        INSERT INTO
        users (name)
        VALUE (?)
        
    `, [name])
    return result.insertId;
}

const users = await getAllUsers();
console.log(users);

const user = await getUserFromId(5);
console.log(user);

const result = await createUser('Lars');
console.log(result);