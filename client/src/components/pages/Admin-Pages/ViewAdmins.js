import {
	Box,
	Button,
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	Paper,
} from '@material-ui/core';
import React from 'react';
import AdminNavbar from '../../layout/Admin/AdminNavbar';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { encrypt_key } from './../../../app.json';
import { Link } from 'react-router-dom';

function ViewAdmins() {
	const [admins, setAdmins] = React.useState([]);

	React.useEffect(() => {
		const getAdmins = async () => {
			try {
				let storedSession = JSON.parse(
					localStorage.getItem('sessionDetails_glowStopper'),
				);
				storedSession = CryptoJS.AES.decrypt(storedSession, encrypt_key);
				storedSession = JSON.parse(storedSession.toString(CryptoJS.enc.Utf8));
				const response = await axios.get('/admins', {
					headers: {
						token: storedSession.userToken,
					},
				});

				if (response.data.status === 'PASSED') {
					setAdmins(response.data.admins);
				}
			} catch (error) {
				setAdmins([]);
				console.log(error);
			}
		};
		getAdmins();
	}, []);

	const removeAdmin = () => {};
	return (
		<>
			<AdminNavbar />
			<div
				style={{
					minHeight: '100vh',
				}}
			>
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
						Admins
					</span>
				</Box>
				<Box padding='30px'>
					{admins.length > 0 ? (
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell align='center'>S/N</TableCell>
										<TableCell align='center'>Name</TableCell>
										<TableCell align='center'>Email</TableCell>
										<TableCell align='center'></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{admins.map((admin, index) => (
										<TableRow key={index}>
											<TableCell align='center'>{index + 1}</TableCell>
											<TableCell align='center'>{admin.name}</TableCell>
											<TableCell align='center'>{admin.email}</TableCell>
											<TableCell align='center'>
												<Button
													style={{
														color: '#FFFFFF',
														backgroundColor: '#d9534f',
														borderRadius: 4,
														width: '100%',
													}}
													onClick={() => removeAdmin(admin.email)}
												>
													Remove
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					) : (
						<></>
					)}
				</Box>
				<center>
					<Link
						to='/admins/new'
						style={{
							textDecoration: 'none',
							width: '100%',
						}}
					>
						<Button
							style={{
								color: '#FFFFFF',
								backgroundColor: '#836E00',
								borderRadius: 4,
								width: '200px',
							}}
						>
							Add new Admin
						</Button>
					</Link>
				</center>
			</div>
		</>
	);
}

export default ViewAdmins;
