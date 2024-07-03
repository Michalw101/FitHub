const pool = require('../DB')

async function updateAdmin(body, id){
    try{
        const user_id = id;
        const { first_name, last_name, email, phone} = body;
        const userSql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ? WHERE user_id = ?`;
        await pool.query(userSql, [first_name, last_name, email, phone, user_id]);
        return { success: true, message: "Admin updated successfully", admin: body };

    }catch(error){
        console.error("Error updating Admin:", error);
        throw error;
    }
}

module.exports ={updateAdmin}