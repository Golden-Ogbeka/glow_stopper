import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	CircularProgress,
	Grid,
} from '@material-ui/core';
import React from 'react';
import {
	useHistory,
	useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import AdminNavbar from '../../../layout/Admin/AdminNavbar';
import CryptoJS from 'crypto-js';
import { encrypt_key, base_url } from '../../../../app.json';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../../../../utils/AppContext';

function AdminViewOrderReference() {
	const { orderReference } = useParams();
	const { contextVariables, setContextVariables } = React.useContext(AppContext);
	const history = useHistory();
	const [orders, setOrders] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
		const getProducts = async () => {
			try {
				let storedSession = JSON.parse(
					localStorage.getItem('sessionDetails_glowStopper'),
				);
				storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
				storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));
				const response = await axios.get(
					`${base_url}/api/admin/orders/reference?orderReference=${orderReference}`,
					{
						headers: {
							token: storedSession.userToken,
						},
					},
				);

				if (response.data.status === 'PASSED') {
					const { orders } = response.data;
					console.log(orders);
					setOrders(orders);
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
				setOrders([]);
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
		getProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<AdminNavbar />
			<div
				style={{
					minHeight: '100vh',
				}}
			>
				{loading ? (
					<CircularProgress
						style={{
							padding: 20,
						}}
					/>
				) : orders.length > 0 ? (
					<>
						<Grid
							container
							justify='space-evenly'
							alignItems='flex-start'
							style={{
								paddingInline: 20,
								paddingBlock: 20,
							}}
						>
							<Box>
								<h2 style={{ margin: 0 }}>Order Reference</h2>
								{orderReference}
							</Box>
							<Box>
								<h2 style={{ margin: 0 }}>Customer Information</h2>
								<span>Name: {orders[0].customer_name}</span>
								<br />
								<span>Email: {orders[0].customer_email}</span>
								<br />
								<span>Address: {orders[0].customer_address}</span>
								<br />
								<span>Phone Number: {orders[0].customer_phone_number}</span>
							</Box>
						</Grid>
						<center>
							<h2
								style={{
									paddingTop: 50,
								}}
							>
								Products Ordered
							</h2>
						</center>
						<Grid
							container
							justify='space-evenly'
							spacing={1}
							style={{
								padding: 20,
							}}
						>
							{orders.map((order) => (
								<Grid item lg={4} md={4} sm={12} xs={12} key={order.order_id}>
									<Card
										style={{
											maxWidth: 391,
											marginBottom: 40,
										}}
									>
										<CardActionArea
											onClick={() =>
												history.push(`/admin/product/description/${order.product_id}`)
											}
										>
											<CardMedia
												image={order.product_image}
												style={{
													height: 194,
												}}
											/>
											<CardContent>
												<Box>
													<span
														style={{
															color: '#000000',
															fontFamily: 'Calibri',
															fontWeight: 'bold',
															fontSize: 24,
															textTransform: 'uppercase',
														}}
													>
														{order.product_name}
													</span>
												</Box>
												<Box
													marginTop='15px'
													display='flex'
													justifyContent='space-between'
													alignItems='center'
												>
													<span
														style={{
															color: '#43A047',
															fontFamily: 'Calibri',
															fontWeight: 'bold',
															fontSize: 24,
														}}
													>
														&#8358;
														{new Intl.NumberFormat('en-US').format(order.product_price)}
													</span>
													<span
														style={{
															color: '#000000',
															fontFamily: 'Calibri',
															fontWeight: 'lighter',
															fontSize: 19,
														}}
													>
														Quantity Ordered: {order.product_quantity}
													</span>
												</Box>

												<Box marginTop='15px'>
													<span
														style={{
															color: '#000000',
															fontFamily: 'Calibri',
															fontWeight: 'bold',
															fontSize: 15,
														}}
													>
														Product ID: {order.product_id}
													</span>
												</Box>
											</CardContent>
										</CardActionArea>
										<CardActions
											style={{
												justifyContent: 'space-around',
											}}
										>
											<>
												<Link
													to={`/admin/product/description/${order.product_id}`}
													style={{
														textDecoration: 'none',
														width: '100%',
													}}
												>
													<Button
														style={{
															color: '#CCAC00',
															fontFamily: 'Calibri',
															fontWeight: '600',
															fontSize: 16,
															textTransform: 'uppercase',
														}}
														fullWidth
													>
														View
													</Button>
												</Link>
											</>
										</CardActions>
									</Card>
								</Grid>
							))}
						</Grid>
					</>
				) : (
					<Box padding='20px'>No orders found</Box>
				)}
			</div>
		</>
	);
}

export default AdminViewOrderReference;
