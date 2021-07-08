const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('./AdminAuthentication');
const conn = require('../../utils/db');

router.get('/api/admin/products', verifyAdmin, async (req, res) => {
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

router.get('/api/admin/product', verifyAdmin, (req, res) => {
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
			return res.status(401).send({
				status: 'FAILED',
				message: 'Invalid Product Query',
			});
		}
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't retrieve products");
	}
});

module.exports = router;
