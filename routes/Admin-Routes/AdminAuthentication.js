const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const uuid = require('uuid'); //to get JWT_SECRET
const JWT = require('jsonwebtoken');
const conn = require('../../utils/db');
const bcryptjs = require('bcryptjs');

// Nodemailer
const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

//Authentication middleware
const verifyAdmin = (req, res, next) => {
	//Verify User's token
	try {
		const token = req.headers.token;
		const verifyResult = JWT.verify(token, process.env.JWT_SECRET);

		next();
		// return res.send(verifyResult);
	} catch (error) {
		return res.status(401).send('Access Denied');
	}
};

router.post('/api/admin/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const sql = `SELECT * FROM admin_details WHERE email= ?`;

		conn.query(sql, email, async (err, result) => {
			if (err) throw err;
			//If user is not found in DB
			if (!result.length > 0) {
				return res.status(401).send({
					status: 'FAILED',
					message: 'Invalid email or password',
				});
			}

			// Use bcrypt to compare passwords
			bcryptjs.compare(password, result[0].password, (err, response) => {
				if (err) throw err;
				if (!response) {
					return res.status(401).send({
						status: 'FAILED',
						message: 'Invalid email or password',
					});
				}
				// Generate 6-digit token and update db
				const token = uuid.v4().substr(0, 5);
				const sql2 = `UPDATE admin_details SET verification_token='${token}' WHERE email='${result[0].email}' AND password= '${result[0].password}'`;
				conn.query(sql2, async (err, result) => {
					// Send mail for verification
					await transporter.sendMail({
						from: process.env.EMAIL_USER,
						to: email,
						subject: 'Verification Email - Admin Login',
						text: `Your verification token to login is: ${token}`,
					});

					return res.send({
						status: 'PASSED',
						message: 'Authentication successful. Verify your account',
						// data: result[0],
					});
				});
			});
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't login");
	}
});

router.post('/api/admin/verify', async (req, res) => {
	const { tokenValue, userEmail } = req.body;

	try {
		const sql = `SELECT * FROM admin_details WHERE email= ? AND verification_token= ?`;

		conn.query(sql, [userEmail, tokenValue], async (err, result) => {
			if (err) throw err;
			//If user is not found in DB
			if (!result.length > 0) {
				return res.status(401).send({
					status: 'FAILED',
					message: 'Invalid email or verification token',
				});
			}
			const userData = result[0];

			// Generate 6-digit token and update db
			const token = uuid.v4().substr(0, 5);
			const sql2 = `UPDATE admin_details SET verification_token='${token}' WHERE email='${result[0].email}' AND password= '${result[0].password}'`;
			conn.query(sql2, async (err) => {
				// Generate JWT
				if (err) {
					throw err;
				}
				const userToken = JWT.sign(
					{
						email: userData.email,
					},
					process.env.JWT_SECRET,
					{
						expiresIn: '7d',
						issuer: 'Glow Stopper',
					},
				);
				return res.send({
					status: 'PASSED',
					message: 'Verification Successful. You are now logged in',
					userData,
					userToken,
				});
			});
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't verify account");
	}
});

router.post('/api/admin/changePassword', verifyAdmin, (req, res) => {
	let { oldPassword, newPassword, userEmail } = req.body;

	try {
		if (!oldPassword || !newPassword) {
			return res.status(400).send({
				status: 'FAILED',
				message: 'Fields cannot be empty',
			});
		}
		if (oldPassword === newPassword) {
			return res.status(400).send({
				status: 'FAILED',
				message: 'Old password and new password must be different',
			});
		}
		// Find the user
		const sql = `SELECT * FROM admin_details WHERE email= ?`;
		conn.query(sql, userEmail, async (err, result) => {
			if (err) throw err;
			if (!result.length > 0) {
				return res.status(400).send({
					status: 'FAILED',
					message: 'User not found ',
				});
			} else {
				// Confirm if password is correct
				bcryptjs.compare(oldPassword, result[0].password, (err, response) => {
					if (!response) {
						return res.status(401).send({
							status: 'FAILED',
							message: 'Old password is incorrect',
						});
					} else {
						// Hash password
						bcryptjs.genSalt(10, (err, salt) => {
							if (err) {
								throw err;
							}
							bcryptjs.hash(newPassword, salt, (err, hash) => {
								if (err) {
									throw err;
								}
								const sql2 = `UPDATE admin_details SET password='${hash}' WHERE email='${userEmail}'`;
								conn.query(sql2, async (err) => {
									if (err) {
										throw err;
									}
									return res.send({
										status: 'PASSED',
										message: 'Password changed successfully',
									});
								});
							});
						});
					}
				});
			}
		});
	} catch (error) {
		// console.log(error);
		return res.status(500).send("Server Error. Couldn't change password");
	}
});

module.exports = { router, verifyAdmin };
