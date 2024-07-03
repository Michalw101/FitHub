const pool = require('../DB.js');

async function createWaitingTrainee(body) {
    try {
        console.log("model", body);
        const { trainee_id, class_id} = body;

        const userInsertQuery = `INSERT INTO trainees_waiting_list (trainee_id ,class_id)
              VALUES (?,?)`;
        await pool.query(userInsertQuery, [trainee_id, class_id]);

        console.log("trainee created successfully");
        return { user: body, ok: true };

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          console.log("Error register class: Duplicate entry. You cannot register twice.");
         throw new Error("Error: You cannot register twice.", error);
        } else {
          console.log("Error register class:", error);
          throw new Error("An error occurred while registrating class.");
        }
      }
};

module.exports = {createWaitingTrainee}