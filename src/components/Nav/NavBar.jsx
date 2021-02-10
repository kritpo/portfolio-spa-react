import React from 'react';
import { PropTypes } from 'prop-types';

import { useTheme, withStyles } from '@material-ui/styles';

import { NavLink as RouterLink } from 'react-router-dom';
import { NavHashLink as HashLink } from 'react-router-hash-link';

import { Grid, Paper, Box, Button, Link } from '@material-ui/core';

// define the style of the component
const styles = theme => ({
	active: {
		backgroundColor: theme.palette.divider
	}
});

// configure the prop types validation
NavBar.propTypes = {
	children: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			link: PropTypes.string.isRequired,
			isHash: PropTypes.bool
		})
	).isRequired,
	darkModeMenu: PropTypes.element.isRequired
};

function NavBar({ classes, children, darkModeMenu }) {
	// retrieve the current theme
	const theme = useTheme();

	// convert links details to React component
	const links = children.map(({ title, link, isHash = false }, index) => (
		<Link
			component={isHash ? HashLink : RouterLink}
			to={link}
			activeClassName={classes.active}
			key={index}
			smooth={isHash}
		>
			<Button>{title}</Button>
		</Link>
	));

	return (
		<Box
			zIndex="appBar"
			position="fixed"
			display="flex"
			alignItems="center"
			width="100%"
			height="4em"
			clone
		>
			<Paper
				square
				style={{
					backgroundColor: theme.palette.primary[theme.palette.type]
				}}
			>
				<Grid container spacing={2} justify="center">
					{links}
				</Grid>
				{darkModeMenu}
			</Paper>
		</Box>
	);
}

export default withStyles(styles)(NavBar);
