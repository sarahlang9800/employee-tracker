const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Imshort98!',
    database: 'employee_tracker',
})

module.exports = db