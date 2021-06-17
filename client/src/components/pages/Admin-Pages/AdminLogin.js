import React from 'react';
import {
	Box,
	TextField,
	Button,
	makeStyles,
	CircularProgress,
} from '@material-ui/core';
import AdminNavbar from '../../layout/Admin/AdminNavbar';
import axios from 'axios';
import AppContext from '../../../utils/AppContext';
import { useHistory } from 'react-router-dom';

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
	const { contextVariables, setContextVariables } = React.useContext(AppContext);
	const [inputValues, setInputValues] = React.useState({
		email: '',
		password: '',
	});
	const history = useHistory();
	const [loading, setLoading] = React.useState(false);

	const authenticateAdmin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post(
				'http://localhost:5000/admin/login',
				inputValues,
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
				history.push('/admin/verify', { email: inputValues.email });
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
					message: error.response ? error.response.data : 'Login Unsuccessful',
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
						// paddingTop: '83px',
						paddingInline: '15vw',
						justifyContent: 'center',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<form className={classes.root} onSubmit={(e) => authenticateAdmin(e)}>
						<TextField
							label='Email'
							variant='outlined'
							required
							type='email'
							value={inputValues.email || ''}
							onChange={(e) =>
								setInputValues({ ...inputValues, email: e.target.value })
							}
						/>
						<TextField
							label='Password'
							variant='outlined'
							type='password'
							value={inputValues.password}
							required
							onChange={(e) =>
								setInputValues({ ...inputValues, password: e.target.value })
							}
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
										marginTop: '60px',
										color: '#FFFFFF',
										backgroundColor: '#836E00',
									}}
									type='submit'
								>
									Sign in
								</Button>
							)}
						</center>
					</form>
				</Box>
			</div>
		</>
	);
}

export default AdminLogin;
