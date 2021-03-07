import React from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/styles';

import { Grid, Paper, Box, Button } from '@material-ui/core';

import CustomLink from '../../utils/CustomLink';

/**
 * define the style of the component
 * @param {object} theme the current applied theme
 * @returns the style object
 */
const styles = ({ palette: { divider } }) => ({
	active: {
		backgroundColor: divider
	}
});

/**
 * convert links details to React component
 * @param {array} children the list of links data
 * @param {object} active the active classe
 * @returns the components array
 */
const links = (children, active) =>
	children.map(({ title, link, isHash = false }, index) => (
		<CustomLink
			to={link}
			nav
			hash={isHash}
			activeClassName={active}
			smooth={isHash}
			key={index}
		>
			<Button>{title}</Button>
		</CustomLink>
	));

// configure the prop types validation
NavBar.propTypes = {
	children: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			link: PropTypes.string.isRequired,
			isHash: PropTypes.bool
		})
	).isRequired,
	theme: PropTypes.shape({
		palette: PropTypes.shape({
			type: PropTypes.string.isRequired,
			primary: PropTypes.shape({
				light: PropTypes.string.isRequired,
				main: PropTypes.string.isRequired,
				dark: PropTypes.string.isRequired
			}).isRequired
		}).isRequired
	}).isRequired,
	darkModeMenu: PropTypes.element.isRequired
};

function NavBar({
	classes: { active },
	children,
	theme: {
		palette: { primary, type }
	},
	darkModeMenu
}) {
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
					backgroundColor: primary[type]
				}}
			>
				<Grid container spacing={2} justify="center">
					{links(children, active)}
				</Grid>
				{darkModeMenu}
			</Paper>
		</Box>
	);
}

export default withStyles(styles)(NavBar);
