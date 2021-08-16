import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CircularProgress,
	Grid,
} from '@material-ui/core';
import React from 'react';
import AdminNavbar from '../../../layout/Admin/AdminNavbar';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { encrypt_key } from '../../../../app.json';
import { Link } from 'react-router-dom';

export default function AdminViewOrders() {
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
				const response = await axios.get('/admin/orders', {
					headers: {
						token: storedSession.userToken,
					},
				});

				if (response.data.status === 'PASSED') {
					const { orders } = response.data;
					const trimmedValues = [
						...new Map(orders.map((item) => [item.order_reference, item])).values(),
					];
					// Show only specific order instances
					setOrders(trimmedValues);
				}
				setLoading(false);
			} catch (error) {
				setOrders([]);
				setLoading(false);
			}
		};
		getProducts();
	}, []);
	return (
		<>
			<AdminNavbar />
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
						Admin
					</span>

					<span
						style={{
							fontFamily: 'Calibri',
							fontWeight: 'bold',
							fontSize: 48,
							color: '#FFFFFF',
						}}
					>
						All Orders
					</span>
				</Box>
				<Box
					style={{
						paddingTop: '40px',
						paddingInline: '5vw',
					}}
				>
					<Grid container justify='flex-start' spacing={2}>
						{loading ? (
							<CircularProgress />
						) : (
							<>
								{orders.length > 0 ? (
									orders.map((order) => (
										<Grid item lg={4} md={4} sm={12} xs={12} key={order.order_id}>
											<Card
												style={{
													maxWidth: 391,
													marginBottom: 40,
												}}
											>
												<CardContent>
													<h3>Order Reference: {order.order_reference}</h3>
													<h4>Customer Details</h4>
													<span>Name: {order.customer_name}</span>
													<br />
													<span>Email: {order.customer_email}</span>
													<br />
													<span>Phone number: {order.customer_phone_number}</span>
													<br />
													<span>Address: {order.customer_address}</span>
												</CardContent>
												<CardActions
													style={{
														justifyContent: 'center',
													}}
												>
													<Link
														style={{
															width: '100%',
															textDecoration: 'none',
														}}
														to={`/admin/order/details/${order.order_reference}`}
													>
														<Button
															variant='contained'
															style={{
																borderRadius: 4,
																color: '#FFFFFF',
																backgroundColor: '#836E00',
															}}
															fullWidth
														>
															View order
														</Button>
													</Link>
												</CardActions>
											</Card>
										</Grid>
									))
								) : (
									<>There are no orders available </>
								)}
							</>
						)}
					</Grid>
				</Box>
			</div>
		</>
	);
}
