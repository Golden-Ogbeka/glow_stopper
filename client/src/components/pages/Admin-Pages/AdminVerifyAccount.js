import React from 'react';

import { Box, TextField, Button, makeStyles } from '@material-ui/core';
import AdminNavbar from '../../layout/Admin/AdminNavbar';

const useStyles = makeStyles((theme) => ({
	form: {
		'& > *': {
			marginBlock: theme.spacing(1),
			width: '100%',
		},
		paddingTop: 30,
	},
}));

function AdminVerifyAccount() {
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
						paddingTop: '30px',
						paddingInline: '15vw',
						justifyContent: 'center',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<h2
						style={{
							margin: 0,
							fontFamily: 'Calibri',
							fontWeight: 'normal',
							fontSize: 38,
						}}
					>
						Verify Account
					</h2>
					<h2
						style={{
							margin: 0,
							fontFamily: 'Calibri',
							fontWeight: 'lighter',
							fontSize: 20,
						}}
					>
						Enter the code sent to your email
					</h2>
					<form className={classes.form}>
						<TextField label='Code' variant='outlined' type='password' required />
						<center>
							<Button
								variant='contained'
								style={{
									width: 173,
									height: 57,
									borderRadius: 4,
									marginTop: '40px',
									color: '#FFFFFF',
									backgroundColor: '#836E00',
								}}
								type='submit'
							>
								Verify
							</Button>
						</center>
					</form>
				</Box>
			</div>
		</>
	);
}

export default AdminVerifyAccount;
