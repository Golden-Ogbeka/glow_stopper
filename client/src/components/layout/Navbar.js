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

import {
	MoreVert,
	ShoppingCartOutlined,
	Menu as MenuIcon,
} from '@material-ui/icons';

function Navbar() {
	const [menuAnchor, setmenuAnchor] = React.useState(null);

	const openMenu = (event) => {
		setmenuAnchor(event.currentTarget);
	};

	const closeMenu = () => {
		setmenuAnchor(null);
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
					}}
					color='inherit'
					aria-label='menu'
				>
					<MenuIcon />
				</IconButton>
				<Link
					to='/'
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
				<Hidden smDown>
					<Box>
						<IconButton
							style={{
								marginInline: 20,
							}}
							color='inherit'
							aria-label='menu'
						>
							<ShoppingCartOutlined htmlColor='#FFD700' />
						</IconButton>
						<Link
							to='/products'
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
								Products
							</Button>
						</Link>
						<Link
							to='/about'
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
								About
							</Button>
						</Link>
						<Link
							to='/contact'
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
								Contact
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

export default Navbar;
