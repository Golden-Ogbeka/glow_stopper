import { Box } from '@material-ui/core';
import React from 'react';
import AdminNavbar from '../../../layout/Admin/AdminNavbar';

function AdminEditProductCategory() {
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
						height: 368,
						backgroundColor: '#000000',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<span
						style={{
							fontFamily: 'Elsie',
							fontWeight: 'normal',
							fontSize: '10vh',
							color: '#FFD700',
							textTransform: 'capitalize',
						}}
					>
						{/* {category.toLowerCase()} */}
					</span>

					<span
						style={{
							fontFamily: 'Calibri',
							fontWeight: 'lighter',
							fontSize: 48,
							color: '#FFFFFF',
						}}
					>
						category
					</span>
				</Box>
			</div>
		</>
	);
}

export default AdminEditProductCategory;
