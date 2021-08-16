import { Box, Grid, CircularProgress } from '@material-ui/core';
import React from 'react';
import ProductCard from '../../layout/Products/ProductCard';
import CustomerNavbar from '../../layout/CustomerNavbar';
import { base_url } from '../../../app.json';
import axios from 'axios';
import MetaTags from '../../../utils/MetaTags';

function NewProducts() {
	const [products, setProducts] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await axios.get('/products/new');

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
			<MetaTags
				title='Glow Stopper - New products'
				description='Amazing and brand new products in out inventory'
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
								products.map(
									(product) =>
										product.product_stock > 0 && (
											<Grid item lg={4} md={4} sm={12} xs={12} key={product.product_id}>
												<ProductCard
													productID={product.product_id}
													productName={product.product_name}
													productStock={product.product_stock}
													productPrice={product.product_price}
													productImage={`${base_url}${product.product_image}`}
												/>
											</Grid>
										),
								)
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
