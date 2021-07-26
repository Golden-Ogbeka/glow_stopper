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
import AppContext from '../../../utils/AppContext';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { encrypt_key } from './../../../app.json';
function ProductCard(props) {
	const history = useHistory();
	const { contextVariables, setContextVariables } = React.useContext(AppContext);

	const deleteProduct = async (productID) => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			try {
				let storedSession = JSON.parse(
					localStorage.getItem('sessionDetails_glowStopper'),
				);
				storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
				storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));
				const response = await axios.delete(`/admin/product/${productID}`, {
					headers: {
						token: storedSession.userToken,
					},
				});

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

	const addToCart = async (productID) => {
		const { adminAccess, ...productDetails } = props; //To exclude adminAccess when added to localStorage
		if (JSON.parse(localStorage.getItem('cart_glowStopper'))) {
			// If cart is not empty
			localStorage.setItem(
				'cart_glowStopper',
				JSON.stringify([
					...JSON.parse(localStorage.getItem('cart_glowStopper')),
					productDetails,
				]),
			);
		} else {
			localStorage.setItem('cart_glowStopper', JSON.stringify([productDetails]));
		}
	};
	return (
		<Card
			style={{
				maxWidth: 391,
				marginBottom: 40,
			}}
		>
			<CardActionArea
				onClick={
					props.adminAccess
						? () => history.push(`/admin/product/description/${props.productID}`)
						: () => history.push(`/product/view/${props.productID}`)
				}
			>
				<CardMedia
					image={props.productImage}
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
							{props.productName}
						</span>
					</Box>
					<Box marginTop='15px'>
						<span
							style={{
								color: '#43A047',
								fontFamily: 'Calibri',
								fontWeight: 'bold',
								fontSize: 24,
								textTransform: 'uppercase',
							}}
						>
							&#8358;{new Intl.NumberFormat('en-US').format(props.productPrice)}
						</span>
					</Box>
				</CardContent>
			</CardActionArea>
			<CardActions
				style={{
					justifyContent: 'space-around',
				}}
			>
				{props.adminAccess ? (
					<>
						<Link
							to={`/admin/product/description/${props.productID}`}
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
						<Link
							to={`/admin/product/edit/${props.productID}`}
							style={{
								fontWeight: 'bolder',
								fontFamily: 'Calibri',
								textDecoration: 'none',
							}}
						>
							<Button
								size='small'
								style={{
									color: '#5bc0de',
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
								color: '#d9534f',
								fontFamily: 'Calibri',
								fontWeight: '600',
								fontSize: 16,
								textTransform: 'uppercase',
							}}
							onClick={() => deleteProduct(props.productID)}
						>
							Delete
						</Button>
					</>
				) : (
					<>
						<Link
							to={`/product/view/${props.productID}`}
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

						<Button
							size='small'
							style={{
								color: '#CCAC00',
								fontFamily: 'Calibri',
								fontWeight: '600',
								fontSize: 16,
								textTransform: 'uppercase',
							}}
							onClick={() => addToCart(props.productID)}
						>
							Add to Cart
						</Button>
					</>
				)}
			</CardActions>
		</Card>
	);
}

ProductCard.defaultProps = {
	adminAccess: false,
};

export default ProductCard;
