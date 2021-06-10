import { Box, Grid } from '@material-ui/core';
import React from 'react';
import ProductCard from '../../layout/Products/ProductCard';
import Image1 from '../../../assets/images/1.jpg';
import Image2 from '../../../assets/images/2.jpg';
import Image3 from '../../../assets/images/3.jpg';
import Image4 from '../../../assets/images/4.jpg';
import { useParams } from 'react-router';

function ProductCategory() {
	const { category } = useParams();
	return (
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
						fontWeight: 'normal',
						fontSize: '10vh',
						color: '#FFD700',
						textTransform: 'capitalize',
					}}
				>
					{category.toLowerCase()}
				</span>

				<span
					style={{
						fontFamily: 'Calibri',
						fontWeight: 'lighter',
						fontSize: 48,
						color: '#FFFFFF',
					}}
				>
					category
				</span>
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
					<Grid container justify='center' spacing={1}>
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<ProductCard
								productName='Yellow Camisole'
								productPrice='$45'
								productImage={Image1}
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
								productImage={Image4}
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
			</Box>
		</div>
	);
}

export default ProductCategory;
