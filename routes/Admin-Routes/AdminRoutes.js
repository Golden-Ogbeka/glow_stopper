const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('./AdminAuthentication');
const conn = require('../../utils/db');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');

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

// Get particular product or product Category
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

// Add new product
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
			const {
				productName,
				productCategory,
				productDescription,
				productPrice,
				productStock,
			} = fields;
			const { productImage } = files;
			const oldPath = productImage.path;
			const primaryIdentifier = uuid.v4().substr(0, 3); //to distinguish images
			const newPath =
				path.resolve(__dirname, '../../', 'uploads/product_images') +
				`/glow_stopper-${primaryIdentifier}-${productImage.name}`;

			// Using Read and write streams
			const rawData = fs.readFileSync(oldPath);

			fs.writeFile(newPath, rawData, (err) => {
				if (err) throw err;
				fs.unlink(oldPath, (err) => {
					if (err) throw err;
					else {
						const productImagePath = `/uploads/product_images/glow_stopper-${primaryIdentifier}-${productImage.name}`;

						const sql = `INSERT INTO products (product_name, product_desc, product_category, product_price, product_image, product_stock) VALUES (?, ?, ?, ?, ?, ?)`;
						conn.query(
							sql,
							[
								productName,
								productDescription,
								productCategory,
								productPrice,
								productImagePath,
								productStock,
							],
							async (err, result) => {
								if (err) throw err;
								return res.send({
									status: 'PASSED',
									message: 'Product added successfully',
									productID: result.insertId,
								});
							}
						);
					}
				});
			});
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
					productStock,
					productID,
				} = fields;
				const { productImage } = files;
				const oldPath = productImage.path;
				const primaryIdentifier = uuid.v4().substr(0, 3); //to distinguish images
				const newPath =
					path.resolve(__dirname, '../../', 'uploads/product_images') +
					`/glow_stopper-${primaryIdentifier}-${productImage.name}`;

				// Using Read and write streams
				const rawData = fs.readFileSync(oldPath);

				fs.writeFile(newPath, rawData, (err) => {
					if (err) throw err;
					fs.unlink(oldPath, (err) => {
						if (err) throw err;
						else {
							const productImagePath = `/uploads/product_images/glow_stopper-${primaryIdentifier}-${productImage.name}`;

							const sql = `UPDATE products SET product_name=?, product_desc=?, product_category=?, product_price=?, product_image=?, product_stock=? WHERE product_id=${productID}`;
							conn.query(
								sql,
								[
									productName,
									productDescription,
									productCategory,
									productPrice,
									productImagePath,
									productStock,
								],
								async (err, result) => {
									if (err) throw err;
									return res.send({
										status: 'PASSED',
										message: 'Product updated successfully',
									});
								}
							);
						}
					});
				});
			} else {
				// No product Image
				const {
					productName,
					productCategory,
					productDescription,
					productPrice,
					productStock,
					productID,
				} = fields;

				const sql = `UPDATE products SET product_name=?, product_desc=?, product_category=?, product_price=?, product_stock=? WHERE product_id=${productID}`;
				conn.query(
					sql,
					[
						productName,
						productDescription,
						productCategory,
						productPrice,
						productStock,
					],

					async (err, result) => {
						if (err) throw err;
						return res.send({
							status: 'PASSED',
							message: 'Product updated successfully',
							productID: result.insertId,
						});
					}
				);
			}
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't update product");
	}
});

