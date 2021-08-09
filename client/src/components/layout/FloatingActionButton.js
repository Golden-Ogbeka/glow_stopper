import { Badge, Fab, Hidden } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../utils/AppContext';

export default function FloatingActionButton() {
	const [userType, setUserType] = React.useState('');
	const { contextVariables } = React.useContext(AppContext);

	React.useEffect(() => {
		if (window.location.href.indexOf('admin') > -1) {
			//To determine what would show for admin and customers
			setUserType('admin');
		} else {
			setUserType('customer');
		}
	}, []);
	return (
		<>
			{userType === 'customer' && (
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
							<Badge
								badgeContent={
									contextVariables.cartItems.length > 0
										? contextVariables.cartItems.length
										: '0'
								}
								color='secondary'
							>
								<ShoppingCartOutlined fontSize='large' />
							</Badge>
						</Fab>
					</Link>
				</Hidden>
			)}
		</>
	);
}
