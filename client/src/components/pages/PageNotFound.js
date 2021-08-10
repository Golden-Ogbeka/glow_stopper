import { Box, Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import MetaTags from '../../utils/MetaTags';
import CustomerNavbar from '../layout/CustomerNavbar';

function PageNotFound() {
	return (
		<>
			<CustomerNavbar />
			<MetaTags
				title='Glow Stopper - 404'
				description='Page not found'
				noIndex={true}
			/>
			<div style={{ minHeight: '100vh' }}>
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
						Page not found
					</span>
				</Box>
				<Box
					minHeight='542px'
					style={{
						marginInline: '3vw',
						display: 'flex',
						justifyContent: 'center',
						textAlign: 'center',
					}}
				>
					<Box
						display='flex'
						alignItems='center'
						justifyContent='center'
						flexWrap='wrap'
					>
						<Box>
							<span
								style={{
									fontFamily: 'Calibri',
									fontWeight: 'normal',
									fontSize: '4vh',
									color: '#000000',
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
										size='large'
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
										size='large'
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
										size='large'
									>
										Contact
									</Button>
								</Link>
							</Box>
						</Box>
					</Box>
				</Box>
			</div>
		</>
	);
}

export default PageNotFound;
