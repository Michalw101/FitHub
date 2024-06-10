const pool = require('../DB.js');


async function getPosts(id) {
    try {
        console.log(id);
        const sql = `SELECT * FROM posts where user_id = ?`;
        const result = await pool.query(sql, id);

        console.log(result);

        if (result.length > 0) {
            return { success: true, message: "posts successful", posts: result[0] };
        }
        else {
            console.log("posts not found");
            return { success: false, message: "posts not found" };
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err)
    }
};


async function getAllPosts() {
    try {
        const sql = `SELECT * FROM posts`;
        const result = await pool.query(sql);

        console.log(result[0]);
        console.log('hi ani po');

        if (result.length > 0) {
            return { success: true, message: "posts successful", posts: result[0] };
        }
        else {
            console.log("posts not found");
            throw new Error(err)
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err)
    }
};


async function createPost(body) {
    try {
        body = JSON.parse(body);
        // console.log(`body: ${body}`);
        const { user_id, title } = body;
        const s_body = JSON.stringify(body.body);
        let s_title = JSON.stringify(title);


        const sql = `INSERT INTO posts (user_id, title, body) 
        values(${user_id}, ${s_title}, ${s_body})`;
        const result = await pool.query(sql);
        console.log(result[0].insertId);
        const getResponseSql = `SELECT * FROM posts WHERE post_id = ${result[0].insertId}`;
        const getResponse = await pool.query(getResponseSql);
        if (getResponse.length > 0) {

            return { success: true, message: "post successful", post: getResponse[0][0] };
        }
        else {
            throw new Error("Error :(")
        }
    } catch (err) {
        console.error("Error:", err);
        throw new Error(err)
    }
};

async function deletePost(id) {
    try {
        const sql = `DELETE FROM posts WHERE post_id = ?`;
        const result = await pool.query(sql, [id]);
        return;
    }
    catch (err) {
        console.error('Error deleting post:', err);
        throw new Error(err)
    }
};

async function updatePost(body) {
    // body = JSON.parse(body);
    // const { user_id, post_id } = body;
    // let title, post_body;
    // if (!(typeof body.title === 'string' || body.title instanceof String))
    //     title = JSON.stringify(body.title);
    // else
    //     title = body.title;
    // if (!(typeof body.body === 'string' || body.body instanceof String))
    //     post_body = JSON.stringify(body.body);
    // else
    //     post_body = body.body;

    body = JSON.parse(body);
    const { user_id, post_id } = body;

    const title = (typeof body.title === 'string' || body.title instanceof String) ? body.title : JSON.stringify(body.title);
    const post_body = (typeof body.body === 'string' || body.body instanceof String) ? body.body : JSON.stringify(body.body);

    try {
        const sql = `UPDATE posts SET user_id = ?, title = ? ,body = ? WHERE post_id = ?`;
        const result = await pool.query(sql, [user_id, title, post_body, post_id]);
        // console.log(result[0].insertId);
        const getResponseSql = `SELECT * FROM posts WHERE post_id = ${post_id}`;
        const getResponse = await pool.query(getResponseSql);
        if (getResponse.length > 0) {

            return { success: true, message: "post successful", post: getResponse[0][0] };
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

module.exports = { createPost, updatePost, getPosts, deletePost, getAllPosts }  