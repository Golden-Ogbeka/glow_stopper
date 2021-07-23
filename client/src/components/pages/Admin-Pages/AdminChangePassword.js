import {
	Box,
	Button,
	CircularProgress,
	makeStyles,
	TextField,
} from '@material-ui/core';
import React from 'react';
import AdminNavbar from '../../layout/Admin/AdminNavbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AppContext from '../../../utils/AppContext';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { encrypt_key } from '../../../app.json';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginBlock: theme.spacing(1),
			width: '100%',
		},
	},
}));

function AdminChangePassword() {
	const classes = useStyles();
	const [loading, setLoading] = React.useState(false);
	const { contextVariables, setContextVariables } = React.useContext(AppContext);
	const history = useHistory();
	const formik = useFormik({
		initialValues: {
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
		validationSchema: Yup.object({
			oldPassword: Yup.string().required('Old Password is required'),
			newPassword: Yup.string()
				.required('New Password is required')
				.notOneOf(
					[Yup.ref('oldPassword'), null],
					'New Password must be different from old password',
				),
			confirmNewPassword: Yup.string()
				.required('Confirm your password')
				.oneOf([Yup.ref('newPassword'), null], "New Passwords don't match"),
		}),
		onSubmit: (values) => {
			changeAdminPassword(values);
		},
		enableReinitialize: true,
	});

	const changeAdminPassword = async (values) => {
		try {
			setLoading(true);
			let storedSession = JSON.parse(
				localStorage.getItem('sessionDetails_glowStopper'),
			);
			storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
			storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));
			const response = await axios.post(
				'/admin/changePassword',
				{
					oldPassword: values.oldPassword,
					newPassword: values.newPassword,
					userEmail: storedSession.userDetails.email,
				},
				{
					headers: {
						token: storedSession.userToken,
					},
				},
			);
			if (response.data.status === 'PASSED') {
				setLoading(false);
				setContextVariables({
					...contextVariables,
					feedback: {
						...contextVariables.feedback,
						open: true,
						type: 'success',
						message: response.data.message,
					},
				});
				history.push('/admin/dashboard');
			} else {
				setLoading(false);
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
						Change Password
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
					<form className={classes.root} onSubmit={formik.handleSubmit}>
						<TextField
							label='Old Password'
							variant='outlined'
							required
							type='password'
							id='oldPassword'
							name='oldPassword'
							placeholder='Enter your old password'
							onChange={formik.handleChange}
							value={formik.values.oldPassword || ''}
							onBlur={formik.handleBlur}
							error={formik.touched.oldPassword && formik.errors.oldPassword}
							helperText={
								formik.touched.oldPassword &&
								formik.errors.oldPassword &&
								formik.errors.oldPassword
							}
						/>
						<TextField
							label='New Password'
							variant='outlined'
							required
							type='password'
							id='newPassword'
							name='newPassword'
							placeholder='Enter your new password'
							onChange={formik.handleChange}
							value={formik.values.newPassword || ''}
							onBlur={formik.handleBlur}
							error={formik.touched.newPassword && formik.errors.newPassword}
							helperText={
								formik.touched.newPassword &&
								formik.errors.newPassword &&
								formik.errors.newPassword
							}
						/>
						<TextField
							label='Confirm Password'
							variant='outlined'
							required
							type='password'
							id='confirmNewPassword'
							name='confirmNewPassword'
							placeholder='Enter your new password again'
							onChange={formik.handleChange}
							value={formik.values.confirmNewPassword || ''}
							onBlur={formik.handleBlur}
							error={
								formik.touched.confirmNewPassword && formik.errors.confirmNewPassword
							}
							helperText={
								formik.touched.confirmNewPassword &&
								formik.errors.confirmNewPassword &&
								formik.errors.confirmNewPassword
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
									Change Password
								</Button>
							)}
						</center>
					</form>
				</Box>
			</div>
		</>
	);
}

export default AdminChangePassword;
