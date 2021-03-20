import { Box, Button, IconButton, Typography } from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { PropTypes } from 'prop-types';
import React from 'react';

import { HOME } from '../../routes';
import CustomLink from '../../utils/CustomLink';
import languages from '../../utils/languages';

// configure default props
HomeMenu.defaultProps = {
	isBurger: false
};

// configure the prop types validation
HomeMenu.propTypes = {
	showTextBreakpoint: PropTypes.bool.isRequired,
	isBurger: PropTypes.bool.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function HomeMenu({
	showTextBreakpoint,
	isBurger,
	language: { systemLanguageCode }
}) {
	return (
		<Box width={isBurger ? '100%' : null}>
			<CustomLink to={HOME}>
				{isBurger ? (
					<Button startIcon={<Home />} fullWidth>
						<Typography component="div" color="textPrimary">
							<Box fontSize="5vh">
								{languages[systemLanguageCode].pages.home}
							</Box>
						</Typography>
					</Button>
				) : showTextBreakpoint ? (
					<Button variant="text" color="default" startIcon={<Home />}>
						{languages[systemLanguageCode].pages.home}
					</Button>
				) : (
					<IconButton>
						<Home />
					</IconButton>
				)}
			</CustomLink>
		</Box>
	);
}

export default HomeMenu;
