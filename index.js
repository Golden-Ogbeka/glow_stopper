//initialize variables
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const uuid = require('uuid'); //to get JWT_SECRET
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
//setup server
const server = express();

// server.use(express.static('build'));
// server.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// 	// res.send('OK');
// });

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

// Nodemailer
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: 'ogbekagolden@gmail.com',
		pass: 'UNequiv0cal',
	},
});

//setup middleware
const verifyUser = (req, res) => {
	//Verify User's token
	try {
		const token = req.headers.authorization.split(' ')[1];
		const result = jwt.verify(token, process.env.JWT_SECRET);
		return res.send(result);
	} catch (error) {
		return res.send('User not logged in');
	}
};

// Homepage
server.get('/', (req, res) => {
	res.send('Public page');
});

//User Profile
server.get('/api/user', verifyUser, (req, res) => {
	res.send('Private page');
});

//User Login
server.post('/api/user', (req, res) => {
	//User inputs username and password
	const { username, password } = req.body;
	//Verify if the user is registered
	try {
		const sql = `SELECT * FROM users WHERE username= ? AND password= ?`;
		conn.query(sql, [username, password], (err, result) => {
			if (err) throw err;
			//If user is not found in DB
			if (!result.length > 0) {
				return res.send('Invalid username or password');
			}
			//If user is found, setup jwt
			const token = jwt.sign({ user: username }, process.env.JWT_SECRET, {
				expiresIn: '3d',
				issuer: 'Composite Tech',
			});
			res.send(token);
		});
	} catch (error) {
		console.log(error);
	}
});

server.post('/admin/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const sql = `SELECT * FROM admin_details WHERE email= ? AND password= ?`;

		conn.query(sql, [email, password], async (err, result) => {
			if (err) throw err;
			//If user is not found in DB
			if (!result.length > 0) {
				return res.send({
					status: 'FAILED',
					message: 'Invalid email or password',
				});
			}

			// Generate 6-digit token and update db
			const token = await uuid.v4().substr(0, 5);
			const sql2 = `UPDATE admin_details SET verification_token='${token}' WHERE email='${result[0].email}' AND password= '${result[0].password}'`;
			conn.query(sql2, async (err, result) => {
				// Send mail for verification
				await transporter.sendMail({
					from: 'Glow Stopper Admin',
					to: email,
					subject: 'Verification Email',
					text: `Your verification code is: ${token}`,
				});

				return res.send({
					status: 'PASSED',
					message: 'Authentication successful. Verify your account',
					// data: result[0],
				});
			});
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't login");
	}
});

server.post('/admin/verify', async (req, res) => {
	const { tokenValue, userEmail } = req.body;
	try {
		const sql = `SELECT * FROM admin_details WHERE email= ? AND verification_token= ?`;

		conn.query(sql, [userEmail, tokenValue], async (err, result) => {
			if (err) throw err;
			//If user is not found in DB
			if (!result.length > 0) {
				return res.send({
					status: 'FAILED',
					message: 'Invalid token',
				});
			}

			// Generate 6-digit token and update db
			const token = await uuid.v4().substr(0, 5);
			const sql2 = `UPDATE admin_details SET verification_token='${token}' WHERE email='${result[0].email}' AND password= '${result[0].password}'`;
			conn.query(sql2, async (err, result) => {
				return res.send({
					status: 'PASSED',
					message: 'Verification Successful',
				});
			});
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send("Server Error. Couldn't verify account");
	}
});
