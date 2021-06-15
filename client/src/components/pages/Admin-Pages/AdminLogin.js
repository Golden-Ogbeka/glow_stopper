import React from 'react';
import { Box, TextField, Button, makeStyles } from '@material-ui/core';
import AdminNavbar from '../../layout/Admin/AdminNavbar';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginBlock: theme.spacing(1),
			width: '100%',
		},
	},
}));

function AdminLogin() {
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
						sign-in
					</span>
				</Box>
				<Box
					minHeight='70vh'
					style={{
						// paddingTop: '83px',
						paddingInline: '15vw',
						justifyContent: 'center',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<form className={classes.root}>
						<TextField label='Email' variant='outlined' required type='email' />
						<TextField label='Password' variant='outlined' type='password' required />
						<center>
							<Button
								variant='contained'
								style={{
									width: 173,
									height: 57,
									borderRadius: 4,
									marginTop: '60px',
									color: '#FFFFFF',
									backgroundColor: '#836E00',
								}}
								type='submit'
							>
								Sign in
							</Button>
						</center>
					</form>
				</Box>
			</div>
		</>
	);
}

export default AdminLogin;
