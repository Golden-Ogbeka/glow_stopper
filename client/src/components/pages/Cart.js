import {
	Box,
	Card,
	CardActions,
	CardContent,
	Hidden,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	CircularProgress,
	TableRow,
	withStyles,
	TableFooter,
	Button,
	Divider,
	Tooltip,
} from '@material-ui/core';
import { Add, Delete, Remove } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../utils/AppContext';
import MetaTags from '../../utils/MetaTags';
import CustomerNavbar from '../layout/CustomerNavbar';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: '#cccccc',
		color: theme.palette.common.black,
		fontFamily: 'Calibri',
		fontSize: 18,
		// fontWeight: 'bold',
	},
	body: {
		fontSize: 22,
		fontFamily: 'Calibri',
	},
	footer: {
		fontSize: 20,
		fontFamily: 'Calibri',
		backgroundColor: '#cccccc',
		color: theme.palette.common.black,
		fontWeight: 'bold',
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

function Cart() {
	const [cartDetails, setCartDetails] = React.useState([]);
	const [trimmedCart, setTrimmedCart] = React.useState([]); //Only items with distinct values
	const [loading, setLoading] = React.useState(true);
	const { contextVariables, setContextVariables } = React.useContext(AppContext);

	React.useEffect(() => {
		const getCartDetails = () => {
			const cartItems = JSON.parse(localStorage.getItem('cart_glowStopper'));
			if (cartItems) {
				setCartDetails(cartItems);
				setLoading(false);
				const trimmedValues = [
					...new Map(cartItems.map((item) => [item.productID, item])).values(),
				]; //Function to get unique objects in an array
				setTrimmedCart(trimmedValues);
			} else {
				setLoading(false);
			}
		};
		getCartDetails();
	}, []);

	const increaseQuantity = async (productDetails) => {
		const itemQuantity = cartDetails.reduce(
			(total, cartItem) =>
				total + (cartItem.productID === productDetails.productID),
			0,
		);
		// Check if item's stock is larger than quantity
		if (itemQuantity >= productDetails.productStock) {
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
			if (JSON.parse(localStorage.getItem('cart_glowStopper'))) {
				// If cart is not empty
				localStorage.setItem(
					'cart_glowStopper',
					JSON.stringify([
						...JSON.parse(localStorage.getItem('cart_glowStopper')),
						productDetails,
					]),
				);
				//Increase the quantity in front-end
				setCartDetails([...cartDetails, productDetails]);
				setContextVariables({
					...contextVariables,
					cartItems: [...contextVariables.cartItems, productDetails],
				});
			} else {
				localStorage.setItem('cart_glowStopper', JSON.stringify([productDetails]));
				// Set timeout for cart
				localStorage.setItem(
					'cart_glowStopper_timeout',
					JSON.stringify(Date.now() + 86400000),
				);
				setCartDetails([...cartDetails, productDetails]);
				setContextVariables({
					...contextVariables,
					cartItems: productDetails,
				});
			}
		}
	};
	const reduceQuantity = (productID) => {
		const index = cartDetails.findIndex((item) => item.productID === productID);
		if (index === -1) {
			//Product not found in the array
			return true;
		}
		const newArray = [
			...cartDetails.slice(0, index),
			...cartDetails.slice(index + 1),
		];
		setCartDetails(newArray);
		setContextVariables({
			...contextVariables,
			cartItems: newArray,
		});
		return localStorage.setItem('cart_glowStopper', JSON.stringify(newArray));
	};

	const removeItem = (productID) => {
		if (window.confirm('Remove this product from cart?')) {
			//Remove all products with the stated ID
			const newArray = cartDetails.filter((item) => item.productID !== productID);
			setCartDetails(newArray);
			// For cart badge
			setContextVariables({
				...contextVariables,
				cartItems: newArray,
			});
			return localStorage.setItem('cart_glowStopper', JSON.stringify(newArray));
		}
	};
	return (
		<>
			<CustomerNavbar />
			<MetaTags
				title='Glow Stopper - Cart'
				description='Details of items in your cart'
				noIndex={true}
			/>
			<div
				style={{
					minHeight: '100vh',
				}}
			>
				<Box
					style={{
						minHeight: 368,
						backgroundColor: '#000000',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
					}}
				>
					<span
						style={{
							fontFamily: 'Elsie',
							fontWeight: 'lighter',
							fontSize: '10vh',
							textAlign: 'center',
							color: '#FFD700',
						}}
					>
						Cart
					</span>
				</Box>
				<Box padding='30px'>
					<Hidden smDown>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<StyledTableCell align='center'></StyledTableCell>
										<StyledTableCell align='center'>Item</StyledTableCell>
										<Tooltip title='Product Inventory. This is only valid while stocks last'>
											<StyledTableCell align='center'>Current Stock</StyledTableCell>
										</Tooltip>
										<StyledTableCell align='center'>Unit Price</StyledTableCell>
										<StyledTableCell align='center'>Total Price</StyledTableCell>
										<StyledTableCell align='center'>Quantity</StyledTableCell>
										<StyledTableCell align='center'></StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{loading ? (
										<CircularProgress
											style={{
												padding: 20,
											}}
										/>
									) : (
										<>
											{cartDetails.length > 0 ? (
												<>
													{trimmedCart.map((item, index) => (
														<StyledTableRow key={index}>
															<StyledTableCell align='center'>
																<img
																	src={item.productImage}
																	alt='Cart'
																	style={{
																		width: 'auto',
																		height: 50,
																	}}
																/>
															</StyledTableCell>
															<StyledTableCell align='center'>
																{item.productName}
															</StyledTableCell>
															<Tooltip title='Product Inventory. This is only valid while stocks last'>
																<StyledTableCell align='center'>
																	{item.productStock}
																</StyledTableCell>
															</Tooltip>
															<StyledTableCell align='center'>
																{new Intl.NumberFormat('en-US').format(item.productPrice)}
															</StyledTableCell>
															<StyledTableCell align='center'>
																{
																	//Function to get the total price of a product in the cart
																	new Intl.NumberFormat('en-US').format(
																		cartDetails.reduce(
																			(total, cartItem) =>
																				total + (cartItem.productID === item.productID),
																			0,
																		) * item.productPrice,
																	)
																}
															</StyledTableCell>
															<StyledTableCell align='center'>
																{cartDetails.reduce(
																	(total, cartItem) =>
																		total + (cartItem.productID === item.productID),
																	0,
																)}
															</StyledTableCell>

															<StyledTableCell align='center'>
																<Box display='flex' justifyContent='space-evenly'>
																	<IconButton onClick={() => increaseQuantity(item)}>
																		<Add htmlColor='#000000' />
																	</IconButton>
																	<IconButton onClick={() => reduceQuantity(item.productID)}>
																		<Remove htmlColor='#000000' />
																	</IconButton>
																	<IconButton onClick={() => removeItem(item.productID)}>
																		<Delete htmlColor='#FB4E4E' />
																	</IconButton>
																</Box>
															</StyledTableCell>
														</StyledTableRow>
													))}
												</>
											) : (
												<StyledTableRow>
													<StyledTableCell colSpan='7'>Cart is empty</StyledTableCell>
												</StyledTableRow>
											)}
										</>
									)}
								</TableBody>
								<TableFooter>
									<StyledTableRow>
										<StyledTableCell colSpan='7'>
											<center>
												Total Amount in Cart: &#8358;{' '}
												{new Intl.NumberFormat('en-US').format(
													cartDetails.reduce(
														(total, cartItem) => total + Number(cartItem.productPrice),
														0,
													),
												)}
											</center>
										</StyledTableCell>
									</StyledTableRow>
								</TableFooter>
							</Table>
						</TableContainer>
						{cartDetails.length > 0 && (
							<center>
								<Link
									to='/order'
									style={{
										textDecoration: 'none',
									}}
								>
									<Button
										variant='contained'
										style={{
											width: 173,
											height: 57,
											borderRadius: 4,
											marginTop: '30px',
											color: '#FFFFFF',
											backgroundColor: '#836E00',
										}}
										type='submit'
									>
										Place order
									</Button>
								</Link>
							</center>
						)}
					</Hidden>
					<Hidden mdUp>
						{loading ? (
							<CircularProgress
								style={{
									padding: 20,
								}}
							/>
						) : (
							<>
								{cartDetails.length > 0 ? (
									<>
										<Box
											style={{
												fontSize: 22,
												fontFamily: 'Calibri',
												paddingBlock: 20,
											}}
										>
											<center>
												Total Amount in Cart:{' '}
												<span
													style={{
														fontWeight: 'bold',
													}}
												>
													&#8358;{' '}
													{new Intl.NumberFormat('en-US').format(
														cartDetails.reduce(
															(total, cartItem) => total + Number(cartItem.productPrice),
															0,
														),
													)}
												</span>
												<br />
												<Link to='/order'>Place order</Link>
											</center>
										</Box>
										{trimmedCart.map((item, index) => (
											<>
												<Card
													style={{
														marginBlock: 20,
													}}
													key={index}
												>
													<CardContent>
														<img
															src={item.productImage}
															alt='Cart'
															style={{
																width: '100%',
																height: 'auto',
															}}
														/>
														<Box
															style={{
																fontSize: 30,
																fontWeight: 'bold',
																paddingBlock: 10,
															}}
														>
															{item.productName}
														</Box>
														<Box
															style={{
																fontSize: 22,
																fontWeight: 'normal',
																marginBlock: 10,
															}}
														>
															Current Stock: {item.productStock}
														</Box>

														<Box
															style={{
																fontSize: 23,
																fontWeight: 'normal',
																marginBlock: 10,
															}}
														>
															Price: {new Intl.NumberFormat('en-US').format(item.productPrice)}
														</Box>
														<Box
															style={{
																fontSize: 23,
																fontWeight: 'normal',
															}}
														>
															Quantity:{' '}
															{cartDetails.reduce(
																(total, cartItem) =>
																	total + (cartItem.productID === item.productID),
																0,
															)}{' '}
															pc(s)
														</Box>
														<Box
															style={{
																fontSize: 26,
																fontWeight: 'bold',
																marginTop: 20,
															}}
														>
															Total: &#8358;{' '}
															{
																//Function to get the total price of a product in the cart
																new Intl.NumberFormat('en-US').format(
																	cartDetails.reduce(
																		(total, cartItem) =>
																			total + (cartItem.productID === item.productID),
																		0,
																	) * item.productPrice,
																)
															}
														</Box>
													</CardContent>
													<Divider />
													<CardActions
														style={{
															display: 'flex',
															justifyContent: 'center',
														}}
													>
														<IconButton onClick={() => increaseQuantity(item)}>
															<Add fontSize='large' htmlColor='#000000' />
														</IconButton>
														<IconButton onClick={() => reduceQuantity(item.productID)}>
															<Remove fontSize='large' htmlColor='#000000' />
														</IconButton>
														<IconButton onClick={() => removeItem(item.productID)}>
															<Delete fontSize='large' htmlColor='#FB4E4E' />
														</IconButton>
													</CardActions>
												</Card>
											</>
										))}
										<Box
											style={{
												fontSize: 22,
												fontFamily: 'Calibri',
												paddingBlock: 20,
											}}
										>
											<center>
												Total Amount in Cart:{' '}
												<span
													style={{
														fontWeight: 'bold',
													}}
												>
													&#8358;{' '}
													{new Intl.NumberFormat('en-US').format(
														cartDetails.reduce(
															(total, cartItem) => total + Number(cartItem.productPrice),
															0,
														),
													)}
												</span>
												<Link
													to='/order'
													style={{
														textDecoration: 'none',
													}}
												>
													<Button
														variant='contained'
														style={{
															width: 173,
															height: 57,
															borderRadius: 4,
															marginTop: '30px',
															color: '#FFFFFF',
															backgroundColor: '#836E00',
														}}
														type='submit'
													>
														Place order
													</Button>
												</Link>
											</center>
										</Box>
									</>
								) : (
									<>
										<Box style={{ fontSize: 20, fontFamily: 'Calibri' }}>
											Cart is empty
										</Box>
									</>
								)}
							</>
						)}
					</Hidden>
				</Box>
			</div>
		</>
	);
}

export default Cart;
