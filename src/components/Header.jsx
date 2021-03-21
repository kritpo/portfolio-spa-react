import { PropTypes } from 'prop-types';
import React from 'react';

import { Box, Breadcrumbs, Paper, Typography } from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';

import CustomLink from '../utils/CustomLink';

/**
 * convert history details to React component
 * @param {array} history the list of history data
 * @returns the components array
 */
const breadcrumb = history =>
	history.map(({ link, title }, index) => (
		<CustomLink to={link} color="inherit" key={index}>
			{title}
		</CustomLink>
	));

// configure the prop types validation
Header.propTypes = {
	title: PropTypes.string.isRequired,
	history: PropTypes.arrayOf(
		PropTypes.shape({
			link: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		})
	).isRequired
};

function Header({ title, history }) {
	return (
		<Box component="header">
			<Paper square>
				<Box
					component="header"
					display="flex"
					flexDirection="column"
					justifyContent="center"
					mb={2}
					pt={8}
					pb={2}
					width="100%"
				>
					<Box ml={4} mb={2}>
						<Typography component="h1" variant="h3">
							{title}
						</Typography>
					</Box>
					<Box ml={8}>
						<Breadcrumbs
							component="div"
							separator={<NavigateNext fontSize="small" />}
							aria-label="breadcrumb"
						>
							{breadcrumb(history)}
							<Typography color="textPrimary">{title}</Typography>
						</Breadcrumbs>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
}

export default Header;
