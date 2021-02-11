import React from 'react';

import * as routes from '../routes';

import { Paper, Box, Typography, Button } from '@material-ui/core';

import CustomIcon from '../tools/icons/CustomIcon';
import CustomLink from '../tools/CustomLink';

function Footer() {
	return (
		<Paper square>
			<Box
				component="footer"
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				mt={2}
				pt={2}
				pb={1}
				width="100%"
			>
				<Box mb={2}>
					<Button
						href="https://www.linkedin.com/in/jimmy-weng/"
						target="_blank"
					>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
						>
							<CustomIcon social="LinkedIn" />
							<Typography
								variant="body1"
								style={{ textTransform: 'none' }}
								noWrap
							>
								jimmy-weng
							</Typography>
						</Box>
					</Button>
					<Button href="https://github.com/kritpo" target="_blank">
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
						>
							<CustomIcon social="GitHub" />
							<Typography
								variant="body1"
								style={{ textTransform: 'none' }}
								noWrap
							>
								kritpo
							</Typography>
						</Box>
					</Button>
				</Box>
				<Typography variant="body2">
					&copy; Réalisé par Jimmy Weng -{' '}
					<CustomLink to={routes.TERMS}>Mentions légales</CustomLink>
				</Typography>
			</Box>
		</Paper>
	);
}

export default Footer;
