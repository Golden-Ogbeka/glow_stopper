import { Box, CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import AdminNavbar from '../../../layout/Admin/AdminNavbar';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { encrypt_key, base_url } from '../../../../app.json';
import ProductCategoryCard from '../../../layout/Products/ProductCategoryCard';

function AdminViewProductCategories() {
	const [categories, setCategories] = React.useState([]);

	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		const getProductCategories = async () => {
			try {
				let storedSession = JSON.parse(
					localStorage.getItem('sessionDetails_glowStopper'),
				);
				storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
				storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));
				const response = await axios.get(
					base_url + '/api/admin/product/categories',
					{
						headers: {
							token: storedSession.userToken,
						},
					},
				);

				if (response.data.status === 'PASSED') {
					setCategories(response.data.productCategories);
				}
				setLoading(false);
			} catch (error) {
				setCategories([]);
				setLoading(false);
			}
		};
		getProductCategories();
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
							textAlign: 'center',
							color: '#FFFFFF',
						}}
					>
						Product Categories
					</span>
				</Box>
				<Box padding='20px'>
					{loading ? (
						<CircularProgress />
					) : (
						<>
							<Grid container justify='center' spacing={1}>
								{categories.length > 0 ? (
									categories.map((category) => (
										<Grid item lg={4} md={4} sm={12} xs={12} key={category.category_id}>
											<ProductCategoryCard
												category={category.category_name}
												categoryID={category.category_id}
												categoryDescription={category.category_description}
												categoryImage={`${base_url}${category.category_image}`}
												adminAccess={true}
											/>
										</Grid>
									))
								) : (
									<span
										style={{
											fontSize: 20,
										}}
									>
										No product category found
									</span>
								)}
							</Grid>
						</>
					)}
				</Box>
			</div>
		</>
	);
}

export default AdminViewProductCategories;
