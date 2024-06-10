const pool = require('../DB.js');


async function getComment(id) {
    try {
        console.log(id);
        const sql = `SELECT * FROM comments where post_id = ?`;
        const result = await pool.query(sql, id);

        console.log(result);

        if (result.length > 0) {
            return { success: true, message: "comment successful", comments: result[0] };
        }
        else {
            console.log("comments not found");
            throw new Error("comments not found")
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err)
    }
};


async function createComment(body) {
    try {
        body = JSON.parse(body);
        // console.log(`body: ${body}`);
        const { post_id, name, email } = body;
        const s_body = JSON.stringify(body.body);
        const s_email = JSON.stringify(email);
        const s_name = JSON.stringify(name);



        const sql = `INSERT INTO comments (post_id, name, email, body)
        values(${post_id}, ${s_name}, ${s_email}, ${s_body})`;
        const result = await pool.query(sql);
        console.log(result[0].insertId);
        const getResponseSql = `SELECT * FROM comments WHERE comment_id = ${result[0].insertId}`;
        const getResponse = await pool.query(getResponseSql);
        if (getResponse.length > 0) {

            return { success: true, message: "comment successful", comment: getResponse[0][0] };
        }
        else {
            throw new Error("Error :(")
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err)
    }
};

async function deleteComment(id) {
    try {
        const sql = `DELETE FROM comments WHERE post_id = ?`;
        const result = await pool.query(sql, [id]);
        return;
    }
    catch (err) {
        console.error('Error deleting post:', err);
        throw new Error(err)
    }
};

async function updateComment(body) {
    body = JSON.parse(body);
    const { post_id } = body;

    const name = (typeof body.name === 'string' || body.name instanceof String) ? body.name : JSON.stringify(body.name);
    const comment_body = (typeof body.body === 'string' || body.body instanceof String) ? body.body : JSON.stringify(body.body);
    const email = (typeof body.email === 'string' || body.email instanceof String) ? body.email : JSON.stringify(body.email);


    try {
        const sql = `UPDATE comments SET name = ?, email = ? ,body = ? WHERE post_id = ?`;
        const result = await pool.query(sql, [name, email, comment_body, post_id]);
        // console.log(result[0].insertId);
        const getResponseSql = `SELECT * FROM comments WHERE post_id = ${post_id}`;
        const getResponse = await pool.query(getResponseSql);
        if (getResponse.length > 0) {

            return { success: true, message: "comment update successful", comment: getResponse[0][0] };
        }
        else {
            throw new Error("Error :(")
        }
    }
    catch (err) {
        console.error('Error updating post:', err);
        throw err;
    }
};

module.exports = { createComment, updateComment, getComment, deleteComment }  