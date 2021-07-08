import React from 'react';
import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardActions,
	Grid,
} from '@material-ui/core';
import { LocalMall, ShoppingCart } from '@material-ui/icons';
import AdminNavbar from '../../layout/Admin/AdminNavbar';
import { Link } from 'react-router-dom';

function AdminDashboard() {
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
						Dashboard
					</span>
				</Box>
				<Box
					style={{
						paddingTop: '40px',
						paddingInline: '5vw',
					}}
				>
					<Grid container spacing={2}>
						<Grid item lg={4} md={6} sm={12} xs={12}>
							<Card>
								<CardContent style={{ display: 'flex', alignItems: 'center' }}>
									<Box
										style={{
											marginRight: 10,
											backgroundColor: '#000000',
											color: '#FFD700',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											width: 50,
											height: 50,
										}}
									>
										<LocalMall
											style={{
												width: 30,
												height: 30,
											}}
										/>
									</Box>
									<h4
										style={{
											margin: 0,
											// marginRight: '55px',
											fontFamily: 'Calibri',
											fontWeight: 'normal',
											fontSize: 30,
											flexGrow: 1,
										}}
									>
										Products
									</h4>

									<h4
										style={{
											margin: 0,
											fontFamily: 'Calibri',
											fontWeight: 'bold',
											fontSize: 30,
											float: 'right',
										}}
									>
										20
									</h4>
								</CardContent>
								<CardActions>
									<ButtonGroup fullWidth>
										<Link
											to='/admin/products'
											style={{
												textDecoration: 'none',
												width: '100%',
											}}
										>
											<Button
												variant='contained'
												style={{
													color: '#FFFFFF',
													backgroundColor: '#836E00',
													borderRadius: 0,
													width: '100%',
												}}
											>
												View
											</Button>
										</Link>
										<Link
											to='/admin/product/new'
											style={{
												width: '100%',
												textDecoration: 'none',
											}}
										>
											<Button
												variant='contained'
												style={{
													color: '#FFFFFF',
													width: '100%',
													backgroundColor: '#FB4E4E',
													borderRadius: 0,
												}}
											>
												Add
											</Button>
										</Link>
									</ButtonGroup>
								</CardActions>
							</Card>
						</Grid>
						<Grid item lg={4} md={6} sm={12} xs={12}>
							<Card>
								<CardContent style={{ display: 'flex', alignItems: 'center' }}>
									<Box
										style={{
											marginRight: 10,
											backgroundColor: '#000000',
											color: '#FFD700',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											width: 50,
											height: 50,
										}}
									>
										<ShoppingCart
											style={{
												width: 30,
												height: 30,
											}}
										/>
									</Box>
									<h4
										style={{
											margin: 0,
											// marginRight: '55px',
											fontFamily: 'Calibri',
											fontWeight: 'normal',
											fontSize: 30,
											flexGrow: 1,
										}}
									>
										Orders
									</h4>

									<h4
										style={{
											margin: 0,
											fontFamily: 'Calibri',
											fontWeight: 'bold',
											fontSize: 30,
											float: 'right',
										}}
									>
										20
									</h4>
								</CardContent>
								<CardActions>
									<Button
										variant='contained'
										style={{
											color: '#FFFFFF',
											backgroundColor: '#836E00',
										}}
										fullWidth
									>
										View
									</Button>
								</CardActions>
							</Card>
						</Grid>
						<Grid item lg={4} md={6} sm={12} xs={12}>
							<Card>
								<CardContent style={{ display: 'flex', alignItems: 'center' }}>
									<Box
										style={{
											marginRight: 10,
											backgroundColor: '#000000',
											color: '#FFD700',
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											width: 50,
											height: 50,
										}}
									>
										<ShoppingCart
											style={{
												width: 30,
												height: 30,
											}}
										/>
									</Box>
									<h4
										style={{
											margin: 0,
											// marginRight: '55px',
											fontFamily: 'Calibri',
											fontWeight: 'normal',
											fontSize: 30,
											flexGrow: 1,
										}}
									>
										Other
									</h4>

									<h4
										style={{
											margin: 0,
											fontFamily: 'Calibri',
											fontWeight: 'bold',
											fontSize: 30,
											float: 'right',
										}}
									>
										20
									</h4>
								</CardContent>
								<CardActions>
									<Button
										variant='contained'
										style={{
											color: '#FFFFFF',
											backgroundColor: '#836E00',
										}}
										fullWidth
									>
										View
									</Button>
								</CardActions>
							</Card>
						</Grid>
					</Grid>
				</Box>
			</div>
		</>
	);
}

export default AdminDashboard;
