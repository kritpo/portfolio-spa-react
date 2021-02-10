import React from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/styles';

import { MenuItem } from '@material-ui/core';

import { NavHashLink } from 'react-router-hash-link';

// define the style of the component
const styles = theme => ({
	root: {
		fontSize:'5vh',
		padding: '0px 0px'
	},
	link: {
		color: theme.palette.text.primary,
		height: '100%',
		padding: '6px 16px',
		textDecoration: 'none',
		width: '100%'
	},
	active: {
		backgroundColor: theme.palette.divider
	}
});

// configure the prop types validation
NavHashItem.propTypes = {
	to: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired
};

function NavHashItem({ classes, to, children }) {
	return (
		<MenuItem className={classes.root}>
			<NavHashLink
				to={`${to}`}
				className={classes.link}
				activeClassName={classes.active}
				smooth
			>
				{children}
			</NavHashLink>
		</MenuItem>
	);
}

export default withStyles(styles)(NavHashItem);
