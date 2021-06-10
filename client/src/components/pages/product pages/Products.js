import { Box, Grid } from '@material-ui/core';
import React from 'react';
import ProductCategoryCard from '../../layout/Products/ProductCategoryCard';
import Image1 from '../../../assets/images/1.jpg';
import Image2 from '../../../assets/images/2.jpg';
import Image3 from '../../../assets/images/3.jpg';
import Image4 from '../../../assets/images/4.jpg';

function Products() {
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
						fontWeight: 'bold',
						fontSize: '15vh',
						color: '#FFD700',
					}}
				>
					Top
				</span>

				<span
					style={{
						fontFamily: 'Calibri',
						fontWeight: 'lighter',
						fontSize: 48,
						color: '#FFFFFF',
					}}
				>
					categories
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
							<ProductCategoryCard
								category='Dresses'
								categoryDescription='Male, female and unisex turtlenecks (long and short sleeves), etc'
								categoryImage={Image1}
							/>
						</Grid>
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<ProductCategoryCard
								category='JEANS'
								categoryDescription='Jean shirts, trousers, shorts and even shoes'
								categoryImage={Image2}
							/>
						</Grid>
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<ProductCategoryCard
								category='SHOES'
								categoryDescription='Corporate shoes, canvas, etc'
								categoryImage={Image3}
							/>
						</Grid>
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<ProductCategoryCard
								category='BODYSUIT'
								categoryDescription='Unisex bodysuits'
								categoryImage={Image4}
							/>
						</Grid>
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<ProductCategoryCard
								category='PLAYSUIT'
								categoryDescription='Unisex Playsuits'
								categoryImage={Image3}
							/>
						</Grid>
						<Grid item lg={4} md={4} sm={12} xs={12}>
							<ProductCategoryCard
								category='ETC'
								categoryDescription='Any category'
								categoryImage={Image1}
							/>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</div>
	);
}

export default Products;
