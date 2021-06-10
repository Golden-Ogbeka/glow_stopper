import { Box, Button, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
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
		</div>
	);
}

export default Contact;
