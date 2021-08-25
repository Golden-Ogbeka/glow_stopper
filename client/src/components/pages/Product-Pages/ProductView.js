import { Box, Button, Grid, CircularProgress } from '@material-ui/core';
import { ArrowBack, Share, ShoppingCartOutlined } from '@material-ui/icons';
import axios from 'axios';
import React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import CustomerNavbar from '../../layout/CustomerNavbar';
import ProductCard from '../../layout/Products/ProductCard';
import { base_url } from '../../../app.json';
import AppContext from '../../../utils/AppContext';
import MetaTags from '../../../utils/MetaTags';
import ShareProductModal from '../../layout/ShareProductModal';

function ProductView() {
	const { productID } = useParams();
	const { contextVariables, setContextVariables } = React.useContext(AppContext);

	const history = useHistory();

	const [productDetails, setProductDetails] = React.useState({});
	const [similarProducts, setSimilarProducts] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	const [shareDialogState, setShareDialogState] = React.useState({
		state: false,
		url: '',
	});

	const openShareDialog = (url) => {
		setShareDialogState({
			...shareDialogState,
			state: true,
			url: url,
		});
	};

	const closeShareDialog = () => {
		setShareDialogState({
			...shareDialogState,
			state: false,
		});
	};

	React.useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await axios.get(
					`${base_url}/api/product?productID=${productID}`,
				);

				if (response.data.status === 'PASSED') {
					setProductDetails(response.data.productDetails);
					// Get similar products
					const response2 = await axios.get(
						`${base_url}/api/product?productCategory=${response.data.productDetails.product_category}`,
					);

					// Filter products that aren't this product
					const uniqueSimilarProducts = response2.data.products.filter(
						(similarProduct) => similarProduct.product_id.toString() !== productID,
					);

					setSimilarProducts(uniqueSimilarProducts);
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
				setSimilarProducts([]);
				setLoading(false);
			}
		};
		getProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const addToCart = async () => {
		if (productDetails.product_stock <= 0) {
			return setContextVariables({
				...contextVariables,
				feedback: {
					...contextVariables.feedback,
					open: true,
					type: 'error',
					message: 'Item stock limit reached',
				},
			});
		} else {
			const productDetailsUpdated = {
				productID: productDetails.product_id,
				productImage: `${base_url}${productDetails.product_image}`,
				productName: productDetails.product_name,
				productPrice: productDetails.product_price,
				productStock: productDetails.product_stock,
			};
			if (JSON.parse(localStorage.getItem('cart_glowStopper'))) {
				// If cart is not empty
				localStorage.setItem(
					'cart_glowStopper',
					JSON.stringify([
						...JSON.parse(localStorage.getItem('cart_glowStopper')),
						productDetailsUpdated,
					]),
				);
				setContextVariables({
					...contextVariables,
					cartItems: [...contextVariables.cartItems, productDetailsUpdated],
				});
			} else {
				localStorage.setItem(
					'cart_glowStopper',
					JSON.stringify([productDetailsUpdated]),
				);
				// Set timeout for cart
				localStorage.setItem(
					'cart_glowStopper_timeout',
					JSON.stringify(Date.now() + 86400000),
				);
				setContextVariables({
					...contextVariables,
					cartItems: [...contextVariables.cartItems, productDetailsUpdated],
				});
			}
		}
	};
	return (
		<>
			<CustomerNavbar />
			<MetaTags
				title={`Glow Stopper - ${productDetails.product_name}`}
				description='Buy quality and affordable products'
				noIndex={true}
			/>
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
						<Box
							display='flex'
							justifyContent='space-between'
							alignItems='center'
							paddingTop='30px'
							paddingLeft='5vw'
							paddingRight='5vw'
							paddingBottom='30px'
						>
							<Link
								style={{
									alignItems: 'center',
									display: 'flex',
									textDecoration: 'none',
								}}
								onClick={() => history.goBack()}
								// to='#/'
							>
								<ArrowBack
									style={{
										paddingRight: 10,
									}}
								/>
								<span
									style={{
										paddingRight: 10,
										fontSize: 20,
										fontWeight: 'normal',
										fontFamily: 'Calibri',
									}}
								>
									back
								</span>
							</Link>

							{contextVariables.cartItems?.find(
								(item) => item.productID === productDetails.product_id,
							) ? (
								<Box
									style={{
										fontFamily: 'Calibri',
										fontWeight: '600',
										fontSize: 16,
										textTransform: 'uppercase',
										paddingRight: 20,
									}}
								>
									Added to cart
								</Box>
							) : (
								<Button
									variant='contained'
									style={{
										backgroundColor: '#836E00',
										color: '#FFFFFF',
									}}
									onClick={() => addToCart(productDetails)}
								>
									Add to Cart
								</Button>
							)}
						</Box>
						<Box paddingLeft='5vw' paddingRight='5vw'>
							<img
								src={`${base_url}${productDetails.product_image}`}
								alt='Product'
								style={{
									objectFit: 'cover',
									width: '100%',
									height: '600px',
									paddingBottom: 30,
								}}
							/>
						</Box>
						<Box paddingLeft='5vw' paddingRight='5vw'>
							<Box display='flex' justifyContent='space-between' alignItems='center'>
								<Box
									style={{
										fontSize: '36px',
										fontWeight: 'bold',
										fontFamily: 'Calibri',
										textTransform: 'capitalize',
									}}
								>
									{productDetails.product_name}
								</Box>
								<Button
									variant='outlined'
									style={{
										height: 48,
										width: '178px',
										borderRadius: 4,
									}}
									startIcon={<Share />}
									onClick={() =>
										openShareDialog(
											`${base_url}/product/view/${productDetails.product_id}`,
										)
									}
								>
									share product
								</Button>
							</Box>

							<Box
								style={{
									fontSize: '18px',
									fontWeight: 'normal',
									fontFamily: 'Calibri',
									textTransform: 'uppercase',
								}}
							>
								CATEGORY: {productDetails.product_category}
							</Box>
							<Box
								style={{
									fontSize: '18px',
									fontWeight: 'normal',
									fontFamily: 'Calibri',
									textTransform: 'uppercase',
									paddingBottom: 20,
								}}
							>
								STOCK: {productDetails.product_stock}
							</Box>
							<Box
								style={{
									fontSize: '24px',
									fontWeight: 'normal',
									fontFamily: 'Calibri',
									paddingBottom: 20,
								}}
							>
								{productDetails.product_desc}
							</Box>
							<Box
								style={{
									fontSize: '24px',
									fontWeight: 'bold',
									fontFamily: 'Calibri',
									paddingBottom: 30,
								}}
							>
								PRICE: &#8358;{productDetails.product_price}
							</Box>
							{contextVariables.cartItems?.find(
								(item) => item.productID === productDetails.product_id,
							) ? (
								<Box
									style={{
										fontFamily: 'Calibri',
										fontWeight: '600',
										fontSize: 16,
										textTransform: 'uppercase',
										paddingRight: 20,
									}}
								>
									Added to cart
								</Box>
							) : (
								<Button
									variant='contained'
									style={{
										marginRight: '24px',
										height: 50,
										width: 'auto',
										backgroundColor: '#836E00',
										borderRadius: 4,
										color: '#FFFFFF',
										paddingInline: 30,
									}}
									startIcon={<ShoppingCartOutlined />}
									onClick={() => addToCart(productDetails)}
								>
									Add to cart
								</Button>
							)}
						</Box>

						<Box
							style={{
								paddingBlock: 66,
								paddingInline: '5vw',
							}}
						>
							<span
								style={{
									fontWeight: 'bold',
									fontSize: 36,
									fontFamily: 'Calibri',
								}}
							>
								Similar Products
							</span>
							<Grid
								container
								justify='flex-start'
								spacing={1}
								style={{ paddingTop: 14 }}
							>
								{similarProducts.length > 0 ? (
									similarProducts.slice(0, 3).map((product) => (
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
									<span
										style={{
											fontSize: 20,
											padding: 20,
											fontWeight: 'normal',
											fontFamily: 'Calibri',
										}}
									>
										No similar product found
									</span>
								)}
							</Grid>
						</Box>
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
							View other products with the links below
						</span>
						<br />
						<br />
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
								Trending Products
							</Button>
						</Link>
						<Link
							to='/products/new'
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
								New Products
							</Button>
						</Link>
					</Box>
				)}
			</div>
			<ShareProductModal
				openShareDialog={openShareDialog}
				closeShareDialog={closeShareDialog}
				shareDialogState={shareDialogState.state}
				url={shareDialogState.url}
				setShareDialogState={setShareDialogState}
			/>
		</>
	);
}

export default ProductView;
