import React from 'react';
import {
	Box,
	TextField,
	Button,
	makeStyles,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';
import AdminNavbar from '../../../layout/Admin/AdminNavbar';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginBlock: theme.spacing(1),
			width: '100%',
		},
	},
}));

function AdminAddProduct() {
	const classes = useStyles();
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
						Add product
					</span>
				</Box>
				<Box
					minHeight='70vh'
					style={{
						paddingTop: '40px',
						paddingInline: '10vw',
						// justifyContent: 'center',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<h2
						style={{
							margin: 0,
							fontSize: 30,
							fontWeight: 'normal',
							fontFamily: 'Calibri',
							marginBottom: '40px',
						}}
					>
						Enter the product details below
					</h2>
					<form className={classes.root}>
						<TextField label='Product name' variant='outlined' required type='text' />
						<FormControl variant='standard'>
							<InputLabel>Product category</InputLabel>
							<Select value='Dresses' label='Age'>
								<MenuItem value='Dresses'>Dresses</MenuItem>
								<MenuItem value='Shirts'>Shirts</MenuItem>
								<MenuItem value='Skirts'>Skirts</MenuItem>
							</Select>
						</FormControl>
						<TextField
							label='Product price'
							variant='outlined'
							required
							type='text'
						/>
						<TextField
							label='Product description'
							variant='outlined'
							required
							type='text'
							multiline
							rows='3'
						/>
						<Box
							style={{
								borderStyle: 'solid',
								borderWidth: '0.1px',
								display: 'flex',
								flexDirection: 'column',
								borderRadius: 4,
								borderColor: '#C4C4C4',
							}}
						>
							<label
								htmlFor='productImage'
								style={{
									padding: 10,
								}}
							>
								Select a product image
							</label>

							<input
								style={{
									paddingInline: 10,
									paddingBottom: 10,
								}}
								id='productImage'
								type='file'
								required
							/>
						</Box>

						<center>
							<Button
								variant='contained'
								style={{
									width: 173,
									height: 57,
									borderRadius: 4,
									marginBlock: '50px',
									color: '#FFFFFF',
									backgroundColor: '#836E00',
								}}
								type='submit'
							>
								Add Product
							</Button>
						</center>
					</form>
				</Box>
			</div>
		</>
	);
}

export default AdminAddProduct;
