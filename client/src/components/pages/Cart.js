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
	TableRow,
	withStyles,
} from '@material-ui/core';
import {
	AddCircleOutline,
	HighlightOff,
	RemoveCircleOutline,
} from '@material-ui/icons';
import React from 'react';
import Image1 from '../../assets/images/4.jpg';
import CustomerNavbar from '../layout/CustomerNavbar';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontFamily: 'Calibri',
		fontSize: 20,
		// fontWeight: 'bold',
	},
	body: {
		fontSize: 26,
		fontFamily: 'Calibri',
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
									<StyledTableRow>
										<StyledTableCell align='center'>
											<img
												src={Image1}
												alt='Cart'
												style={{
													width: 'auto',
													height: 50,
												}}
											/>
										</StyledTableCell>
										<StyledTableCell align='center'>Red Shirt</StyledTableCell>
										<StyledTableCell align='center'>4</StyledTableCell>
										<StyledTableCell align='center'>$25</StyledTableCell>
										<StyledTableCell align='center'>$100</StyledTableCell>
										<StyledTableCell align='center'>
											<Box display='flex' justifyContent='space-evenly'>
												<IconButton>
													<AddCircleOutline htmlColor='#836E00' />
												</IconButton>
												<IconButton>
													<RemoveCircleOutline htmlColor='#836E00' />
												</IconButton>
												<IconButton>
													<HighlightOff htmlColor='#FB4E4E' />
												</IconButton>
											</Box>
										</StyledTableCell>
									</StyledTableRow>
									<StyledTableRow>
										<StyledTableCell align='center'>
											<img
												src={Image1}
												alt='Cart'
												style={{
													width: 'auto',
													height: 50,
												}}
											/>
										</StyledTableCell>
										<StyledTableCell align='center'>Red Shirt</StyledTableCell>
										<StyledTableCell align='center'>4</StyledTableCell>
										<StyledTableCell align='center'>$25</StyledTableCell>
										<StyledTableCell align='center'>$100</StyledTableCell>
										<StyledTableCell align='center'>
											<Box display='flex' justifyContent='space-evenly'>
												<IconButton>
													<AddCircleOutline htmlColor='#836E00' />
												</IconButton>
												<IconButton>
													<RemoveCircleOutline htmlColor='#836E00' />
												</IconButton>
												<IconButton>
													<HighlightOff htmlColor='#FB4E4E' />
												</IconButton>
											</Box>
										</StyledTableCell>
									</StyledTableRow>
									<StyledTableRow>
										<StyledTableCell align='center'>
											<img
												src={Image1}
												alt='Cart'
												style={{
													width: 'auto',
													height: 50,
												}}
											/>
										</StyledTableCell>
										<StyledTableCell align='center'>Red Shirt</StyledTableCell>
										<StyledTableCell align='center'>4</StyledTableCell>
										<StyledTableCell align='center'>$25</StyledTableCell>
										<StyledTableCell align='center'>$100</StyledTableCell>
										<StyledTableCell align='center'>
											<Box display='flex' justifyContent='space-evenly'>
												<IconButton>
													<AddCircleOutline htmlColor='#836E00' />
												</IconButton>
												<IconButton>
													<RemoveCircleOutline htmlColor='#836E00' />
												</IconButton>
												<IconButton>
													<HighlightOff htmlColor='#FB4E4E' />
												</IconButton>
											</Box>
										</StyledTableCell>
									</StyledTableRow>
									<StyledTableRow>
										<StyledTableCell align='center'>
											<img
												src={Image1}
												alt='Cart'
												style={{
													width: 'auto',
													height: 50,
												}}
											/>
										</StyledTableCell>
										<StyledTableCell align='center'>Red Shirt</StyledTableCell>
										<StyledTableCell align='center'>4</StyledTableCell>
										<StyledTableCell align='center'>$25</StyledTableCell>
										<StyledTableCell align='center'>$100</StyledTableCell>
										<StyledTableCell align='center'>
											<Box display='flex' justifyContent='space-evenly'>
												<IconButton>
													<AddCircleOutline htmlColor='#836E00' />
												</IconButton>
												<IconButton>
													<RemoveCircleOutline htmlColor='#836E00' />
												</IconButton>
												<IconButton>
													<HighlightOff htmlColor='#FB4E4E' />
												</IconButton>
											</Box>
										</StyledTableCell>
									</StyledTableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Hidden>
					<Hidden mdUp>
						<Card
							style={{
								marginBottom: 20,
							}}
						>
							<CardContent>
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<img
										src={Image1}
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
											Red Dress
										</span>
										<br />
										<span
											style={{
												fontSize: 22,
												fontWeight: 'normal',
											}}
										>
											4 pcs
										</span>
									</Box>
								</Box>
								<Box
									style={{
										fontSize: 47,
										fontWeight: 'bold',
									}}
								>
									$100
								</Box>
							</CardContent>
							<CardActions
								style={{
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<IconButton>
									<AddCircleOutline fontSize='large' htmlColor='#836E00' />
								</IconButton>
								<IconButton>
									<RemoveCircleOutline fontSize='large' htmlColor='#836E00' />
								</IconButton>
								<IconButton>
									<HighlightOff fontSize='large' htmlColor='#FB4E4E' />
								</IconButton>
							</CardActions>
						</Card>
						<Card
							style={{
								marginBottom: 20,
							}}
						>
							<CardContent>
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<img
										src={Image1}
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
											Red Dress
										</span>
										<br />
										<span
											style={{
												fontSize: 22,
												fontWeight: 'normal',
											}}
										>
											4 pcs
										</span>
									</Box>
								</Box>
								<Box
									style={{
										fontSize: 47,
										fontWeight: 'bold',
									}}
								>
									$100
								</Box>
							</CardContent>
							<CardActions
								style={{
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<IconButton>
									<AddCircleOutline fontSize='large' htmlColor='#836E00' />
								</IconButton>
								<IconButton>
									<RemoveCircleOutline fontSize='large' htmlColor='#836E00' />
								</IconButton>
								<IconButton>
									<HighlightOff fontSize='large' htmlColor='#FB4E4E' />
								</IconButton>
							</CardActions>
						</Card>
						<Card
							style={{
								marginBottom: 20,
							}}
						>
							<CardContent>
								<Box
									style={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<img
										src={Image1}
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
											Red Dress
										</span>
										<br />
										<span
											style={{
												fontSize: 22,
												fontWeight: 'normal',
											}}
										>
											4 pcs
										</span>
									</Box>
								</Box>
								<Box
									style={{
										fontSize: 47,
										fontWeight: 'bold',
									}}
								>
									$100
								</Box>
							</CardContent>
							<CardActions
								style={{
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<IconButton>
									<AddCircleOutline fontSize='large' htmlColor='#836E00' />
								</IconButton>
								<IconButton>
									<RemoveCircleOutline fontSize='large' htmlColor='#836E00' />
								</IconButton>
								<IconButton>
									<HighlightOff fontSize='large' htmlColor='#FB4E4E' />
								</IconButton>
							</CardActions>
						</Card>
					</Hidden>
				</Box>
			</div>
		</>
	);
}

export default Cart;
