import { Box, Hidden } from '@material-ui/core';
import { Copyright } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				style={{
					backgroundColor: '#000000',
					height: 64,
				}}
			>
				<Link
					to='/'
					style={{
						fontFamily: 'Calibri',
						color: '#FFFFFF',
						fontSize: 16,
						paddingInline: 20,
						textDecoration: 'none',
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Copyright
						style={{
							marginRight: 10,
						}}
					/>
					{new Date().getFullYear()}. Glow Stopper
				</Link>
				<Hidden smDown>
					<Box
						style={{
							paddingInline: 20,
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Link
							to='/products'
							style={{
								marginRight: 98,
								textDecoration: 'none',
								fontFamily: 'Calibri',
								color: '#FFFFFF',
								fontSize: 16,
							}}
						>
							PRODUCTS
						</Link>
						<Link
							to='/about'
							style={{
								marginRight: 98,
								textDecoration: 'none',
								fontFamily: 'Calibri',
								color: '#FFFFFF',
								fontSize: 16,
							}}
						>
							ABOUT
						</Link>
						<Link
							to='/contact'
							style={{
								textDecoration: 'none',
								fontFamily: 'Calibri',
								color: '#FFFFFF',
								fontSize: 16,
							}}
						>
							CONTACT
						</Link>
					</Box>
				</Hidden>
			</Box>
		</>
	);
}

export default Footer;
