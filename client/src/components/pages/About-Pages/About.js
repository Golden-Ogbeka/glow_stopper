import { Box } from '@material-ui/core';
import React from 'react';
import LogoComponent from '../../layout/LogoComponent';
import TabBar from '../../layout/TabBar';
import AboutFocus from './AboutFocus';
import AboutHistory from './AboutHistory';
import CustomerNavbar from '../../layout/CustomerNavbar';
import MetaTags from '../../../utils/MetaTags';

function About() {
	return (
		<>
			<CustomerNavbar />
			<MetaTags
				title='Glow Stopper - About us'
				description='Our mission, vision and what we stand for'
			/>
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
							About us
						</span>
					</Box>
				</Box>
				<TabBar
					tabs={['Our History', 'Our Focus']}
					style={{
						textTransform: 'uppercase',
						fontWeight: 'bold',
						fontSize: 14,
						textAlign: 'left',
						color: '#957D00',
					}}
					variant='fullWidth'
					tabContents={[<AboutHistory />, <AboutFocus />]}
				/>
			</div>
		</>
	);
}

export default About;
