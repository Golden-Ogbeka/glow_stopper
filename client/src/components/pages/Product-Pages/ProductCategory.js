import { Box, CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import ProductCard from '../../layout/Products/ProductCard';
import { useParams } from 'react-router';
import CustomerNavbar from '../../layout/CustomerNavbar';
import { base_url } from '../../../app.json';
import axios from 'axios';
import MetaTags from '../../../utils/MetaTags';

function ProductCategory() {
	const { category } = useParams();
	const [products, setProducts] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await axios.get(`/product?productCategory=${category}`);

				setProducts(response.data.products);
				setLoading(false);
			} catch (error) {
				setProducts([]);
				setLoading(false);
			}
		};
		getProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<CustomerNavbar />
			<MetaTags
				title={`Glow Stopper - ${category} category`}
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
							fontWeight: 'normal',
							fontSize: '10vh',
							color: '#FFD700',
							textAlign: 'center',
							textTransform: 'capitalize',
						}}
					>
						{category.toLowerCase()}
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
						category
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
											<Grid item lg={4} md={4} sm={12} xs={12}>
												<ProductCard
													productName={product.product_name}
													productPrice={product.product_price}
													productStock={product.product_stock}
													productID={product.product_id}
													productImage={`${base_url}${product.product_image}`}
												/>
											</Grid>
										),
								)
							) : (
								<span
									style={{
										fontSize: 20,
										fontFamily: 'Calibri',
									}}
								>
									No product found in this category
								</span>
							)}
						</Grid>
					</Box>
				</Box>
			</div>
		</>
	);
}

export default ProductCategory;
