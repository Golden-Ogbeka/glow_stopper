import React from 'react';
import { Box, Grid } from '@material-ui/core';
import AdminNavbar from '../../../layout/Admin/AdminNavbar';
import ProductCard from '../../../layout/Products/ProductCard';
import Image1 from '../../../../assets/images/1.jpg';
import Image2 from '../../../../assets/images/2.jpg';
import Image3 from '../../../../assets/images/3.jpg';

function AdminViewProducts() {
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
						All Products
					</span>
				</Box>
				<Box
					style={{
						paddingTop: '40px',
						paddingInline: '5vw',
					}}
				>
					<Grid container justify='center' spacing={2}>
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
				</Box>
			</div>
		</>
	);
}

export default AdminViewProducts;
