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

function ProductCard(props) {
	const history = useHistory();
	return (
		<Card
			style={{
				maxWidth: 391,
				marginBottom: 40,
			}}
		>
			<CardActionArea
				onClick={() => history.push(`/product/view/${props.productID}`)}
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
							&#8358;{props.productPrice}
						</span>
					</Box>
				</CardContent>
			</CardActionArea>
			<CardActions>
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
						>
							Add to Cart
						</Button>
					</>
				)}
			</CardActions>
		</Card>
	);
}

export default ProductCard;
