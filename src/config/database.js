const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'thiskim12!@',
    database: 'my_db'
})

connection.connect();

connection.query('SELECT * From Users', (error, rows, fields) => {
   if (error) throw error;
   console.log("User Info is : ", rows);
});

connection.end();
