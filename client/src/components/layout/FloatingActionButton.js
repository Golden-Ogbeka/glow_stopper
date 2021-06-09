import { Fab, Hidden } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

export default function FloatingActionButton() {
	return (
		<Hidden mdUp>
			<Link to='/cart'>
				<Fab
					style={{
						bottom: 20,
						top: 'auto',
						right: 20,
						left: 'auto',
						position: 'fixed',
						color: '#FFD700',
						backgroundColor: '#000000',
					}}
					aria-controls='touch-menu'
					aria-haspopup='true'
				>
					<ShoppingCartOutlined fontSize='default' />
				</Fab>
			</Link>
		</Hidden>
	);
}
