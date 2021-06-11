import { Box, Button, Grid, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { Facebook, Instagram, WhatsApp } from '@material-ui/icons';
import LogoComponent from '../layout/LogoComponent';

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
	return (
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
						>
							<TextField label='Full name' variant='outlined' />
							<TextField label='Email' variant='outlined' />
							<TextField label='Phone number' variant='outlined' />
							<br />
							<TextField
								label='Your message'
								variant='outlined'
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'start',
								}}
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
							>
								Send Message
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
	);
}

export default Contact;
