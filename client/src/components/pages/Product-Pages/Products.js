import { Box, CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import ProductCategoryCard from '../../layout/Products/ProductCategoryCard';
import CustomerNavbar from '../../layout/CustomerNavbar';
import MetaTags from '../../../utils/MetaTags';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { encrypt_key, base_url } from '../../../app.json';

function Products() {
	const [categories, setCategories] = React.useState([]);

	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const getProductCategories = async () => {
			try {
				let storedSession = JSON.parse(
					localStorage.getItem('sessionDetails_glowStopper'),
				);
				storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
				storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));
				const response = await axios.get(base_url + '/api/product/categories', {
					headers: {
						token: storedSession.userToken,
					},
				});

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
	return (
		<>
			<CustomerNavbar />
			<MetaTags
				title='Glow Stopper - Product Categories'
				description='Buy quality and affordable products'
			/>
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
						Top
					</span>

					<span
						style={{
							fontFamily: 'Calibri',
							fontWeight: 'lighter',
							fontSize: 48,
							color: '#FFFFFF',
						}}
					>
						categories
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
						{loading ? (
							<CircularProgress />
						) : (
							<>
								{categories.length > 0 ? (
									<Grid container justify='center' spacing={1}>
										{categories.map((category) => (
											<Grid item lg={4} md={4} sm={12} xs={12}>
												<ProductCategoryCard
													category={category.category_name}
													categoryDescription={category.category_description}
													categoryImage={`${base_url}${category.category_image}`}
												/>
											</Grid>
										))}
									</Grid>
								) : (
									<span
										style={{
											fontSize: 20,
										}}
									>
										No product category found
									</span>
								)}
							</>
						)}
					</Box>
				</Box>
			</div>
		</>
	);
}

export default Products;
