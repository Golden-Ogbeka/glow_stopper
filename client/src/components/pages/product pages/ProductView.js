import { Box, Button, Grid } from '@material-ui/core';
import { Share, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import Image1 from '../../../assets/images/1.jpg';
import Image2 from '../../../assets/images/2.jpg';
import Image3 from '../../../assets/images/3.jpg';
import Image4 from '../../../assets/images/4.jpg';
import ProductCard from '../../layout/Products/ProductCard';

function ProductView() {
	return (
		<div
			style={{
				minHeight: '100vh',
			}}
		>
			<Grid container style={{ padding: '3vw' }}>
				<Grid item lg={6}>
					<img
						src={Image1}
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
						CLASSIC STYLED BLOUSE
					</span>
					<br />
					<span
						style={{
							fontSize: '4vh',
							fontWeight: 'lighter',
							fontFamily: 'Calibri',
						}}
					>
						It began as a tale but then gradually took shape to become one of the most
						sought after brands in Nigeria. Glow stopper was once an idea. The aim was
						to create an easy way for people to access quality products at affordable
						prices.
					</span>
					<Box
						style={{
							paddingBlock: 40,
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
							$ 25
						</span>
					</Box>
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
					>
						Add to cart
					</Button>
					<Button
						variant='contained'
						style={{
							height: 50,
							width: 'auto',
							backgroundColor: '#C4C4C4',
							borderRadius: 4,
						}}
						startIcon={<Share />}
					>
						Share
					</Button>
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
				<Grid container justify='center' spacing={1} style={{ paddingTop: 14 }}>
					<Grid item lg={4} md={4} sm={12} xs={12}>
						<ProductCard
							productName='Red Coat'
							productPrice='$25'
							productImage={Image4}
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
				</Grid>
			</Box>
		</div>
	);
}

export default ProductView;
