const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Ch@1Tucreedrns",
  database: "buildingtheorey",
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0, 
});


module.exports = pool.promise(); 
