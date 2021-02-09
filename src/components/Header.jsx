import React from 'react';
import { PropTypes } from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';

import { Paper, Box, Typography, Breadcrumbs, Link } from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';

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
	// convert history details to React component
	const breadcrumb = history.map(({ link, title }, index) => (
		<Link component={RouterLink} color="inherit" to={link} key={index}>
			{title}
		</Link>
	));

	return (
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
					<Typography component="h1" variant="h1">
						{title}
					</Typography>
				</Box>
				<Box ml={8}>
					<Breadcrumbs
						component="div"
						separator={<NavigateNext fontSize="small" />}
						aria-label="breadcrumb"
					>
						{breadcrumb}
						<Typography color="textPrimary">{title}</Typography>
					</Breadcrumbs>
				</Box>
			</Box>
		</Paper>
	);
}

export default Header;