// Get all admins
router.get('/api/admins', verifyAdmin, (req, res) => {
	try {
		const sql = `SELECT name, email FROM admin_details`;
		conn.query(sql, async (err, result) => {
			if (err) throw err;
			const admins = result;

			return res.send({
				status: 'PASSED',
				message: 'Admins retrieved successfully',
				admins,
			});
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't retrieve admins");
	}
});

// Add new admin
router.post('/api/admin/new', verifyAdmin, (req, res) => {
	const { adminName, adminEmail, adminPassword } = req.body;
	try {
		const sql = `SELECT * FROM admin_details WHERE email= ?`;
		conn.query(sql, adminEmail, async (err, result) => {
			if (err) throw err;
			else if (result.length > 0) {
				return res.status(400).send({
					status: 'FAILED',
					message: 'Admin already exists',
				});
			} else {
				bcryptjs.genSalt(10, (err, salt) => {
					if (err) {
						throw err;
					}
					bcryptjs.hash(adminPassword, salt, (err, hash) => {
						if (err) {
							throw err;
						} else {
							const sql = `INSERT INTO admin_details (name, email,password) VALUES (?, ?, ?)`;
							conn.query(sql, [adminName, adminEmail, hash], async (err) => {
								if (err) throw err;
								return res.send({
									status: 'PASSED',
									message: 'Admin added successfully',
								});
							});
						}
					});
				});
			}
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't add new admin");
	}
});

// Remove admin
router.delete('/api/admin', verifyAdmin, async (req, res) => {
	const { adminEmail } = req.query;
	try {
		const sql = `SELECT * FROM admin_details WHERE email= ?`;
		conn.query(sql, adminEmail, async (err, result) => {
			if (err) throw err;
			else if (!result.length > 0) {
				return res.status(400).send({
					status: 'FAILED',
					message: 'Admin not found',
				});
			} else {
				const sql = `DELETE FROM admin_details WHERE email= ?`;
				conn.query(sql, adminEmail, async (err) => {
					if (err) throw err;
					return res.send({
						status: 'PASSED',
						message: 'Admin Removed',
					});
				});
			}
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't delete admin");
	}
});

// Delete Product
router.delete('/api/admin/product', verifyAdmin, async (req, res) => {
	const { productID } = req.query;
	try {
		const sql = `SELECT * FROM products WHERE product_id= ?`;
		conn.query(sql, productID, async (err, result) => {
			if (err) throw err;
			else if (!result.length > 0) {
				return res.status(400).send({
					status: 'FAILED',
					message: 'Product not found',
				});
			} else {
				const sql = `DELETE FROM products WHERE product_id= ?`;
				conn.query(sql, productID, async (err) => {
					if (err) throw err;
					return res.send({
						status: 'PASSED',
						message: 'Product Deleted',
					});
				});
			}
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't delete product");
	}
});

// Get Orders
router.get('/api/admin/orders', verifyAdmin, (req, res) => {
	try {
		// Get orders
		const sql = `SELECT * FROM orders`;
		conn.query(sql, async (err, result) => {
			if (err) throw err;
			const orders = result;
			return res.send({
				status: 'PASSED',
				message: 'Details retrieved successfully',
				orders,
			});
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't get orders");
	}
});

// Get all orders for a particular reference
router.get('/api/admin/orders/reference', verifyAdmin, (req, res) => {
	try {
		const { orderReference } = req.query;
		if (!orderReference) {
			return res.status(400).send({
				status: 'FAILED',
				message: 'Order Reference is required',
			});
		}
		const sql = 'SELECT * FROM orders WHERE order_reference=?';
		conn.query(sql, orderReference, (err, result) => {
			if (err) throw err;
			else if (!result.length > 0) {
				return res.status(400).send({
					status: 'FAILED',
					message: 'Order Reference not found',
				});
			} else {
				return res.send({
					status: 'PASSED',
					message: 'Orders retrieved successfully',
					orders: result,
				});
			}
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't get order reference");
	}
});

// Product Categories

// Get a product category
router.get('/api/admin/product/category', verifyAdmin, (req, res) => {
	const { categoryID } = req.query;
	try {
		const sql = `SELECT * FROM product_categories WHERE category_id=${categoryID}`;
		conn.query(sql, async (err, result) => {
			if (err) throw err;
			const productCategory = result[0];
			return res.send({
				status: 'PASSED',
				message: 'Product category retrieved successfully',
				productCategory,
			});
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't get product category");
	}
});

// Get all product categories for admin
router.get('/api/admin/product/categories', verifyAdmin, (req, res) => {
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
		return res
			.status(500)
			.send("Server Error. Couldn't get product categories");
	}
});

// Add new product category
router.post(
	'/api/admin/product/categories',
	verifyAdmin,
	async (req, res, next) => {
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
				const { categoryName, categoryDescription } = fields;
				const { categoryImage } = files;
				const oldPath = categoryImage.path;
				const primaryIdentifier = uuid.v4().substr(0, 3); //to distinguish images
				const newPath =
					path.resolve(__dirname, '../../', 'uploads/product_category_images') +
					`/glow_stopper-${primaryIdentifier}-${categoryImage.name}`;

				// Using Read and write streams
				const rawData = fs.readFileSync(oldPath);

				fs.writeFile(newPath, rawData, (err) => {
					if (err) throw err;
					fs.unlink(oldPath, (err) => {
						if (err) throw err;
						else {
							const categoryImagePath = `/uploads/product_category_images/glow_stopper-${primaryIdentifier}-${categoryImage.name}`;

							const sql = `INSERT INTO product_categories (category_name, category_description, category_image) VALUES (?, ?, ?)`;
							conn.query(
								sql,
								[categoryName, categoryDescription, categoryImagePath],
								async (err, result) => {
									if (err) throw err;
									return res.send({
										status: 'PASSED',
										message: 'Product category added successfully',
										categoryID: result.insertId,
									});
								}
							);
						}
					});
				});

				// Move the image
				// Using file rename strategy
				// fs.rename(oldPath, `${newPath}`, (err) => {
				// 	if (err) throw err;
				// 	else {
				// 		const categoryImagePath = `/uploads/product_category_images/glow_stopper-${primaryIdentifier}-${categoryImage.name}`;

				// 		const sql = `INSERT INTO product_categories (category_name, category_description, category_image) VALUES (?, ?, ?)`;
				// 		conn.query(
				// 			sql,
				// 			[categoryName, categoryDescription, categoryImagePath],
				// 			async (err, result) => {
				// 				if (err) throw err;
				// 				return res.send({
				// 					status: 'PASSED',
				// 					message: 'Product category added successfully',
				// 					categoryID: result.insertId,
				// 				});
				// 			}
				// 		);
				// 	}
				// });
			});
		} catch (error) {
			return res
				.status(500)
				.send("Server Error. Couldn't add product category");
		}
	}
);

//Update product category
router.put('/api/admin/product/category', verifyAdmin, async (req, res) => {
	try {
		const form = formidable({ multiples: false });
		form.parse(req, (err, fields, files) => {
			if (err) {
				return res.status(400).send({
					status: 'FAILED',
					message: "Couldn't upload image",
				});
			}
			if (Object.keys(files).length > 0) {
				//Product image was changed
				const { categoryName, categoryDescription, categoryID } = fields;
				const { categoryImage } = files;
				const oldPath = categoryImage.path;
				const primaryIdentifier = uuid.v4().substr(0, 3); //to distinguish images
				const newPath =
					path.resolve(__dirname, '../../', 'uploads/product_category_images') +
					`/glow_stopper-${primaryIdentifier}-${categoryImage.name}`;

				// Using Read and write streams
				const rawData = fs.readFileSync(oldPath);

				fs.writeFile(newPath, rawData, (err) => {
					if (err) throw err;
					fs.unlink(oldPath, (err) => {
						if (err) throw err;
						else {
							const categoryImagePath = `/uploads/product_category_images/glow_stopper-${primaryIdentifier}-${categoryImage.name}`;

							const sql = `UPDATE product_categories SET category_name=?, category_description=?, category_image=? WHERE category_id=${categoryID}`;
							conn.query(
								sql,
								[categoryName, categoryDescription, categoryImagePath],
								async (err, result) => {
									if (err) throw err;
									return res.send({
										status: 'PASSED',
										message: 'Product category updated successfully',
										categoryID: result.insertId,
									});
								}
							);
						}
					});
				});
			} else {
				// No category Image
				const { categoryName, categoryDescription, categoryID } = fields;

				const sql = `UPDATE product_categories SET category_name=?, category_description=? WHERE category_id=${categoryID}`;
				conn.query(
					sql,
					[categoryName, categoryDescription],

					async (err, result) => {
						if (err) throw err;
						return res.send({
							status: 'PASSED',
							message: 'Product category updated successfully',
							categoryID: result.insertId,
						});
					}
				);
			}
		});
	} catch (error) {
		return res
			.status(500)
			.send("Server Error. Couldn't update product category");
	}
});

// Delete product Category
router.delete('/api/admin/product/category', verifyAdmin, (req, res) => {
	try {
		const { categoryID } = req.query;
		if (!categoryID) {
			return res.status(400).send({
				status: 'FAILED',
				message: 'Category ID is required',
			});
		}
		const sql = `DELETE FROM product_categories WHERE category_id=${categoryID}`;
		conn.query(sql, (err) => {
			if (err) throw err;
			return res.send({
				status: 'PASSED',
				message: 'Product category deleted successfully',
			});
		});
	} catch (error) {
		return res
			.status(500)
			.send("Server Error. Couldn't delete product category");
	}
});

// Get Details for dashboard
router.get('/api/admin/dashboard', verifyAdmin, (req, res) => {
	try {
		// Get orders
		const sql = `SELECT * FROM orders`;
		conn.query(sql, async (err, result) => {
			if (err) throw err;
			const orders = result;

			// Get products
			const sql = `SELECT * FROM products`;
			conn.query(sql, async (err, result) => {
				if (err) throw err;
				const products = result;

				// Get product categories

				const sql = 'SELECT * FROM product_categories';
				conn.query(sql, (err, result) => {
					if (err) throw err;
					const productCategories = result;

					return res.send({
						status: 'PASSED',
						message: 'Details retrieved successfully',
						orders,
						products,
						productCategories,
					});
				});
			});
		});
	} catch (error) {
		return res.status(500).send("Server Error. Couldn't get details");
	}
});
module.exports = router;
