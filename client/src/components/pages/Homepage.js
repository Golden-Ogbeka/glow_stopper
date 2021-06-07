import React from 'react';
import { Box } from '@material-ui/core';
import LogoComponent from '../layout/LogoComponent';

function Homepage() {
	return (
		<>
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
				<span
					style={{
						fontFamily: 'Calibri',
						fontWeight: 'lighter',
						fontSize: 48,
						color: '#FFFFFF',
					}}
				>
					Home of all products
				</span>
			</Box>
			<Box
				style={{
					height: 559,
					backgroundColor: '#FFFFFF',
				}}
			></Box>
			<Box
				style={{
					height: 559,
					backgroundColor: '#E6C200',
				}}
			></Box>
		</>
	);
}

export default Homepage;
