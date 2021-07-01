import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AppContext from '../AppContext';
// import CryptoJS from 'crypto-js';
// import { encrypt_key } from '../../../app.json';

export default function PublicRoute({
	component: Component,
	restricted,
	...rest
}) {
	const { contextVariables, setContextVariables } = React.useContext(AppContext);
	const [isLoggedIn, setLoggedInStatus] = React.useState(false);

	const currentDate = new Date().getTime();
	useEffect(() => {
		const verifyLoginState = () => {
			let storedSession = JSON.parse(
				localStorage.getItem('sessionDetails_glowStopper'),
			);

			if (!storedSession) {
				// No stored session
				setContextVariables({
					...contextVariables,
					loggedInStatus: false,
				});
			} else if (!storedSession.adminPrivilege) {
				//User is not an authorized admin
				setContextVariables({
					...contextVariables,
					loggedInStatus: false,
				});
			} else {
				// storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
				// storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));

				setLoggedInStatus(true);

				if (currentDate > storedSession?.expiresIn) {
					localStorage.removeItem('sessionDetails_glowStopper');
					setContextVariables({
						...contextVariables,
						loggedInStatus: false,
					});
				} else {
					if (restricted) {
						// For restricted public pages
						setContextVariables({
							...contextVariables,
							loggedInStatus: true,
							feedback: {
								...contextVariables.feedback,
								open: true,
								message: 'You are currently logged in',
							},
						});
					} else {
						// For normal public pages
						setContextVariables({
							...contextVariables,
							loggedInStatus: true,
						});
					}
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
				isLoggedIn && restricted ? (
					<Redirect to='/admin/dashboard' />
				) : (
					// history.push('/dashboard')
					<Component {...props} />
				)
			}
		/>
	);
}
