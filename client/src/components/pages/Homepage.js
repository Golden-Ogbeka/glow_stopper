import React from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import LogoComponent from '../layout/LogoComponent';
import ProductCard from '../layout/Products/ProductCard';
import Image1 from '../../assets/images/1.jpg';
import Image2 from '../../assets/images/2.jpg';
import Image3 from '../../assets/images/3.jpg';
import { Link } from 'react-router-dom';
import CustomerNavbar from '../layout/CustomerNavbar';

function Homepage() {
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
						<Grid container justify='center' spacing={1}>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<ProductCard
									productName='Red Coat'
									productPrice='$25'
									productImage={Image1}
								/>
							</Grid>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<ProductCard
									productName='Red Jacket'
									productPrice='$35'
									productImage={Image2}
								/>
							</Grid>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<ProductCard
									productName='Yellow Camisole'
									productPrice='$45'
									productImage={Image3}
								/>
							</Grid>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<ProductCard
									productName='Yellow Camisole'
									productPrice='$45'
									productImage={Image3}
								/>
							</Grid>
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
						<Grid container justify='center' spacing={1}>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<ProductCard
									productName='Red Coat'
									productPrice='$25'
									productImage={Image1}
								/>
							</Grid>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<ProductCard
									productName='Red Jacket'
									productPrice='$35'
									productImage={Image2}
								/>
							</Grid>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<ProductCard
									productName='Yellow Camisole'
									productPrice='$45'
									productImage={Image3}
								/>
							</Grid>
							<Grid item lg={4} md={4} sm={12} xs={12}>
								<ProductCard
									productName='Yellow Camisole'
									productPrice='$45'
									productImage={Image3}
								/>
							</Grid>
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
			</div>
		</>
	);
}

export default Homepage;
