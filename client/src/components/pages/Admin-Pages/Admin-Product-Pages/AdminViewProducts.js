import React from 'react';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import AdminNavbar from '../../../layout/Admin/AdminNavbar';
import ProductCard from '../../../layout/Products/ProductCard';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { encrypt_key, base_url } from '../../../../app.json';

function AdminViewProducts() {
	const [products, setProducts] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
		const getProducts = async () => {
			try {
				let storedSession = JSON.parse(
					localStorage.getItem('sessionDetails_glowStopper'),
				);
				storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
				storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));
				const response = await axios.get(base_url + '/api/admin/products', {
					headers: {
						token: storedSession.userToken,
					},
				});

				if (response.data.status === 'PASSED') {
					setProducts(response.data.products);
				}
				setLoading(false);
			} catch (error) {
				setProducts([]);
				setLoading(false);
			}
		};
		getProducts();
	}, []);
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
						All Products
					</span>
				</Box>
				<Box
					style={{
						paddingTop: '40px',
						paddingInline: '5vw',
					}}
				>
					<Grid container justify='flex-start' spacing={2}>
						{loading ? (
							<CircularProgress
								style={{
									padding: 20,
								}}
							/>
						) : products.length > 0 ? (
							products.map((product) => (
								<Grid item lg={4} md={4} sm={12} xs={12} key={product.product_id}>
									<ProductCard
										adminAccess={true}
										productID={product.product_id}
										productName={product.product_name}
										productPrice={product.product_price}
										productImage={`${base_url}${product.product_image}`}
										productStock={product.product_stock}
									/>
								</Grid>
							))
						) : (
							<span
								style={{
									fontSize: 30,
									fontFamily: 'Calibri',
								}}
							>
								No product found
							</span>
						)}
					</Grid>
				</Box>
			</div>
		</>
	);
}

export default AdminViewProducts;
