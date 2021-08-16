import React from 'react';
import { Box, TextField, Button, makeStyles } from '@material-ui/core';
import AdminNavbar from '../../../layout/Admin/AdminNavbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { encrypt_key } from '../../../../app.json';
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

function AdminNewProductCategory() {
	const classes = useStyles();
	const { contextVariables, setContextVariables } = React.useContext(AppContext);
	const history = useHistory();
	const formik = useFormik({
		initialValues: {
			categoryName: '',
			categoryDescription: '',
			categoryImage: '',
		},
		validationSchema: Yup.object({
			categoryName: Yup.string().required('Category name is required'),
			categoryDescription: Yup.string().required(
				'Category Description is required',
			),
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
			formData.append('categoryName', values.categoryName);
			formData.append('categoryDescription', values.categoryDescription);
			formData.append('categoryImage', values.categoryImage);

			const response = await axios.post('/admin/product/categories', formData, {
				headers: {
					token: storedSession.userToken,
				},
			});
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
				history.push('/admin/product/categories');
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
							color: '#FFFFFF',
						}}
					>
						Add Product Category
					</span>
				</Box>
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
						Enter the product category details below
					</h2>
					<form className={classes.root} onSubmit={formik.handleSubmit}>
						<TextField
							label='Category name'
							variant='outlined'
							required
							type='text'
							id='categoryName'
							name='categoryName'
							placeholder="Enter category's name"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.categoryName || ''}
							error={formik.touched.categoryName && formik.errors.categoryName}
							helperText={
								formik.touched.categoryName &&
								formik.errors.categoryName &&
								formik.errors.categoryName
							}
						/>

						<TextField
							label='Category description'
							variant='outlined'
							required
							type='text'
							multiline
							rows='3'
							id='categoryDescription'
							name='categoryDescription'
							placeholder="Enter category's description"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.categoryDescription || ''}
							error={
								formik.touched.categoryDescription && formik.errors.categoryDescription
							}
							helperText={
								formik.touched.categoryDescription &&
								formik.errors.categoryDescription &&
								formik.errors.categoryDescription
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
								htmlFor='categoryImage'
								style={{
									padding: 10,
								}}
							>
								Select the category's image
							</label>

							<input
								style={{
									paddingInline: 10,
									paddingBottom: 10,
								}}
								id='categoryImage'
								type='file'
								accept='image/*'
								multiple={false}
								required
								name='categoryImage'
								onChange={(e) => {
									const file = e.currentTarget.files[0];
									formik.setFieldValue('categoryImage', file);
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
								Add Category
							</Button>
						</center>
					</form>
				</Box>
			</div>
		</>
	);
}

export default AdminNewProductCategory;
