const pool = require('../DB.js');

async function getUsers() {
    try {
        const sql = 'SELECT * FROM users';
        const [rows, fields] = await pool.query(sql);
        console.log(rows);
        return rows;
    }
    catch (err) {
        console.log(err);
    }
};

async function getUser(id) {
    try {
        const sql = 'SELECT * FROM users where user_id=?';
        const result = await pool.query(sql, [id]);
        return result[0][0];
    }
    catch (err) {
        console.log(err);
    }
};
async function getUserByQuery(query) {
    try {
        const sql = 'SELECT * FROM todos where ?';
        const [rows, fields] = await pool.query(sql, [query]);
        console.log(rows);
        return rows;

    } catch (err) {
        console.log(err);
    }

}

async function createUser(fullname, username, email, address_id, company_id, phone, website) {
    try {
        const sql = `INSERT INTO users (user_id, fullname, username, email, address_id, company_id, phone, website) 
        values(${fullname}, ${username}, ${email}, ${address_id}, ${company_id}, ${phone}, ${website})`;
        const result = await pool.query(sql);
        return result[0][0];
    }
    catch (err) {
        throw err;
    }
};

async function deleteUser(id) {
    try {
        const sql = `DELETE FROM users WHERE user_id = ?`;
        const result = await pool.query(sql, [id]);
        return result[0][0];
    }
    catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
};

async function updateUser(user_id, fullname, username, email, address_id, company_id, phone, website) {
    try {
        const sql = `UPDATE users SET fullname = ?, username = ?, email= email = ?, address_id = ?, company_id = ?, phone = ?, website = ?
         WHERE user_id = ?`;
        const result = await pool.query(sql, [fullname, username, email, address_id, company_id, phone, website, user_id]);
        return result[0][0];
    }
    catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
};

module.exports = { createUser, updateUser, getUser, getUsers, deleteUser, getUserByQuery }  