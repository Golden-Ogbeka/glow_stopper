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

function ProductCategoryCard(props) {
	const history = useHistory();
	return (
		<>
			<Card
				style={{
					maxWidth: 391,
					marginBottom: 40,
				}}
			>
				<CardActionArea
					onClick={() => history.push(`/products/category/${props.category}`)}
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
						justifyContent: 'center',
					}}
				>
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
							View category
						</Button>
					</Link>
				</CardActions>
			</Card>
		</>
	);
}

export default ProductCategoryCard;
