import {
	Box,
	Button,
	makeStyles,
	TextField,
	CircularProgress,
} from '@material-ui/core';
import React from 'react';
import {
	useHistory,
	useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import AdminNavbar from '../../../layout/Admin/AdminNavbar';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { encrypt_key } from '../../../../app.json';
import { useFormik } from 'formik';
import AppContext from '../../../../utils/AppContext';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginBlock: theme.spacing(1),
			width: '100%',
		},
	},
}));

function AdminEditProductCategory() {
	const classes = useStyles();
	const { categoryID } = useParams();
	const [loading, setLoading] = React.useState(true);
	const { contextVariables, setContextVariables } = React.useContext(AppContext);

	const [categoryDetails, setCategoryDetails] = React.useState({});

	React.useEffect(() => {
		const getProductCategoryDetails = async () => {
			try {
				let storedSession = JSON.parse(
					localStorage.getItem('sessionDetails_glowStopper'),
				);
				storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
				storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));
				const response = await axios.get(
					`/admin/product/category?categoryID=${categoryID}`,
					{
						headers: {
							token: storedSession.userToken,
						},
					},
				);

				if (response.data.status === 'PASSED') {
					setCategoryDetails(response.data.productCategory);
				}
				setLoading(false);
			} catch (error) {
				setCategoryDetails({});
				setLoading(false);
			}
		};
		getProductCategoryDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const history = useHistory();
	const formik = useFormik({
		initialValues: {
			categoryName: categoryDetails.category_name,
			categoryDescription: categoryDetails.category_description,
			categoryImage: '',
		},
		validationSchema: Yup.object({
			categoryName: Yup.string().required('Category name is required'),
			categoryDescription: Yup.string().required(
				'Category Description is required',
			),
		}),
		onSubmit: (values) => {
			updateProduct(values);
		},
		enableReinitialize: true,
	});

	const updateProduct = async (values) => {
		try {
			let storedSession = JSON.parse(
				localStorage.getItem('sessionDetails_glowStopper'),
			);
			storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
			storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));

			const formData = new FormData();
			formData.append('categoryName', values.categoryName.toUpperCase());
			formData.append('categoryID', categoryID);
			formData.append('categoryDescription', values.categoryDescription);
			formData.append('categoryImage', values.categoryImage);

			const response = await axios.put('/admin/product/category', formData, {
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
						textAlign: 'center',
					}}
				>
					<span
						style={{
							fontFamily: 'Elsie',
							fontWeight: 'bold',
							fontSize: '15vh',
							color: '#FFD700',
							textTransform: 'capitalize',
						}}
					>
						Admin
					</span>

					<span
						style={{
							fontFamily: 'Calibri',
							fontWeight: 'lighter',
							fontSize: 48,
							textAlign: 'center',
							color: '#FFFFFF',
						}}
					>
						Edit product category
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
					{loading ? (
						<CircularProgress />
					) : (
						<>
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
										formik.touched.categoryDescription &&
										formik.errors.categoryDescription
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
										Select the category's image (optional)
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
										Update Category
									</Button>
								</center>
							</form>
						</>
					)}
				</Box>
			</div>
		</>
	);
}

export default AdminEditProductCategory;
