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

function ProductCard(props) {
	return (
		<Card
			style={{
				maxWidth: 391,
				marginBottom: 40,
			}}
		>
			<CardActionArea>
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
							{props.productPrice}
						</span>
					</Box>
				</CardContent>
			</CardActionArea>
			<CardActions>
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
			</CardActions>
		</Card>
	);
}

export default ProductCard;
