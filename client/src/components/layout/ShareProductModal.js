import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';
import React from 'react';
import {
	WhatsappShareButton,
	WhatsappIcon,
	FacebookShareButton,
	FacebookIcon,
	TwitterShareButton,
	TwitterIcon,
	LinkedinIcon,
	LinkedinShareButton,
	TelegramIcon,
	TelegramShareButton,
	PinterestIcon,
	PinterestShareButton,
	EmailIcon,
	EmailShareButton,
} from 'react-share';

function ShareProductModal(props) {
	const closeShareDialog = () => {
		props.setShareDialogState({
			...props.shareDialogState,
			state: false,
		});
	};
	return (
		<>
			<Dialog open={props.shareDialogState} onClose={closeShareDialog}>
				<DialogTitle>
					<span
						style={{
							fontFamily: 'Calibri',
							fontWeight: 'bold',
						}}
					>
						Share Product
					</span>
				</DialogTitle>
				<DialogContent>
					<WhatsappShareButton url={props.url}>
						<WhatsappIcon />
					</WhatsappShareButton>
					<FacebookShareButton url={props.url}>
						<FacebookIcon />
					</FacebookShareButton>
					<TwitterShareButton url={props.url}>
						<TwitterIcon />
					</TwitterShareButton>
					<LinkedinShareButton url={props.url}>
						<LinkedinIcon />
					</LinkedinShareButton>
					<TelegramShareButton url={props.url}>
						<TelegramIcon />
					</TelegramShareButton>
					<EmailShareButton url={props.url}>
						<EmailIcon />
					</EmailShareButton>
					<PinterestShareButton url={props.url}>
						<PinterestIcon />
					</PinterestShareButton>
				</DialogContent>
				<DialogActions>
					<Button
						style={{
							textTransform: 'none',
							fontFamily: 'Calibri',
						}}
						color='default'
						onClick={closeShareDialog}
						variant='contained'
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default ShareProductModal;
