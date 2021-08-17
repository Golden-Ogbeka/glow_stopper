import { Box, Button, Grid, CircularProgress } from '@material-ui/core';
import { Share, ShoppingCartOutlined } from '@material-ui/icons';
import axios from 'axios';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomerNavbar from '../../layout/CustomerNavbar';
import ProductCard from '../../layout/Products/ProductCard';
import { base_url } from '../../../app.json';
import AppContext from '../../../utils/AppContext';
import MetaTags from '../../../utils/MetaTags';
import ShareProductModal from '../../layout/ShareProductModal';

function ProductView() {
	const { productID } = useParams();
	const { contextVariables, setContextVariables } = React.useContext(AppContext);

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
				const response = await axios.get(`/product?productID=${productID}`);

				if (response.data.status === 'PASSED') {
					setProductDetails(response.data.productDetails);
					// Get similar products
					const response2 = await axios.get(
						`/product?productCategory=${response.data.productDetails.product_category}`,
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
										fontSize: '3vh',
										fontWeight: 'lighter',
										fontFamily: 'Calibri',
									}}
								>
									Category: <b>{productDetails.product_category}</b>
								</span>
								<br />
								<br />
								<span
									style={{
										fontSize: '25px',
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
										fontSize: '23px',
										fontWeight: 'normal',
										fontFamily: 'Calibri',
									}}
								>
									Stock: {productDetails.product_stock}
								</span>
								<Box
									style={{
										paddingBlock: 20,
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
								<Box display='flex' justifyContent='center' alignItems='center'>
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
											}}
											startIcon={<ShoppingCartOutlined />}
											onClick={() => addToCart(productDetails)}
										>
											Add to cart
										</Button>
									)}

									<Button
										variant='contained'
										style={{
											height: 50,
											width: 'auto',
											backgroundColor: '#C4C4C4',
											borderRadius: 4,
										}}
										startIcon={<Share />}
										onClick={() =>
											openShareDialog(
												`${base_url}/product/view/${productDetails.product_id}`,
											)
										}
									>
										Share
									</Button>
								</Box>
							</Grid>
						</Grid>
						<Box
							style={{
								paddingTop: 77,
								paddingBottom: '3vw',
								paddingInline: '3vw',
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
											fontWeight: 'bold',
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
