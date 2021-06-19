const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const uuid = require('uuid'); //to get JWT_SECRET

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

router.post('/api/admin/login', async (req, res) => {
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

router.post('/api/admin/verify', async (req, res) => {
	const { tokenValue, userEmail } = req.body;
	console.log(req.body);
	try {
		const sql = `SELECT * FROM admin_details WHERE email= ? AND verification_token= ?`;

		conn.query(sql, [userEmail, tokenValue], async (err, result) => {
			const userData = result[0];
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
					userData,
				});
			});
			console.log(result);
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send("Server Error. Couldn't verify account");
	}
});

module.exports = router;
