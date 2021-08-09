import {
	Box,
	Button,
	CircularProgress,
	Grid,
	makeStyles,
	TextField,
} from '@material-ui/core';
import React from 'react';
import { Facebook, Instagram, WhatsApp } from '@material-ui/icons';
import LogoComponent from '../layout/LogoComponent';
import CustomerNavbar from '../layout/CustomerNavbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AppContext from '../../utils/AppContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			marginBlock: theme.spacing(1),
			width: '100%',
		},
	},
}));

function Contact() {
	const classes = useStyles();
	const [loading, setLoading] = React.useState(false);
	const { contextVariables, setContextVariables } = React.useContext(AppContext);
	const formik = useFormik({
		initialValues: {
			fullName: '',
			email: '',
			phoneNumber: '',
			message: '',
		},
		validationSchema: Yup.object({
			fullName: Yup.string()
				.required('Full name is required')
				.min(5, 'Please input your full name'),
			email: Yup.string()
				.email('Enter a valid email')
				.required('Email is required'),
			phoneNumber: Yup.number()
				.test(
					'length',
					'Enter a valid phone number',
					(val) => val && val.toString().length >= 10 && val.toString().length <= 11,
				)
				.required('Phone number is required')
				.typeError('Can only be numbers'),
			message: Yup.string().required('Your message is required'),
		}),
		onSubmit: (values) => {
			sendMessage(values);
		},
		enableReinitialize: true,
	});

	const sendMessage = async (values) => {
		try {
			setLoading(true);
			const response = await axios.post('/contact', values);
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
				formik.resetForm();
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
			setLoading(false);
		}
	};
	return (
		<>
			<CustomerNavbar />
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
					<LogoComponent />
					<Box paddingTop='18px'>
						<span
							style={{
								fontFamily: 'Calibri',
								fontWeight: 'lighter',
								fontSize: 48,
								color: '#FFFFFF',
							}}
						>
							Contact us
						</span>
					</Box>
				</Box>
				<Box
					minHeight='542px'
					style={{
						display: 'flex',
						justifyContent: 'center',
						textAlign: 'center',
					}}
				>
					<Box
						style={{
							paddingInline: '3vw',
							paddingTop: 80,
						}}
					>
						<span
							style={{
								fontFamily: 'Calibri',
								fontSize: 40,
								fontWeight: 'bold',
							}}
						>
							Send us a message
						</span>
						<Box maxWidth='100%'>
							<form
								style={{
									paddingTop: 15,
									paddingBottom: 80,
								}}
								className={classes.root}
								onSubmit={formik.handleSubmit}
							>
								<TextField
									label='Full name'
									variant='outlined'
									required
									type='text'
									id='fullName'
									name='fullName'
									placeholder='Enter your full name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.fullName || ''}
									error={formik.touched.fullName && formik.errors.fullName}
									helperText={
										formik.touched.fullName &&
										formik.errors.fullName &&
										formik.errors.fullName
									}
								/>
								<TextField
									label='Email'
									variant='outlined'
									required
									type='email'
									id='email'
									name='email'
									placeholder='Enter your email'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.email || ''}
									error={formik.touched.email && formik.errors.email}
									helperText={
										formik.touched.email && formik.errors.email && formik.errors.email
									}
								/>
								<TextField
									label='Phone number'
									variant='outlined'
									required
									type='text'
									id='phoneNumber'
									name='phoneNumber'
									placeholder='Enter your phone number'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.phoneNumber || ''}
									error={formik.touched.phoneNumber && formik.errors.phoneNumber}
									helperText={
										formik.touched.phoneNumber &&
										formik.errors.phoneNumber &&
										formik.errors.phoneNumber
									}
								/>
								<TextField
									label='Message'
									variant='outlined'
									required
									type='text'
									id='message'
									name='message'
									placeholder='Enter your message'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.message || ''}
									error={formik.touched.message && formik.errors.message}
									helperText={
										formik.touched.message &&
										formik.errors.message &&
										formik.errors.message
									}
									multiline
									rows={3}
								/>

								<Button
									variant='contained'
									style={{
										width: 173,
										height: 57,
										borderRadius: 4,
										color: '#FFFFFF',
										backgroundColor: '#836E00',
									}}
									type='submit'
								>
									{loading ? (
										<CircularProgress color='inherit' size={20} />
									) : (
										<>Send Message</>
									)}
								</Button>
							</form>
						</Box>
					</Box>
				</Box>
				<Box
					style={{
						minHeight: 559,
						backgroundColor: '#E6C200',
					}}
				>
					<Box
						style={{
							paddingBlock: 46,
							paddingInline: '3vw',
						}}
					>
						<Grid container spacing={4}>
							<Grid item>
								<h3
									style={{
										fontFamily: 'Calibri',
										fontSize: 40,
										fontWeight: 'bold',
									}}
								>
									Our contact info
								</h3>
								<p>
									<Box>
										<span
											style={{
												fontFamily: 'Calibri',
												fontSize: 30,
												fontWeight: 'lighter',
											}}
										>
											<b>Address:</b> 11 Alhaja Jaiyeola street Alagbole, Ogun State,
											Nigeria
										</span>
									</Box>

									<Box paddingTop='15px'>
										<span
											style={{
												fontFamily: 'Calibri',
												fontSize: 30,
												fontWeight: 'lighter',
											}}
										>
											<b>Phone number:</b> 08135913900
										</span>
									</Box>

									<Box paddingTop='15px'>
										<span
											style={{
												fontFamily: 'Calibri',
												fontSize: 30,
												fontWeight: 'lighter',
											}}
										>
											<b>Email:</b> glowstopper@gmail.com
										</span>
									</Box>
								</p>
							</Grid>
							<Grid item>
								<h3
									style={{
										fontFamily: 'Calibri',
										fontSize: 40,
										fontWeight: 'bold',
									}}
								>
									Follow us on social media
								</h3>
								<p>
									<Box fontSize='50px'>
										<a
											href='https://www.facebook.com'
											target='_blank'
											rel='noreferrer'
											style={{
												display: 'flex',
												alignItems: 'center',
												textDecoration: 'none',
												color: '#000000',
											}}
										>
											<Facebook fontSize='inherit' style={{ paddingRight: 20 }} />
											<span
												style={{
													fontFamily: 'Calibri',
													fontSize: 30,
													fontWeight: 'lighter',
												}}
											>
												glow_stopper
											</span>
										</a>
									</Box>
									<Box fontSize='50px' paddingTop='15px'>
										<a
											href='https://www.instagram.com'
											target='_blank'
											rel='noreferrer'
											style={{
												display: 'flex',
												alignItems: 'center',
												textDecoration: 'none',
												color: '#000000',
											}}
										>
											<Instagram fontSize='inherit' style={{ paddingRight: 20 }} />
											<span
												style={{
													fontFamily: 'Calibri',
													fontSize: 30,
													fontWeight: 'lighter',
												}}
											>
												glow_stopper
											</span>
										</a>
									</Box>
									<Box fontSize='50px' paddingTop='15px'>
										<a
											href='https://www.wa.me/+2348135913900'
											target='_blank'
											rel='noreferrer'
											style={{
												display: 'flex',
												alignItems: 'center',
												textDecoration: 'none',
												color: '#000000',
											}}
										>
											<WhatsApp fontSize='inherit' style={{ paddingRight: 20 }} />
											<span
												style={{
													fontFamily: 'Calibri',
													fontSize: 30,
													fontWeight: 'lighter',
												}}
											>
												glow_stopper
											</span>
										</a>
									</Box>
								</p>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</div>
		</>
	);
}

export default Contact;
