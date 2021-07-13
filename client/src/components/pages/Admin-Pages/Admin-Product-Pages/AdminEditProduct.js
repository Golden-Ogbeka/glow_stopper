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
import CryptoJS from 'crypto-js';
import { encrypt_key, base_url } from '../../../../app.json';
import AppContext from '../../../../utils/AppContext';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginBlock: theme.spacing(1),
			width: '100%',
		},
	},
}));

function AdminEditProduct() {
	const classes = useStyles();
	const { productID } = useParams();
	const { contextVariables, setContextVariables } = React.useContext(AppContext);

	const [productDetails, setProductDetails] = React.useState({});

	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
		const getProducts = async () => {
			try {
				let storedSession = JSON.parse(
					localStorage.getItem('sessionDetails_glowStopper'),
				);
				storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
				storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));

				const response = await axios.get(`/admin/product?productID=${productID}`, {
					headers: {
						token: storedSession.userToken,
					},
				});
				if (response.data.status === 'PASSED') {
					setProductDetails(response.data.productDetails);
				} else {
					setProductDetails({});
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
				setLoading(false);
			} catch (error) {
				setProductDetails({});
				setLoading(false);
			}
		};
		getProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateProduct = async (e) => {
		e.preventDefault();
		console.log(productDetails);
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
						Edit product
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
						Edit the product details below
					</h2>
					{loading ? (
						<CircularProgress />
					) : (
						<form className={classes.root} onSubmit={(e) => updateProduct(e)}>
							<TextField
								label='Product name'
								variant='outlined'
								required
								type='text'
								value={productDetails.product_name || ''}
								name='product_name'
								onChange={(e) =>
									setProductDetails({
										...productDetails,
										[e.target.name]: e.target.value,
									})
								}
							/>
							<FormControl variant='standard'>
								<InputLabel>Product category</InputLabel>
								<Select
									value={productDetails.product_category || ''}
									name='product_category'
									onChange={(e) =>
										setProductDetails({
											...productDetails,
											[e.target.name]: e.target.value,
										})
									}
								>
									<MenuItem value='DRESSES'>DRESSES</MenuItem>
									<MenuItem value='JEANS'>JEANS</MenuItem>
									<MenuItem value='SHOES'>SHOES</MenuItem>
								</Select>
							</FormControl>
							<TextField
								label='Product price'
								variant='outlined'
								required
								type='text'
								value={productDetails.product_price || ''}
								name='product_price'
								onChange={(e) =>
									setProductDetails({
										...productDetails,
										[e.target.name]: e.target.value,
									})
								}
							/>
							<TextField
								label='Product description'
								variant='outlined'
								required
								type='text'
								multiline
								rows='3'
								value={productDetails.product_desc || ''}
								name='product_desc'
								onChange={(e) =>
									setProductDetails({
										...productDetails,
										[e.target.name]: e.target.value,
									})
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
									Select a product image (optional)
								</label>

								<input
									style={{
										paddingInline: 10,
										paddingBottom: 10,
									}}
									id='productImage'
									type='file'
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
									Save changes
								</Button>
							</center>
						</form>
					)}
				</Box>
			</div>
		</>
	);
}

export default AdminEditProduct;
