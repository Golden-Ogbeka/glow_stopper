import { Grid } from '@material-ui/core';
import React from 'react';

function AboutFocus() {
	return (
		<Grid
			container
			style={{
				minHeight: '100vh',
			}}
		>
			<Grid
				item
				lg={6}
				style={{
					paddingInline: 40,
				}}
			>
				<p
					style={{
						fontFamily: 'Calibri',
						fontWeight: 'bold',
						fontSize: 40,
						margin: 0,
					}}
				>
					Vision
				</p>
				<p
					style={{
						fontFamily: 'Calibri',
						fontWeight: 'normal',
						fontSize: 25,
						margin: 0,
					}}
				>
					To be the best in a nation of equality
				</p>
			</Grid>
			<Grid
				item
				lg={6}
				style={{
					paddingInline: 40,
				}}
			>
				<p
					style={{
						fontFamily: 'Calibri',
						fontWeight: 'bold',
						fontSize: 40,
						margin: 0,
					}}
				>
					Mission
				</p>
				<p
					style={{
						fontFamily: 'Calibri',
						fontWeight: 'normal',
						fontSize: 25,
						margin: 0,
					}}
				>
					To give you the best of our expectations
				</p>
			</Grid>
		</Grid>
	);
}

export default AboutFocus;
