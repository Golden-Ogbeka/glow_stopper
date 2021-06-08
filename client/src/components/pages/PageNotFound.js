import { Box, Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
	return (
		<div style={{ minHeight: '100vh' }}>
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
						fontWeight: 'lighter',
						fontSize: 144,
						color: '#FFD700',
					}}
				>
					Page not found
				</span>
			</Box>
			<center>
				<Box
					width='90vw'
					minHeight='542px'
					style={{
						backgroundColor: '#000000',
						marginBlock: 91,
					}}
				>
					<Box
						padding='91px'
						display='flex'
						alignItems='center'
						justifyContent='space-between'
					>
						<span
							style={{
								fontFamily: 'Elsie',
								fontWeight: 'bold',
								fontSize: 144,
								color: '#FFD700',
							}}
						>
							404
						</span>
						<Box maxWidth='641px' textAlign='left'>
							<span
								style={{
									fontFamily: 'Calibri',
									fontWeight: 'bold',
									fontSize: 40,
									color: '#FFFFFF',
								}}
							>
								We couldn’t find the page you are looking for. Use any of the links
								below to go to other pages
							</span>
							<Box paddingTop='40px' marginBottom='40px'>
								<Link
									to='/'
									style={{
										textDecoration: 'none',
									}}
								>
									<Button
										variant='contained'
										style={{
											color: '#FFFFFF',
											backgroundColor: '#836E00',
										}}
									>
										Home
									</Button>
								</Link>
								<Link
									to='/about'
									style={{
										textDecoration: 'none',
										marginLeft: 30,
										marginRight: 30,
									}}
								>
									<Button
										variant='contained'
										style={{
											color: '#FFFFFF',
											backgroundColor: '#836E00',
										}}
									>
										About
									</Button>
								</Link>
								<Link
									to='/contact'
									style={{
										textDecoration: 'none',
									}}
								>
									<Button
										variant='contained'
										style={{
											color: '#FFFFFF',
											backgroundColor: '#836E00',
										}}
									>
										Contact
									</Button>
								</Link>
							</Box>
						</Box>
					</Box>
				</Box>
			</center>
		</div>
	);
}

export default PageNotFound;
