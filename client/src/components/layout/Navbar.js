import React from 'react';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Menu, ShoppingCartOutlined } from '@material-ui/icons';

function Navbar() {
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
					<Menu />
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
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
