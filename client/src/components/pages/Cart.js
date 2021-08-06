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
} from '@material-ui/core';
import {
	AddCircleOutline,
	HighlightOff,
	RemoveCircleOutline,
} from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
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

	const addToCart = async (productDetails) => {
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
		} else {
			localStorage.setItem('cart_glowStopper', JSON.stringify([productDetails]));
			setCartDetails([...cartDetails, productDetails]);
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
		return localStorage.setItem('cart_glowStopper', JSON.stringify(newArray));
	};

	const removeItem = (productID) => {
		if (window.confirm('Remove this product from cart?')) {
			//Remove all products with the stated ID
			const newArray = cartDetails.filter((item) => item.productID !== productID);
			setCartDetails(newArray);
			return localStorage.setItem('cart_glowStopper', JSON.stringify(newArray));
		}
	};
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
										<StyledTableCell align='center'>Quantity</StyledTableCell>
										<StyledTableCell align='center'>Unit Price</StyledTableCell>
										<StyledTableCell align='center'>Total Price</StyledTableCell>
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
															<StyledTableCell align='center'>
																{cartDetails.reduce(
																	(total, cartItem) =>
																		total + (cartItem.productID === item.productID),
																	0,
																)}
															</StyledTableCell>
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
																<Box display='flex' justifyContent='space-evenly'>
																	<IconButton onClick={() => addToCart(item)}>
																		<AddCircleOutline htmlColor='#000000' />
																	</IconButton>
																	<IconButton onClick={() => reduceQuantity(item.productID)}>
																		<RemoveCircleOutline htmlColor='#000000' />
																	</IconButton>
																	<IconButton onClick={() => removeItem(item.productID)}>
																		<HighlightOff htmlColor='#FB4E4E' />
																	</IconButton>
																</Box>
															</StyledTableCell>
														</StyledTableRow>
													))}
												</>
											) : (
												<StyledTableRow>
													<StyledTableCell colSpan='6'>Cart is empty</StyledTableCell>
												</StyledTableRow>
											)}
										</>
									)}
								</TableBody>
								<TableFooter>
									<StyledTableRow>
										<StyledTableCell colSpan='6'>
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
														marginBottom: 20,
													}}
													key={index}
												>
													<CardContent>
														<Box
															style={{
																display: 'flex',
																alignItems: 'center',
															}}
														>
															<img
																src={item.productImage}
																alt='Cart'
																style={{
																	width: 'auto',
																	height: 60,
																}}
															/>
															<Box paddingLeft='10px'>
																<span
																	style={{
																		fontSize: 30,
																		fontWeight: 'bold',
																	}}
																>
																	{item.productName}
																</span>
																<br />
																<span
																	style={{
																		fontSize: 22,
																		fontWeight: 'normal',
																	}}
																>
																	{cartDetails.reduce(
																		(total, cartItem) =>
																			total + (cartItem.productID === item.productID),
																		0,
																	)}{' '}
																	pcs
																</span>
															</Box>
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
													<CardActions
														style={{
															display: 'flex',
															justifyContent: 'center',
														}}
													>
														<IconButton onClick={() => addToCart(item)}>
															<AddCircleOutline fontSize='large' htmlColor='#000000' />
														</IconButton>
														<IconButton onClick={() => reduceQuantity(item.productID)}>
															<RemoveCircleOutline fontSize='large' htmlColor='#000000' />
														</IconButton>
														<IconButton onClick={() => removeItem(item.productID)}>
															<HighlightOff fontSize='large' htmlColor='#FB4E4E' />
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
