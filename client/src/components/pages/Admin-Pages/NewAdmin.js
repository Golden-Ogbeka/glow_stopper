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
function NewAdmin() {
	const classes = useStyles();
	const [loading, setLoading] = React.useState(false);
	const { contextVariables, setContextVariables } = React.useContext(AppContext);
	const history = useHistory();
	const formik = useFormik({
		initialValues: {
			adminName: '',
			adminEmail: '',
			adminPassword: '',
		},
		validationSchema: Yup.object({
			adminName: Yup.string().required('Name is required'),
			adminEmail: Yup.string().email('Email is required'),
			adminPassword: Yup.string().required('Password is required'),
		}),
		onSubmit: (values) => {
			addAdmin(values);
		},
		enableReinitialize: true,
	});
	const addAdmin = async (values) => {
		try {
			setLoading(true);
			let storedSession = JSON.parse(
				localStorage.getItem('sessionDetails_glowStopper'),
			);
			storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
			storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));
			const response = await axios.post(
				'/admin/new',
				{
					adminName: values.adminName,
					adminEmail: values.adminEmail,
					adminPassword: values.adminPassword,
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
				history.push('/admins/view');
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
					message: error.response.data.message,
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
						minHeight: 368,
						backgroundColor: '#000000',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
					}}
				>
					<span
						style={{
							fontFamily: 'Elsie',
							fontWeight: 'lighter',
							fontSize: '10vh',
							color: '#FFD700',
						}}
					>
						New Admin
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
							label="Admin's Name"
							variant='outlined'
							required
							type='text'
							id='adminName'
							name='adminName'
							placeholder="Enter admin's name"
							onChange={formik.handleChange}
							value={formik.values.adminName || ''}
							onBlur={formik.handleBlur}
							error={formik.touched.adminName && formik.errors.adminName}
							helperText={
								formik.touched.adminName &&
								formik.errors.adminName &&
								formik.errors.adminName
							}
						/>
						<TextField
							label="Admin's Email"
							variant='outlined'
							required
							type='email'
							id='adminEmail'
							name='adminEmail'
							placeholder="Enter admin's email"
							onChange={formik.handleChange}
							value={formik.values.adminEmail || ''}
							onBlur={formik.handleBlur}
							error={formik.touched.adminEmail && formik.errors.adminEmail}
							helperText={
								formik.touched.adminEmail &&
								formik.errors.adminEmail &&
								formik.errors.adminEmail
							}
						/>
						<TextField
							label="Admin's Password"
							variant='outlined'
							required
							type='password'
							id='adminPassword'
							name='adminPassword'
							placeholder="Enter Admin's Password"
							onChange={formik.handleChange}
							value={formik.values.adminPassword || ''}
							onBlur={formik.handleBlur}
							error={formik.touched.adminPassword && formik.errors.adminPassword}
							helperText={
								formik.touched.adminPassword &&
								formik.errors.adminPassword &&
								formik.errors.adminPassword
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
									Add Admin
								</Button>
							)}
						</center>
					</form>
				</Box>
			</div>
		</>
	);
}

export default NewAdmin;
