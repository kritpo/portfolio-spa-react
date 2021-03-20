import { Box, Button, Paper, Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import React from 'react';

import { TERMS } from '../routes';
import CustomLink from '../utils/CustomLink';
import CustomIcon from '../utils/icons/CustomIcon';
import languages from '../utils/languages';

// configure the prop types validation
Footer.propTypes = {
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function Footer({ language: { systemLanguageCode } }) {
	return (
		<Box component="footer">
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
						<Button
							href="https://github.com/kritpo"
							target="_blank"
						>
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
						&copy; {languages[systemLanguageCode].footer.credits} -{' '}
						<CustomLink to={TERMS}>
							{languages[systemLanguageCode].pages.terms}
						</CustomLink>
					</Typography>
				</Box>
			</Paper>
		</Box>
	);
}

export default Footer;
