import React from 'react';
import {
	Box,
	TextField,
	Button,
	makeStyles,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	CircularProgress,
} from '@material-ui/core';
import AdminNavbar from '../../../layout/Admin/AdminNavbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { encrypt_key, base_url } from '../../../../app.json';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AppContext from '../../../../utils/AppContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginBlock: theme.spacing(1),
			width: '100%',
		},
	},
}));

function AdminAddProduct() {
	const classes = useStyles();
	const { contextVariables, setContextVariables } = React.useContext(AppContext);
	const history = useHistory();

	const [categories, setCategories] = React.useState([]);

	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const getProductCategories = async () => {
			try {
				const response = await axios.get(base_url + '/api/product/categories');

				if (response.data.status === 'PASSED') {
					setCategories(response.data.productCategories);
				}
				setLoading(false);
			} catch (error) {
				setCategories([]);
				setLoading(false);
			}
		};
		getProductCategories();
	}, []);

	const formik = useFormik({
		initialValues: {
			productName: '',
			productCategory: '',
			productPrice: '',
			productDescription: '',
			productImage: '',
			productStock: '',
		},
		validationSchema: Yup.object({
			productName: Yup.string().required('Product name is required'),
			productCategory: Yup.string().required('Product Category is required'),
			productPrice: Yup.number()
				.required('Product Price is required')
				.typeError('Product price must be a number'),
			productDescription: Yup.string().required('Product Description is required'),
			productStock: Yup.number()
				.typeError('Product Stock must be a number')
				.required('Please input product stock'),
		}),
		onSubmit: (values) => {
			addProduct(values);
		},
		enableReinitialize: true,
	});

	const addProduct = async (values) => {
		try {
			let storedSession = JSON.parse(
				localStorage.getItem('sessionDetails_glowStopper'),
			);
			storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
			storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));

			const formData = new FormData();
			formData.append('productName', values.productName);
			formData.append('productCategory', values.productCategory);
			formData.append('productDescription', values.productDescription);
			formData.append('productPrice', values.productPrice);
			formData.append('productImage', values.productImage);
			formData.append('productStock', values.productStock);

			const response = await axios.post(
				base_url + '/api/admin/product',
				formData,
				{
					headers: {
						token: storedSession.userToken,
					},
				},
			);
			if (response.data.status === 'PASSED') {
				setContextVariables({
					...contextVariables,
					feedback: {
						...contextVariables.feedback,
						open: true,
						type: 'success',
						message: response.data.message,
					},
				});
				history.push(`/admin/product/description/${response.data.productID}`);
			} else {
				setContextVariables({
					...contextVariables,
					feedback: {
						...contextVariables.feedback,
						open: true,
						type: 'error',
						message: response.data.message,
					},
				});
			}
		} catch (error) {
			setContextVariables({
				...contextVariables,
				feedback: {
					...contextVariables.feedback,
					open: true,
					type: 'error',
					message:
						error.response.status === 500
							? error.response.data
							: error.response.data.message,
				},
			});
		}
	};

	return (
		<>
			<AdminNavbar />
			<div
				style={{
					minHeight: '100vh',
				}}
			>
				<Box
					style={{
						height: 368,
						backgroundColor: '#000000',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<span
						style={{
							fontFamily: 'Elsie',
							fontWeight: 'bold',
							fontSize: '15vh',
							color: '#FFD700',
						}}
					>
						Admin
					</span>

					<span
						style={{
							fontFamily: 'Calibri',
							fontWeight: 'bold',
							fontSize: 48,
							textAlign: 'center',
							color: '#FFFFFF',
						}}
					>
						Add product
					</span>
				</Box>
				{loading ? (
					<CircularProgress
						style={{
							margin: 20,
						}}
					/>
				) : (
					<>
						<Box
							minHeight='70vh'
							style={{
								paddingTop: '40px',
								paddingInline: '10vw',
								// justifyContent: 'center',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<h2
								style={{
									margin: 0,
									fontSize: 30,
									fontWeight: 'normal',
									fontFamily: 'Calibri',
									marginBottom: '40px',
								}}
							>
								Enter the product details below
							</h2>
							<form className={classes.root} onSubmit={formik.handleSubmit}>
								<TextField
									label='Product name'
									variant='outlined'
									required
									type='text'
									id='productName'
									name='productName'
									placeholder="Enter product's name"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.productName || ''}
									error={formik.touched.productName && formik.errors.productName}
									helperText={
										formik.touched.productName &&
										formik.errors.productName &&
										formik.errors.productName
									}
								/>
								<FormControl variant='outlined'>
									<InputLabel>Product category</InputLabel>
									<Select
										id='productCategory'
										label='Product category'
										name='productCategory'
										placeholder="Select product's category"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.productCategory || ''}
										error={
											formik.touched.productCategory && formik.errors.productCategory
										}
										helperText={
											formik.touched.productCategory &&
											formik.errors.productCategory &&
											formik.errors.productCategory
										}
									>
										{categories.length > 0 ? (
											categories.map((category) => (
												<MenuItem value={`${category.category_name}`}>
													{category.category_name}
												</MenuItem>
											))
										) : (
											<Box
												style={{
													paddingInline: 20,
												}}
											>
												No category registered
											</Box>
										)}
									</Select>
								</FormControl>
								<TextField
									label='Product price'
									variant='outlined'
									required
									type='text'
									id='productPrice'
									name='productPrice'
									placeholder="Enter product's price"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.productPrice || ''}
									error={formik.touched.productPrice && formik.errors.productPrice}
									helperText={
										formik.touched.productPrice &&
										formik.errors.productPrice &&
										formik.errors.productPrice
									}
								/>
								<TextField
									label='Product description'
									variant='outlined'
									required
									type='text'
									multiline
									rows='3'
									id='productDescription'
									name='productDescription'
									placeholder="Enter product's description"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.productDescription || ''}
									error={
										formik.touched.productDescription && formik.errors.productDescription
									}
									helperText={
										formik.touched.productDescription &&
										formik.errors.productDescription &&
										formik.errors.productDescription
									}
								/>
								<TextField
									label='Product stock'
									variant='outlined'
									required
									type='number'
									id='productStock'
									name='productStock'
									placeholder="Enter product's stock"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.productStock || ''}
									error={formik.touched.productStock && formik.errors.productStock}
									helperText={
										formik.touched.productStock &&
										formik.errors.productStock &&
										formik.errors.productStock
									}
								/>
								<Box
									style={{
										borderStyle: 'solid',
										borderWidth: '0.1px',
										display: 'flex',
										flexDirection: 'column',
										borderRadius: 4,
										borderColor: '#C4C4C4',
									}}
								>
									<label
										htmlFor='productImage'
										style={{
											padding: 10,
										}}
									>
										Select a product image
									</label>

									<input
										style={{
											paddingInline: 10,
											paddingBottom: 10,
										}}
										id='productImage'
										type='file'
										accept='image/*'
										multiple={false}
										required
										name='productImage'
										onChange={(e) => {
											const file = e.currentTarget.files[0];
											formik.setFieldValue('productImage', file);
											// formik.handleChange
										}}
										onBlur={formik.handleBlur}
									/>
								</Box>

								<center>
									<Button
										variant='contained'
										style={{
											width: 173,
											height: 57,
											borderRadius: 4,
											marginBlock: '50px',
											color: '#FFFFFF',
											backgroundColor: '#836E00',
										}}
										type='submit'
									>
										Add Product
									</Button>
								</center>
							</form>
						</Box>
					</>
				)}
			</div>
		</>
	);
}

export default AdminAddProduct;
