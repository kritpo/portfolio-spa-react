import React from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/styles';

import { MenuItem } from '@material-ui/core';

import CustomLink from '../../utils/CustomLink';

/**
 * define the style of the component
 * @param {object} theme the current applied theme
 * @returns the style object
 */
const styles = ({
	palette: {
		text: { primary },
		divider
	}
}) => ({
	root: {
		fontSize: '5vh',
		padding: '0px 0px'
	},
	link: {
		color: primary,
		height: '100%',
		padding: '6px 16px',
		textDecoration: 'none',
		width: '100%',

		'&:hover': {
			textDecoration: 'none'
		}
	},
	active: {
		backgroundColor: divider
	}
});

// configure the prop types validation
NavHashItem.propTypes = {
	children: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired
};

function NavHashItem({ classes: { root, link, active }, children, to }) {
	return (
		<MenuItem className={root}>
			<CustomLink
				to={to}
				nav
				hash
				className={link}
				activeClassName={active}
				smooth
			>
				{children}
			</CustomLink>
		</MenuItem>
	);
}

export default withStyles(styles)(NavHashItem);
