import React, { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import AppContext from '../AppContext';
// import CryptoJS from 'crypto-js';
// import { encrypt_key } from '../../../app.json';

export default function PrivateRoute({
	component: Component,
	restricted,
	...rest
}) {
	const history = useHistory();
	const { contextVariables, setContextVariables } = React.useContext(AppContext);
	const currentDate = new Date().getTime();
	const [isLoggedIn, setLoggedInStatus] = React.useState(true);

	useEffect(() => {
		const verifyLoginState = () => {
			let storedSession = JSON.parse(
				localStorage.getItem('sessionDetails_glowStopper'),
			);

			if (!storedSession) {
				// No stored session
				setLoggedInStatus(false);
				setContextVariables({
					...contextVariables,
					loggedInStatus: false,
					feedback: {
						...contextVariables.feedback,
						open: true,
						message: 'Login to continue',
						type: 'info',
					},
				});
				return history.push('/admin/login');
			} else if (!storedSession.adminPrivilege) {
				// User has no admin privilege
				setLoggedInStatus(false);
				setContextVariables({
					...contextVariables,
					loggedInStatus: false,
					feedback: {
						...contextVariables.feedback,
						open: true,
						message: 'Login to continue',
						type: 'info',
					},
				});

				return history.push('/admin/login');
			} else {
				// storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
				// storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));

				if (currentDate > storedSession.expiresIn) {
					localStorage.removeItem('sessionDetails_glowStopper');
					setContextVariables({
						...contextVariables,
						loggedInStatus: false,
						feedback: {
							...contextVariables.feedback,
							open: true,
							message: 'Login to continue',
							type: 'info',
						},
					});
					return history.push('/admin/login');
				} else {
					setContextVariables({
						...contextVariables,
						loggedInStatus: true,
					});
				}
			}
		};
		verifyLoginState();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Route
			{...rest}
			render={(props) =>
				isLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/admin/login',
							state: { oldPath: props.location.pathname },
						}}
					/>
					// history.push('/dashboard')
				)
			}
		/>
	);
}
