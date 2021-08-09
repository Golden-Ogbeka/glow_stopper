import {
	Box,
	Button,
	Grid,
	CircularProgress,
	ButtonGroup,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import axios from 'axios';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { encrypt_key, base_url } from '../../../../app.json';
import AppContext from '../../../../utils/AppContext';
import AdminNavbar from '../../../layout/Admin/AdminNavbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function AdminProductDescription() {
	const { productID } = useParams();
	const { contextVariables, setContextVariables } = React.useContext(AppContext);
	const history = useHistory();
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

	const deleteProduct = async (productID) => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			try {
				let storedSession = JSON.parse(
					localStorage.getItem('sessionDetails_glowStopper'),
				);
				storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
				storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));
				const response = await axios.delete(`/admin/product/${productID}`, {
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
					history.push('/admin/products');
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
				{loading ? (
					<>
						<CircularProgress
							style={{
								padding: 20,
							}}
						/>
					</>
				) : Object.keys(productDetails).length > 0 ? (
					<>
						<Grid container style={{ padding: '3vw' }}>
							<Grid item lg={6} sm={12} xs={12}>
								<img
									src={`${base_url}${productDetails.product_image}`}
									alt='Product'
									style={{
										objectFit: 'cover',
										width: '100%',
										height: '60vh',
										// paddingBottom: 20,
									}}
								/>
							</Grid>
							<Grid
								item
								lg={6}
								sm={12}
								xs={12}
								style={{
									paddingInline: 20,
									paddingTop: 20,
								}}
							>
								<span
									style={{
										fontSize: '5vh',
										fontWeight: 'bold',
										fontFamily: 'Calibri',
									}}
								>
									{productDetails.product_name}
								</span>
								<br />
								<span
									style={{
										fontSize: '4vh',
										fontWeight: 'lighter',
										fontFamily: 'Calibri',
									}}
								>
									{productDetails.product_desc}
								</span>
								<br />
								<br />
								<span
									style={{
										fontSize: '3vh',
										fontWeight: 'lighter',
										fontFamily: 'Calibri',
									}}
								>
									Category: <b>{productDetails.product_category}</b>
								</span>
								<Box
									style={{
										paddingTop: 20,
									}}
								>
									<span
										style={{
											fontSize: 48,
											fontWeight: 'bold',
											fontFamily: 'Calibri',
											color: '#43A047',
										}}
									>
										&#8358;{productDetails.product_price}
									</span>
								</Box>
								<Box
									style={{
										paddingBlock: 20,
									}}
								>
									<span
										style={{
											fontSize: 24,
											fontWeight: 'bold',
											fontFamily: 'Calibri',
											color: '#000000',
										}}
									>
										Product ID: {productDetails.product_id}
									</span>
								</Box>

								<ButtonGroup>
									<Button
										variant='contained'
										style={{
											height: 50,
											backgroundColor: '#5bc0de',
											// borderRadius: 4,
											marginTop: 20,
											color: '#FFFFFF',
										}}
										fullWidth
										startIcon={<Edit />}
										onClick={() =>
											history.push(`/admin/product/edit/${productDetails.product_id}`)
										}
									>
										Edit Product
									</Button>

									<Button
										variant='contained'
										style={{
											height: 50,
											backgroundColor: '#d9534f',
											marginTop: 20,
											color: '#FFFFFF',
										}}
										fullWidth
										startIcon={<Delete />}
										onClick={() => deleteProduct(productDetails.product_id)}
									>
										Delete Product
									</Button>
								</ButtonGroup>
							</Grid>
						</Grid>
					</>
				) : (
					<Box
						style={{
							fontSize: 20,
							padding: 20,
							fontWeight: 'bold',
							fontFamily: 'Calibri',
						}}
					>
						Product not found
						<br />
						<br />
						<span
							style={{
								fontSize: 14,
								// fontWeight: 'bold',
								fontFamily: 'Calibri',
							}}
						>
							View all products with the link below
						</span>
						<br />
						<br />
						<Link
							to='/admin/products'
							style={{
								textDecoration: 'none',
							}}
						>
							<Button
								variant='contained'
								style={{
									backgroundColor: '#E6C200',
									color: '#000000',
									fontFamily: 'Calibri',
									fontSize: 16,
								}}
							>
								All Products
							</Button>
						</Link>
					</Box>
				)}
			</div>
		</>
	);
}

export default AdminProductDescription;
