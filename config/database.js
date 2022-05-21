// const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: 'thiskim12!@',
//     database: 'my_db'
// })
//
// module.exports = connection;
//
// connection.query('SELECT * From Users', (error, rows, fields) => {
//    if (error) throw error;
//    console.log("User Info is : ", rows);
// });
//
// connection.end();

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "thiskim12!@", // mysql 초기 설정한 비밀번호
    DB: "my_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
