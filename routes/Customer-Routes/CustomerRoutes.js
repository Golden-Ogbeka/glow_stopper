const express = require('express');
const router = express.Router();
const conn = require('../../utils/db');
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const util = require('util');

// Nodemailer
const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	// secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
	ignoreTLS: true,
});

// Get all product categories for customer
router.get('/api/product/categories', (req, res) => {
	try {
		const sql = `SELECT * FROM product_categories`;
		conn.query(sql, async (err, result) => {
			if (err) throw err;
			const productCategories = result;
			return res.send({
				status: 'PASSED',
				message: 'Product categories retrieved successfully',
				productCategories,
			});
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't get product categories");
	}
});

// Get all products for customers
router.get('/api/products', async (req, res) => {
	try {
		// using node's promisify to get direct results from sql
		const query = util.promisify(conn.query).bind(conn);
		const sql = `SELECT * FROM products WHERE product_stock > 0`;
		const products = await query(sql);
		return res.send({
			status: 'PASSED',
			message: 'Products retrieved successfully',
			products,
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't retrieve products");
	}
});

// Get new products for customers
router.get('/api/products/new', async (req, res) => {
	try {
		// Use ID to determine descending order - 12 products selected
		const sql = `SELECT * FROM products WHERE product_stock > 0 ORDER BY product_id DESC LIMIT 12`;
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
		return res.status(500).send("Server Error. Couldn't retrieve new products");
	}
});

// Get trending products for customers
router.get('/api/products/trending', async (req, res) => {
	try {
		// Use INNER JOIN to combine order and product tables and get product details - Limit to 12 products
		const sql = `SELECT COUNT(orders.product_id), orders.product_id, products.product_name, products.product_desc, products.product_category, products.product_price, products.product_image, products.product_stock FROM orders INNER JOIN products ON orders.product_id = products.product_id WHERE products.product_stock > 0 GROUP BY products.product_id ORDER BY COUNT(products.product_id) DESC LIMIT 12`;
		conn.query(sql, async (err, result) => {
			if (err) throw err;
			let products = result;

			if (!result.length > 0) {
				//if no trending product or orders haven't been made, return 12 general products
				const sql = 'SELECT * FROM products LIMIT 12';
				conn.query(sql, (err, result) => {
					if (err) throw err;
					products = result;
					return res.send({
						status: 'PASSED',
						message: 'Products retrieved successfully',
						products,
					});
				});
			} else {
				// If trending products were found
				return res.send({
					status: 'PASSED',
					message: 'Products retrieved successfully',
					products,
				});
			}
		});
	} catch (error) {
		return res
			.status(500)
			.send("Server Error. Couldn't retrieve trending products");
	}
});

// Get particular Product or Product category
router.get('/api/product', (req, res) => {
	try {
		if (req.query.productID) {
			const sql = `SELECT * FROM products WHERE product_id=? AND product_stock > 0`;
			conn.query(sql, req.query.productID, async (err, result) => {
				if (err) throw err;
				if (result.length > 0) {
					return res.send({
						status: 'PASSED',
						message: 'Product retrieved successfully',
						productDetails: result[0],
					});
				} else {
					return res.status(400).send({
						status: 'FAILED',
						message: 'Product not found',
					});
				}
			});
		} else if (req.query.productCategory) {
			const sql = `SELECT * FROM products WHERE product_category=? AND product_stock > 0`;
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

		// Reduce product inventory based on order
		for (let i = 0; i < trimmedCart.length; i++) {
			const itemQuantity = cartDetails.reduce(
				(total, cartItem) =>
					total + (cartItem.productID === trimmedCart[i].productID),
				0,
			);
			// Get the product
			const sql = `SELECT * FROM products WHERE product_id=${trimmedCart[i].productID}`;
			conn.query(sql, (err, result) => {
				if (err) throw err;
				const product = result[0];

				// Update the product stock
				const sql = `UPDATE products SET product_stock=${
					product.product_stock - itemQuantity
				} WHERE product_id=${trimmedCart[i].productID}`;
				conn.query(sql, (err) => {
					if (err) throw err;
				});
			});
		}

		//Insert order into DB
		const sql = `INSERT INTO orders (order_reference, product_id, product_name,product_image, product_price,product_quantity,customer_name,customer_email,customer_phone_number,customer_address) VALUES (?,?,?,?,?,?,?,?,?,?)`;
		trimmedCart.map((item) =>
			conn.query(
				sql,
				[
					orderReference,
					item.productID,
					item.productName,
					item.productImage,
					item.productPrice,
					cartDetails.reduce(
						(total, cartItem) => total + (cartItem.productID === item.productID),
						0,
					), //For Quantity
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
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_USER,
			subject: 'New order on GlowStopper',
			text: mailContent,
		});

		// Send mail to customer
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
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

router.post('/api/contact', async (req, res) => {
	try {
		const { fullName, email, phoneNumber, message } = req.body;
		if (!fullName || !email || !phoneNumber || !message) {
			return res.status(400).send({
				status: 'FAILED',
				message: 'Please fill all fields',
			});
		}
		const mailContent = `Sender Name: ${fullName}
Sender Email: ${email}
Sender Phone number: ${phoneNumber}

Message:
${message}`;
		// Send mail to admin
		await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: process.env.EMAIL_USER,
			subject: 'New message on GlowStopper',
			text: mailContent,
		});

		// Send Response
		return res.send({
			status: 'PASSED',
			message: 'Message sent',
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send("Server Error. Couldn't send message");
	}
});
module.exports = router;
