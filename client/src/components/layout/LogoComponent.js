import { Box } from '@material-ui/core';
import React from 'react';
import LogoImage from '../../assets/images/logo.svg';

function LogoComponent() {
	return (
		<Box maxWidth='50%' display='flex' justifyContent='center'>
			<img
				src={LogoImage}
				alt='Glow Stopper'
				style={{
					height: 'auto',
					width: '90%',
				}}
			/>
		</Box>
	);
}

export default LogoComponent;
