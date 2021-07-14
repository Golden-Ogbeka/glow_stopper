const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('./AdminAuthentication');
const conn = require('../../utils/db');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const { route } = require('../Customer-Routes/CustomerRoutes');

// Get all products for admin
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

// Get particular product with other products that are similar (in the same category) with it
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
			return res.status(400).send({
				status: 'FAILED',
				message: 'Invalid Product Query',
			});
		}
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't retrieve products");
	}
});

router.post('/api/admin/product', verifyAdmin, (req, res, next) => {
	try {
		const form = formidable({ multiples: false });
		form.parse(req, (err, fields, files) => {
			if (err) {
				next(err);
				return res.status(400).send({
					status: 'FAILED',
					message: "Couldn't upload image",
				});
			}
			const { productName, productCategory, productDescription, productPrice } =
				fields;
			const { productImage } = files;
			const oldPath = productImage.path;
			const primaryIdentifier = uuid.v4().substr(0, 3); //to distinguish images
			const newPath =
				path.resolve(__dirname, '../../', 'uploads/product_images') +
				`/glow_stopper-${primaryIdentifier}-${productImage.name}`;

			// Move the image
			// Using file rename strategy
			fs.rename(oldPath, `${newPath}`, (err) => {
				if (err) throw err;
				else {
					const productImagePath = `/uploads/product_images/glow_stopper-${primaryIdentifier}-${productImage.name}`;

					// Add the new product
					const sql = `INSERT INTO products (product_name, product_desc, product_category, product_price, product_image) VALUES (?, ?, ?, ?, ?)`;
					conn.query(
						sql,
						[
							productName,
							productDescription,
							productCategory,
							productPrice,
							productImagePath,
						],
						async (err, result) => {
							if (err) throw err;
							return res.send({
								status: 'PASSED',
								message: 'Product added successfully',
								productID: result.insertId,
							});
						},
					);
				}
			});

			//Using Read and write streams
			// const rawData = fs.readFileSync(oldPath);

			// fs.writeFileSync(newPath, rawData, (err) => {
			// 	if (err) console.log(err);
			// });
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't add product");
	}
});

//Update product
router.put('/api/admin/product', verifyAdmin, async (req, res, next) => {
	try {
		const form = formidable({ multiples: false });
		form.parse(req, (err, fields, files) => {
			if (err) {
				next(err);
				return res.status(400).send({
					status: 'FAILED',
					message: "Couldn't upload image",
				});
			}
			if (Object.keys(files).length > 0) {
				//Product image was changed
				const {
					productName,
					productCategory,
					productDescription,
					productPrice,
					productID,
				} = fields;
				const { productImage } = files;
				const oldPath = productImage.path;
				const primaryIdentifier = uuid.v4().substr(0, 3); //to distinguish images
				const newPath =
					path.resolve(__dirname, '../../', 'uploads/product_images') +
					`/glow_stopper-${primaryIdentifier}-${productImage.name}`;

				// Move the image
				// Using file rename strategy
				fs.rename(oldPath, `${newPath}`, (err) => {
					if (err) throw err;
					else {
						const productImagePath = `/uploads/product_images/glow_stopper-${primaryIdentifier}-${productImage.name}`;

						// Add the new product
						const sql = `UPDATE products SET product_name=?, product_desc=?, product_category=?, product_price=?, product_image=? WHERE product_id=${productID}`;
						conn.query(
							sql,
							[
								productName,
								productDescription,
								productCategory,
								productPrice,
								productImagePath,
							],
							async (err, result) => {
								if (err) throw err;
								return res.send({
									status: 'PASSED',
									message: 'Product updated successfully',
								});
							},
						);
					}
				});
			} else {
				// No product Image
				const {
					productName,
					productCategory,
					productDescription,
					productPrice,
					productID,
				} = fields;

				// Add the new product
				const sql = `UPDATE products SET product_name=?, product_desc=?, product_category=?, product_price=? WHERE product_id=${productID}`;
				conn.query(
					sql,
					[productName, productDescription, productCategory, productPrice],
					async (err, result) => {
						if (err) throw err;
						return res.send({
							status: 'PASSED',
							message: 'Product updated successfully',
							productID: result.insertId,
						});
					},
				);
			}
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't add product");
	}
});
module.exports = router;
