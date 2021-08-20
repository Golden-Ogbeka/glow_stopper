import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
} from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { encrypt_key, base_url } from '../../../app.json';
import AppContext from '../../../utils/AppContext';
function ProductCategoryCard(props) {
	const history = useHistory();
	const { contextVariables, setContextVariables } = React.useContext(AppContext);

	const deleteProduct = async (categoryID) => {
		if (
			window.confirm('Are you sure you want to delete this product category?')
		) {
			try {
				let storedSession = JSON.parse(
					localStorage.getItem('sessionDetails_glowStopper'),
				);
				storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
				storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));

				const response = await axios.delete(
					`${base_url}/api/admin/product/category?categoryID=${categoryID}`,
					{
						headers: {
							token: storedSession.userToken,
						},
					},
				);
				if (response.data.status === 'PASSED') {
					setContextVariables({
						...contextVariables,
						feedback: {
							...contextVariables.feedback,
							open: true,
							type: 'success',
							message: response.data.message,
						},
					});
					window.location.reload();
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
			} catch (error) {
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
		}
	};
	return (
		<>
			<Card
				style={{
					maxWidth: 391,
					marginBottom: 40,
				}}
			>
				<CardActionArea
					onClick={() =>
						// For only clients
						props.adminAccess === false &&
						history.push(`/products/category/${props.category}`)
					}
				>
					<CardMedia
						image={props.categoryImage}
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
								{props.category}
							</span>
						</Box>
						<Box marginTop='15px'>
							<span
								style={{
									color: '#000000',
									fontFamily: 'Calibri',
									fontWeight: 'lighter',
									fontSize: 20,
								}}
							>
								{props.categoryDescription}
							</span>
						</Box>
					</CardContent>
				</CardActionArea>
				<CardActions
					style={{
						justifyContent: 'space-around',
					}}
				>
					{props.adminAccess === false && (
						<Link
							to={`/products/category/${props.category}`}
							style={{
								textDecoration: 'none',
							}}
						>
							<Button
								size='small'
								style={{
									color: '#CCAC00',
									fontFamily: 'Calibri',
									fontWeight: '600',
									fontSize: 16,
									textTransform: 'uppercase',
								}}
							>
								View
							</Button>
						</Link>
					)}
					{props.adminAccess && (
						<>
							<Link
								to={`/admin/product/categories/edit/${props.categoryID}`}
								style={{
									textDecoration: 'none',
								}}
							>
								<Button
									size='small'
									style={{
										color: '#CCAC00',
										fontFamily: 'Calibri',
										fontWeight: '600',
										fontSize: 16,
										textTransform: 'uppercase',
									}}
								>
									Edit
								</Button>
							</Link>

							<Button
								size='small'
								style={{
									color: '#CCAC00',
									fontFamily: 'Calibri',
									fontWeight: '600',
									fontSize: 16,
									textTransform: 'uppercase',
								}}
								onClick={() => deleteProduct(props.categoryID)}
							>
								Delete
							</Button>
						</>
					)}
				</CardActions>
			</Card>
		</>
	);
}

ProductCategoryCard.defaultProps = {
	adminAccess: false,
};
export default ProductCategoryCard;
