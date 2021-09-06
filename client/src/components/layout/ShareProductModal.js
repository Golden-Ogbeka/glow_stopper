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
					<WhatsappShareButton url={'https://www.glowstopper.com' + props.url}>
						<WhatsappIcon />
					</WhatsappShareButton>
					<FacebookShareButton url={'https://www.glowstopper.com' + props.url}>
						<FacebookIcon />
					</FacebookShareButton>
					<TwitterShareButton url={'https://www.glowstopper.com' + props.url}>
						<TwitterIcon />
					</TwitterShareButton>
					<LinkedinShareButton url={'https://www.glowstopper.com' + props.url}>
						<LinkedinIcon />
					</LinkedinShareButton>
					<TelegramShareButton url={'https://www.glowstopper.com' + props.url}>
						<TelegramIcon />
					</TelegramShareButton>
					<EmailShareButton url={'https://www.glowstopper.com' + props.url}>
						<EmailIcon />
					</EmailShareButton>
					<PinterestShareButton url={'https://www.glowstopper.com' + props.url}>
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
