//initialize variables
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const AdminAuthentication = require('./routes/Admin-Routes/AdminAuthentication');

//setup server
const server = express();

// Helmet
server.use(helmet());

// Routing
server.use('/', [AdminAuthentication]);

// Client
server.use(express.static('build'));
server.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = 5000;
server.listen(port, () => {
	console.log(`Server listening on port: ${port}`);
});

//For accepting form input
server.use(express.json());
server.use(
	express.urlencoded({
		extended: true,
	}),
);

// Enable cors
server.use(cors());

//Setup Database connection
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
