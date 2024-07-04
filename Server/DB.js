const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'project_db',
  password: 'Michal2024',
  // password: 'michal',
}).promise();

module.exports = pool;