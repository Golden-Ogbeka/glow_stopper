const mysql = require('mysql');

const conn = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB,
});
try {
	conn.connect((err) => {
		if (err) throw err;
		console.log('Database connected');
	});
} catch (error) {
	console.log("Couldn't connect to database");
}

module.exports = conn;
