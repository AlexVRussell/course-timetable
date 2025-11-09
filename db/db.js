const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Spar@5180*",
  database: "hackathon2_db",
  charset: "utf8mb4"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");
  connection.query("SELECT * FROM courses", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});

module.exports = connection;
