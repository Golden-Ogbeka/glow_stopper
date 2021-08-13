import React from 'react';
import { Box, Button, Grid, CircularProgress } from '@material-ui/core';
import LogoComponent from '../layout/LogoComponent';
import ProductCard from '../layout/Products/ProductCard';
import { Link } from 'react-router-dom';
import CustomerNavbar from '../layout/CustomerNavbar';
import { base_url } from './../../app.json';
import axios from 'axios';

function Homepage() {
	const [products, setProducts] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await axios.get('/products');

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
					<LogoComponent />
					<Box paddingTop='18px'>
						<span
							style={{
								fontFamily: 'Calibri',
								fontWeight: 'lighter',
								fontSize: 30,
								color: '#FFFFFF',
							}}
						>
							Home of all products
						</span>
					</Box>
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
						<h2
							style={{
								color: '#000000',
								fontFamily: 'Calibri',
								fontWeight: 'bold',
								fontSize: 36,
								marginTop: 0,
								marginBottom: 40,
							}}
						>
							Trending Products
						</h2>
						<Grid container justify='flex-start' spacing={1}>
							{loading ? (
								<CircularProgress />
							) : products.length > 0 ? (
								products.slice(0, 3).map((product) => (
									<Grid item lg={4} md={4} sm={12} xs={12} key={product.product_id}>
										<ProductCard
											productID={product.product_id}
											productName={product.product_name}
											productPrice={product.product_price}
											productStock={product.product_stock}
											productImage={`${base_url}${product.product_image}`}
										/>
									</Grid>
								))
							) : (
								<Box
									style={{
										fontSize: 30,
										fontFamily: 'Calibri',
										padding: 20,
									}}
								>
									No product found
								</Box>
							)}
						</Grid>
						<center>
							<Link
								to='/products/trending'
								style={{
									textDecoration: 'none',
								}}
							>
								<Button
									variant='contained'
									style={{
										backgroundColor: '#000000',
										color: '#FFFFFF',
										fontFamily: 'Calibri',
										fontSize: 16,
									}}
								>
									View More
								</Button>
							</Link>
						</center>
					</Box>
				</Box>
				<Box
					style={{
						minHeight: 559,
						backgroundColor: '#E6C200',
					}}
				>
					<Box
						style={{
							paddingBlock: 46,
							paddingInline: '3vw',
						}}
					>
						<h2
							style={{
								color: '#000000',
								fontFamily: 'Calibri',
								fontWeight: 'bold',
								fontSize: 36,
								marginBottom: 40,
								marginTop: 0,
							}}
						>
							New Releases
						</h2>
						<Grid container justify='flex-start' spacing={1}>
							{loading ? (
								<CircularProgress />
							) : products.length > 0 ? (
								products.slice(0, 3).map((product) => (
									<Grid item lg={4} md={4} sm={12} xs={12} key={product.product_id}>
										<ProductCard
											productID={product.product_id}
											productName={product.product_name}
											productStock={product.product_stock}
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
									No product found
								</span>
							)}
						</Grid>
						<center>
							<Link
								to='/products/new'
								style={{
									textDecoration: 'none',
								}}
							>
								<Button
									variant='contained'
									style={{
										backgroundColor: '#000000',
										color: '#FFFFFF',
										fontFamily: 'Calibri',
										fontSize: 16,
									}}
								>
									View More
								</Button>
							</Link>
						</center>
					</Box>
				</Box>
			</div>
		</>
	);
}

export default Homepage;
