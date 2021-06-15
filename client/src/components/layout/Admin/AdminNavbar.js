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

function AdminNavbar() {
	const [menuAnchor, setMenuAnchor] = React.useState(null);

	const openMenu = (event) => {
		setMenuAnchor(event.currentTarget);
	};

	const closeMenu = () => {
		setMenuAnchor(null);
	};

	return (
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
							to='/admin/products/new'
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
						<Link
							onClick={closeMenu}
							to='/products'
							style={{
								color: '#000000',
								textDecoration: 'none',
							}}
						>
							<MenuItem onClick={closeMenu}>Products</MenuItem>
						</Link>
						<Link
							onClick={closeMenu}
							to='/about'
							style={{
								color: '#000000',
								textDecoration: 'none',
							}}
						>
							<MenuItem onClick={closeMenu}>About</MenuItem>
						</Link>
						<Link
							onClick={closeMenu}
							to='/contact'
							style={{
								color: '#000000',
								textDecoration: 'none',
							}}
						>
							<MenuItem onClick={closeMenu}>Contact</MenuItem>
						</Link>
					</Menu>
				</Hidden>
			</Toolbar>
		</AppBar>
	);
}

export default AdminNavbar;
