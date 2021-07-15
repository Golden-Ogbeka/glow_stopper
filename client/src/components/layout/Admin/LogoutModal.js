import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AppContext from '../../../utils/AppContext';

function LogoutModal(props) {
	const history = useHistory();
	const { contextVariables, setContextVariables } = React.useContext(AppContext);

	const logoutUser = () => {
		props.closeLogoutModal();
		history.push('/admin/login');
		localStorage.removeItem('sessionDetails_glowStopper');
		setContextVariables({
			...contextVariables,
			loggedInStatus: false,
			feedback: {
				...contextVariables.feedback,
				open: true,
				type: 'success',
				message: 'Logout Successful',
			},
		});
	};
	return (
		<Dialog open={props.logoutModalState} onClose={props.closeLogoutModal}>
			<DialogTitle>
				<span
					style={{
						fontFamily: 'Calibri',
						fontWeight: 'bold',
					}}
				>
					Logout
				</span>
			</DialogTitle>
			<DialogContent>
				<DialogContentText
					style={{
						fontFamily: 'Calibri',
					}}
				>
					Are you sure you want to logout?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					style={{
						textTransform: 'none',
						fontFamily: 'Calibri',
					}}
					color='default'
					onClick={props.closeLogoutModal}
					variant='contained'
				>
					No
				</Button>
				<Button
					style={{
						fontFamily: 'Calibri',
						textTransform: 'none',
						color: '#FFD700',
						backgroundColor: '#000000',
					}}
					onClick={logoutUser}
					variant='contained'
				>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default LogoutModal;
