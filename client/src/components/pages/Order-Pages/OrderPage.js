import {
	Box,
	Grid,
	TextField,
	makeStyles,
	Button,
	CircularProgress,
} from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CustomerNavbar from '../../layout/CustomerNavbar';
import * as Yup from 'yup';
import axios from 'axios';
import AppContext from '../../../utils/AppContext';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginBlock: theme.spacing(1),
			width: '100%',
		},
	},
}));

function OrderPage() {
	const classes = useStyles();
	const [loading, setLoading] = React.useState(false);
	const [cartDetails, setCartDetails] = React.useState([]);
	const [trimmedCart, setTrimmedCart] = React.useState([]);
	const { contextVariables, setContextVariables } = React.useContext(AppContext);
	const history = useHistory();

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
			}
		};
		getCartDetails();
	}, []);

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			address: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required('First name is required'),
			lastName: Yup.string().required('Last name is required'),
			email: Yup.string()
				.email('Enter a valid email')
				.required('Email is required'),
			phoneNumber: Yup.number()
				.test(
					'length',
					'Enter a valid phone number',
					(val) => val && val.toString().length >= 10 && val.toString().length <= 11,
				)
				.required('Phone number is required')
				.typeError('Can only be numbers'),
			address: Yup.string().required('Address is required'),
		}),
		onSubmit: (values) => {
			placeOrder(values);
		},
		enableReinitialize: true,
	});

	const placeOrder = async (values) => {
		try {
			setLoading(true);
			const response = await axios.post('/order', {
				values,
				cartDetails,
				trimmedCart,
			});
			if (response.data.status === 'PASSED') {
				setContextVariables({
					...contextVariables,
					feedback: {
						...contextVariables.feedback,
						open: true,
						type: 'success',
						message: response.data.message,
					},
				});
				localStorage.removeItem('cart_glowStopper');
				history.push(`/order/successful/${response.data.orderReference}`);
			} else {
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
			setLoading(false);
			setContextVariables({
				...contextVariables,
				feedback: {
					...contextVariables.feedback,
					open: true,
					type: 'error',
					message:
						error.response.status === 500
							? error.response.data
							: error.response.data.message,
				},
			});
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
						Your Order
					</span>
				</Box>
				<Box paddingTop='30px' paddingLeft='30px'>
					<Link
						to='/cart'
						style={{
							color: '#836E00',
						}}
					>
						{' '}
						{'<< '}back to cart
					</Link>
				</Box>
				<Grid
					style={{
						padding: 30,
					}}
					container
					// justify='space-between'
				>
					<Grid
						item
						lg={6}
						md={6}
						sm={12}
						xs={12}
						style={{
							paddingInline: 20,
							paddingBottom: 20,
						}}
					>
						<Box
							maxHeight='708px'
							style={{
								backgroundColor: '#F4F4F4',
							}}
						>
							<Box padding='20px'>
								<Box
									textAlign='center'
									style={{
										fontSize: 25,
										fontWeight: 'lighter',
										fontFamily: 'Calibri',
									}}
								>
									Items in your cart
								</Box>
								<Box
									paddingTop='20px'
									style={{
										fontSize: 20,
										fontWeight: 'normal',
										fontFamily: 'Calibri',
									}}
								>
									{cartDetails.length > 0 ? (
										<>
											{trimmedCart.map((item, index) => (
												<Box key={index}>
													<Box display='flex' justifyContent='space-between'>
														<span>
															{item.productName} -{' '}
															{cartDetails.reduce(
																(total, cartItem) =>
																	total + (cartItem.productID === item.productID),
																0,
															)}{' '}
															pcs
														</span>
														<span
															style={{
																fontWeight: '600',
															}}
														>
															&#8358;{' '}
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
														</span>
													</Box>
													<br />
												</Box>
											))}
											<br />
											<center>
												<span
													style={{
														fontSize: 30,
														fontWeight: 'bold',
													}}
												>
													Total: &#8358;{' '}
													{new Intl.NumberFormat('en-US').format(
														cartDetails.reduce(
															(total, cartItem) => total + Number(cartItem.productPrice),
															0,
														),
													)}
												</span>
											</center>
										</>
									) : (
										<>There are no items in your cart</>
									)}
								</Box>
							</Box>
						</Box>
					</Grid>
					<Grid item lg={6} md={6} sm={12} xs={12}>
						<Box
							padding='20px'
							style={{
								boxShadow: '0px 0px 4px rgba(131, 110, 0, 0.25)',
							}}
						>
							<Box
								textAlign='center'
								style={{
									fontSize: 20,
									fontWeight: 'lighter',
									fontFamily: 'Calibri',
								}}
								paddingBottom='20px'
							>
								Enter your contact details to place your order
							</Box>
							<form className={classes.root} onSubmit={formik.handleSubmit}>
								<TextField
									label='First name'
									variant='outlined'
									required
									type='text'
									id='firstName'
									name='firstName'
									placeholder='Enter your first name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.firstName || ''}
									error={formik.touched.firstName && formik.errors.firstName}
									helperText={
										formik.touched.firstName &&
										formik.errors.firstName &&
										formik.errors.firstName
									}
								/>
								<TextField
									label='Last name'
									variant='outlined'
									required
									type='text'
									id='lastName'
									name='lastName'
									placeholder='Enter your last name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.lastName || ''}
									error={formik.touched.lastName && formik.errors.lastName}
									helperText={
										formik.touched.lastName &&
										formik.errors.lastName &&
										formik.errors.lastName
									}
								/>
								<TextField
									label='Email Address'
									variant='outlined'
									required
									type='email'
									id='email'
									name='email'
									placeholder='Enter your first name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.email || ''}
									error={formik.touched.email && formik.errors.email}
									helperText={
										formik.touched.email && formik.errors.email && formik.errors.email
									}
								/>
								<TextField
									label='Phone number'
									variant='outlined'
									required
									type='text'
									id='phoneNumber'
									name='phoneNumber'
									placeholder='Enter your phone number'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.phoneNumber || ''}
									error={formik.touched.phoneNumber && formik.errors.phoneNumber}
									helperText={
										formik.touched.phoneNumber &&
										formik.errors.phoneNumber &&
										formik.errors.phoneNumber
									}
								/>
								<TextField
									label='Address'
									variant='outlined'
									required
									multiline='true'
									rows='3'
									type='text'
									id='address'
									name='address'
									placeholder='Enter your address'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.address || ''}
									error={formik.touched.address && formik.errors.address}
									helperText={
										formik.touched.address &&
										formik.errors.address &&
										formik.errors.address
									}
								/>

								<center>
									{loading ? (
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
											<CircularProgress size={20} color='inherit' />
										</Button>
									) : (
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
									)}
								</center>
							</form>
						</Box>
					</Grid>
				</Grid>
			</div>
		</>
	);
}

export default OrderPage;
