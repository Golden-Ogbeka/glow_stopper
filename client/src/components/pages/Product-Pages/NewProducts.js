import { Box, Grid, CircularProgress } from '@material-ui/core';
import React from 'react';
import ProductCard from '../../layout/Products/ProductCard';
import CustomerNavbar from '../../layout/CustomerNavbar';
import CryptoJS from 'crypto-js';
import { encrypt_key, base_url } from '../../../app.json';
import axios from 'axios';

function NewProducts() {
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
				const response = await axios.get('/admin/products', {
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
			<CustomerNavbar />
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
							fontWeight: 'normal',
							fontSize: '10vh',
							color: '#FFD700',
							textTransform: 'capitalize',
						}}
					>
						New Products
					</span>
				</Box>
				<Box
					style={{
						minHeight: 559,
						backgroundColor: '#FFFFFF',
					}}
				>
					<Box
						style={{
							paddingBlock: 46,
							paddingInline: '3vw',
						}}
					>
						<Grid container justify='flex-start' spacing={1}>
							{loading ? (
								<CircularProgress />
							) : products.length > 0 ? (
								products.map((product) => (
									<Grid item lg={4} md={4} sm={12} xs={12} key={product.product_id}>
										<ProductCard
											productID={product.product_id}
											productName={product.product_name}
											productPrice={product.product_price}
											productImage={`${base_url}${product.product_image}`}
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
									No trending product
								</span>
							)}
						</Grid>
					</Box>
				</Box>
			</div>
		</>
	);
}

export default NewProducts;
