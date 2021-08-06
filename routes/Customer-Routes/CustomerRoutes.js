const express = require('express');
const router = express.Router();
const conn = require('../../utils/db');
const nodemailer = require('nodemailer');
const uuid = require('uuid');

// Nodemailer
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});
// Get all products for customers
router.get('/api/products', async (req, res) => {
	try {
		const sql = `SELECT * FROM products`;
		conn.query(sql, async (err, result) => {
			if (err) throw err;
			const products = result;
			return res.send({
				status: 'PASSED',
				message: 'Products retrieved successfully',
				products,
			});
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't retrieve products");
	}
});

// Get particular Product or Product category
router.get('/api/product', (req, res) => {
	try {
		if (req.query.productID) {
			const sql = `SELECT * FROM products WHERE product_id=?`;
			conn.query(sql, req.query.productID, async (err, result) => {
				if (err) throw err;
				if (result.length > 0) {
					return res.send({
						status: 'PASSED',
						message: 'Product retrieved successfully',
						productDetails: result[0],
					});
				} else {
					return res.send({
						status: 'FAILED',
						message: 'Product not found',
					});
				}
			});
		} else if (req.query.productCategory) {
			const sql = `SELECT * FROM products WHERE product_category=?`;
			conn.query(sql, req.query.productCategory, async (err, result) => {
				if (err) throw err;
				return res.send({
					status: 'PASSED',
					message: 'Products retrieved successfully',
					products: result,
				});
			});
		} else {
			return res.status(400).send({
				status: 'FAILED',
				message: 'Invalid Product Query',
			});
		}
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't retrieve products");
	}
});

router.post('/api/order', async (req, res) => {
	try {
		const { firstName, lastName, email, phoneNumber, address } = req.body.values;
		const { cartDetails, trimmedCart } = req.body;
		const orderReference = `GSO-${uuid.v4().slice(0, 7)}`;

		const sql = `INSERT INTO orders (order_reference, product_id, product_name,product_image, product_price,customer_name,customer_email,customer_phone_number,customer_address) VALUES (?,?,?,?,?,?,?,?,?)`;
		trimmedCart.map((item) =>
			conn.query(
				sql,
				[
					orderReference,
					item.productID,
					item.productName,
					item.productImage,
					item.productPrice,
					firstName + ' ' + lastName,
					email,
					phoneNumber,
					address,
				],
				async (err) => {
					if (err) throw err;
				},
			),
		);
		// Create mail content with spaces and functions to calculate what is inside cart
		const mailContent = `New order on GlowStopper.
Order Details:

Order Reference: ${orderReference}

Product(s) Details:
${trimmedCart
	.map(
		(item) =>
			`Product ID: ${item.productID} - Product Name: ${
				item.productName
			} - ${cartDetails.reduce(
				(total, cartItem) => total + (cartItem.productID === item.productID),
				0,
			)}pcs - ${new Intl.NumberFormat('en-US').format(
				cartDetails.reduce(
					(total, cartItem) => total + (cartItem.productID === item.productID),
					0,
				) * item.productPrice,
			)} naira`,
	)
	.join('\n')}
Total: ${new Intl.NumberFormat('en-US').format(
			cartDetails.reduce(
				(total, cartItem) => total + Number(cartItem.productPrice),
				0,
			),
		)} naira

Customer Details:
Name: ${firstName} ${lastName}
Email: ${email}
Address: ${address}
Phone: ${phoneNumber}`;

		// Send mail to admin
		await transporter.sendMail({
			from: 'Glow Stopper Admin',
			to: process.env.EMAIL_USER,
			subject: 'New order on GlowStopper',
			text: mailContent,
		});

		// Send mail to customer
		await transporter.sendMail({
			from: 'Glow Stopper Admin',
			to: email,
			subject: 'New order on GlowStopper',
			text: mailContent,
		});

		// Send Response
		return res.send({
			status: 'PASSED',
			message: 'Order successful',
			orderReference: orderReference,
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't place order");
	}
});

module.exports = router;
