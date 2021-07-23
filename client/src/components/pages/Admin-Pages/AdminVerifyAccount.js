import React from 'react';

import {
	Box,
	TextField,
	Button,
	makeStyles,
	CircularProgress,
} from '@material-ui/core';
import AdminNavbar from '../../layout/Admin/AdminNavbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AppContext from '../../../utils/AppContext';
import axios from 'axios';
import cryptojs from 'crypto-js';
import { encrypt_key } from '../../../app.json';

const useStyles = makeStyles((theme) => ({
	form: {
		'& > *': {
			marginBlock: theme.spacing(1),
			width: '100%',
		},
		paddingTop: 30,
	},
}));

function AdminVerifyAccount(props) {
	const classes = useStyles();
	const userEmail = props.location.state?.email;
	const [tokenValue, setTokenValue] = React.useState('');
	const { contextVariables, setContextVariables } = React.useContext(AppContext);
	const [loading, setLoading] = React.useState(false);
	const history = useHistory();

	const verifyAdmin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post('/admin/verify', {
				tokenValue,
				userEmail,
			});

			if (response.data.status === 'PASSED') {
				setContextVariables({
					...contextVariables,
					loggedInStatus: true,
					feedback: {
						...contextVariables.feedback,
						open: true,
						type: 'success',
						message: response.data.message,
					},
				});
				const sessionDetails = {
					userDetails: response.data.userData,
					userToken: response.data.userToken,
					expiresIn: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
					adminPrivilege: true,
				};
				const encryptedUserSession = cryptojs.AES.encrypt(
					JSON.stringify(sessionDetails),
					encrypt_key,
				).toString();
				localStorage.setItem(
					'sessionDetails_glowStopper',
					JSON.stringify(encryptedUserSession),
				);
				history.push('/admin/dashboard');
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
			setLoading(false);
		} catch (error) {
			setLoading(false);
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
	};
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
					<form className={classes.form} onSubmit={(e) => verifyAdmin(e)}>
						<TextField
							label='Code'
							variant='outlined'
							type='password'
							required
							value={tokenValue}
							onChange={(e) => setTokenValue(e.target.value)}
						/>
						<center>
							{loading ? (
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
									<CircularProgress size={20} color='inherit' />
								</Button>
							) : (
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
							)}
						</center>
					</form>
				</Box>
			</div>
		</>
	);
}

export default AdminVerifyAccount;
