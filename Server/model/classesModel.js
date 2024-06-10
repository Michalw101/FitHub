const pool = require('../DB.js');


async function getAllClasses() {
    try {
        const sql = `SELECT * FROM classes`;
        const result = await pool.query(sql);

        console.log(result);

        if (result.length > 0) {
            return { success: true, message: "Classes successful", classes: result[0] };
        }
        else {
            console.log("Classes not found");
            return { success: false, message: "Classes not found" };
        }
    } catch (err) {
        console.error("Error:", err);
        return { success: false, message: "An error occurred" };
    }
};


async function getClass() {
    // try {
    //     console.log(id);
    //     const sql = `SELECT * FROM todos where user_id = ?`;
    //     const result = await pool.query(sql, id);

    //     console.log(result);

    //     if (result.length > 0) {
    //         return { success: true, message: "Todos successful", todos: result[0] };
    //     }
    //     else {
    //         console.log("Todos not found");
    //         return { success: false, message: "Todos not found" };
    //     }
    // } catch (err) {
    //     console.error("Error:", err);
    //     return { success: false, message: "An error occurred" };
    // }
};

async function createClass(body) {
    // try {
    //     console.log("model todo body" + body);

    //     body = JSON.parse(body);
    //     // console.log(`body: ${body}`);
    //     const { user_id, title, completed } = body;
    //     let s_title = JSON.stringify(title);

    //     console.log("todo user:" + user_id + " title:" + s_title + " completed:" + completed);
    //     const sql = `INSERT INTO todos (user_id, title, completed) 
    //     values(${user_id}, ${s_title}, ${completed})`;
    //     const result = await pool.query(sql);
    //     console.log(result[0].insertId);
    //     const getResponseSql = `SELECT * FROM todos WHERE todo_id = ${result[0].insertId}`;
    //     const getResponse = await pool.query(getResponseSql);
    //     if (getResponse.length > 0) {

    //         return { success: true, message: "todo successful", todo: getResponse[0][0] };
    //     }
    //     else {
    //         throw new Error("Error :(")
    //     }
    // } catch (err) {
    //     console.error("Error:", err);
    //     return { success: false, message: "An error occurred" };
    // }
};

async function deleteClass(id) {
    // try {
    //     console.log('delete todo model');
    //     const sql = `DELETE FROM todos WHERE todo_id = ?`;
    //     const result = await pool.query(sql, [id]);
    //     return;
    // }
    // catch (err) {
    //     console.error('Error deleting todo:', err);
    //     return { success: false, message: "An error occurred" };
    // }
};

async function updateClass(body) {
    // body = JSON.parse(body);
    // const { user_id, completed, todo_id } = body;
    // let title;
    // if (!(typeof body.title === 'string' || body.title instanceof String))
    //     title = JSON.stringify(body.title);
    // else
    //     title = body.title;
    // try {
    //     const sql = `UPDATE todos SET user_id = ?, title = ? ,completed = ? WHERE todo_id = ?`;
    //     const result = await pool.query(sql, [user_id, title, completed, todo_id]);
    //     // console.log(result[0].insertId);
    //     const getResponseSql = `SELECT * FROM todos WHERE todo_id = ${todo_id}`;
    //     const getResponse = await pool.query(getResponseSql);
    //     if (getResponse.length > 0) {

    //         return { success: true, message: "todo successful", todo: getResponse[0][0] };
    //     }
    //     else {
    //         throw new Error("Error :(")
    //     }
    // }
    // catch (err) {
    //     console.error('Error updating todo:', err);
    //     throw err;
    // }
};

module.exports = { createClass, updateClass, getAllClasses, deleteClass, getClass}