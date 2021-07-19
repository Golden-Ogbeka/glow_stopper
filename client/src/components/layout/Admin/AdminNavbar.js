import React from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Button,
	Box,
	Hidden,
	MenuItem,
	Menu,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { MoreVert, Menu as MenuIcon } from '@material-ui/icons';
import AppContext from '../../../utils/AppContext';
import LogoutModal from './LogoutModal';

function AdminNavbar() {
	const [menuAnchor, setMenuAnchor] = React.useState(null);

	const { contextVariables } = React.useContext(AppContext);
	const [logoutModalState, setLogoutModalState] = React.useState(false);

	const closeLogoutModal = () => {
		setLogoutModalState(false);
	};
	const openLogoutModal = () => {
		setLogoutModalState(true);
	};

	const openMenu = (event) => {
		setMenuAnchor(event.currentTarget);
	};

	const closeMenu = () => {
		setMenuAnchor(null);
	};

	const logAdminOut = async () => {
		openLogoutModal();
	};

	return (
		<>
			<AppBar
				position='static'
				style={{
					height: 64,
					backgroundColor: '#000000',
					boxShadow: 'none',
				}}
			>
				<Toolbar>
					<IconButton
						edge='start'
						style={{
							marginRight: 20,
							display: 'flex',
							alignItems: 'center',
							verticalAlign: 'center',
						}}
						color='inherit'
						aria-label='menu'
					>
						<MenuIcon />
					</IconButton>
					<Box
						style={{
							flexGrow: 1,
						}}
					>
						<Link
							to='/admin/dashboard'
							style={{
								fontFamily: 'Elsie',
								fontWeight: 'bold',
								fontSize: 32,
								color: '#FFD700',
								flexGrow: 1,
								textDecoration: 'none',
							}}
						>
							Glow
						</Link>
					</Box>
					<Hidden smDown>
						<Box>
							{contextVariables.loggedInStatus === false ? (
								<>
									<Link
										to='/'
										style={{
											textDecoration: 'none',
											color: '#FFFFFF',
										}}
									>
										<Button
											color='inherit'
											style={{
												marginInline: 20,
												fontFamily: 'Calibri',
												fontWeight: 'normal',
												fontSize: 16,
											}}
										>
											Customer Section
										</Button>
									</Link>
									<Link
										to='/admin/login'
										style={{
											textDecoration: 'none',
											color: '#FFFFFF',
										}}
									>
										<Button
											color='inherit'
											style={{
												marginInline: 20,
												fontFamily: 'Calibri',
												fontWeight: 'normal',
												fontSize: 16,
											}}
										>
											Login
										</Button>
									</Link>
								</>
							) : (
								<>
									<Link
										to='/'
										style={{
											textDecoration: 'none',
											color: '#FFFFFF',
										}}
									>
										<Button
											color='inherit'
											style={{
												marginInline: 20,
												fontFamily: 'Calibri',
												fontWeight: 'normal',
												fontSize: 16,
											}}
										>
											Customer Section
										</Button>
									</Link>
									<Link
										to='/admin/product/new'
										style={{
											textDecoration: 'none',
											color: '#FFFFFF',
										}}
									>
										<Button
											color='inherit'
											style={{
												marginInline: 20,
												fontFamily: 'Calibri',
												fontWeight: 'normal',
												fontSize: 16,
											}}
										>
											Add Product
										</Button>
									</Link>
									<Link
										to='/admin/dashboard'
										style={{
											textDecoration: 'none',
											color: '#FFFFFF',
										}}
									>
										<Button
											color='inherit'
											style={{
												marginInline: 20,
												fontFamily: 'Calibri',
												fontWeight: 'normal',
												fontSize: 16,
											}}
										>
											Dashboard
										</Button>
									</Link>
									<Link
										onClick={(e) => {
											e.preventDefault();
											logAdminOut();
										}}
										to='#/'
										style={{
											textDecoration: 'none',
											color: '#FFFFFF',
										}}
									>
										<Button
											color='inherit'
											style={{
												marginInline: 20,
												fontFamily: 'Calibri',
												fontWeight: 'normal',
												fontSize: 16,
											}}
										>
											Logout
										</Button>
									</Link>
								</>
							)}
						</Box>
					</Hidden>
					<Hidden mdUp>
						<span onClick={openMenu}>
							<IconButton color='inherit' aria-label='more-options'>
								<MoreVert />
							</IconButton>
						</span>
						<Menu
							id='nav-menu'
							anchorEl={menuAnchor}
							keepMounted
							open={Boolean(menuAnchor)}
							onClose={closeMenu}
						>
							{contextVariables.loggedInStatus === false ? (
								<>
									<Link
										onClick={closeMenu}
										to='/'
										style={{
											color: '#000000',
											textDecoration: 'none',
										}}
									>
										<MenuItem onClick={closeMenu}>Customer Section</MenuItem>
									</Link>
									<Link
										onClick={closeMenu}
										to='/admin/login'
										style={{
											color: '#000000',
											textDecoration: 'none',
										}}
									>
										<MenuItem onClick={closeMenu}>Login</MenuItem>
									</Link>
								</>
							) : (
								<>
									<Link
										onClick={closeMenu}
										to='/'
										style={{
											color: '#000000',
											textDecoration: 'none',
										}}
									>
										<MenuItem onClick={closeMenu}>Customer Section</MenuItem>
									</Link>
									<Link
										onClick={closeMenu}
										to='/admin/product/new'
										style={{
											color: '#000000',
											textDecoration: 'none',
										}}
									>
										<MenuItem onClick={closeMenu}>Add Product</MenuItem>
									</Link>
									<Link
										onClick={closeMenu}
										to='/admin/dashboard'
										style={{
											color: '#000000',
											textDecoration: 'none',
										}}
									>
										<MenuItem onClick={closeMenu}>Dashboard</MenuItem>
									</Link>
									<Link
										onClick={(e) => {
											e.preventDefault();
											closeMenu();
											logAdminOut();
										}}
										to='#/'
										style={{
											color: '#000000',
											textDecoration: 'none',
										}}
									>
										<MenuItem onClick={closeMenu}>Logout</MenuItem>
									</Link>
								</>
							)}
						</Menu>
					</Hidden>
				</Toolbar>
			</AppBar>
			<LogoutModal
				logoutModalState={logoutModalState}
				closeLogoutModal={closeLogoutModal}
			/>
		</>
	);
}

export default AdminNavbar;
