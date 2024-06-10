const pool = require('../DB.js');

async function getInfo(id) {
    try {
        const sql = "SELECT users.user_id, users.fullname, users.username, users.email, users.phone, users.website, addresses.street, addresses.suit, addresses.city, addresses.zipcode, geos.lat, geos.lng, companies.company_name, companies.cathparse, companies.bs FROM users JOIN addresses ON users.address_id = addresses.address_id JOIN geos ON addresses.geo_id = geos.geo_id JOIN companies ON users.company_id = companies.company_id WHERE users.user_id = ?";
        const result = await pool.query(sql, id);
        console.log(result[0][0]);

        if (result.length > 0) {

            return { success: true, message: "info successful", user: result[0][0] };
        }
        else {
            console.log("User not found");
            return { success: false, message: "User not found" };
        }
    } catch (err) {
        console.error("Error:", err);
        return { success: false, message: "An error occurred" };
    }
}

module.exports = { getInfo }  
