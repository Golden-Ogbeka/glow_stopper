import { Box, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box
					style={{
						paddingTop: 30,
					}}
				>
					<Typography style={{ fontWeight: 'bold' }}>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function TabBar(props) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<>
			<Paper square>
				<Tabs
					variant={props.variant}
					value={value}
					onChange={handleChange}
					indicatorColor='primary'
				>
					{props.tabs.map((tab, index) => (
						<Tab label={tab} tabIndex={index} style={props.style} {...a11yProps(0)} />
					))}
				</Tabs>
			</Paper>
			{props.tabContents.map((tabContent, index) => (
				<TabPanel value={value} index={index}>
					{tabContent}
				</TabPanel>
			))}
		</>
	);
}

TabBar.defaultProps = {
	style: {
		textTransform: 'none',
		fontFamily: 'Sora ExtraBold',
		fontSize: 18,
		textAlign: 'left',
		color: '#2A2E43',
	},
	variant: 'fullWidth',
};
