import { Box } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import CustomerNavbar from '../../layout/CustomerNavbar';

function OrderSuccessful() {
	const { orderReference } = useParams();
	return (
		<>
			<CustomerNavbar />
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
						Order Received
					</span>
				</Box>
				<Box padding='30px' textAlign='center' fontSize='30px'>
					Your order has been received successfully. Our representative would contact
					you shortly.
					<br />
					<br />
					<b>Your order reference: {orderReference}</b>
					<br />
					<br />
					<Link
						to='/'
						style={{
							color: '#836E00',
						}}
					>
						Go to homepage
					</Link>
				</Box>
			</div>
		</>
	);
}

export default OrderSuccessful;
