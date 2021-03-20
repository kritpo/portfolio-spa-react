import { Box, Button, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { PropTypes } from 'prop-types';
import React from 'react';

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
 * @param {object} active the active class
 * @returns the components array
 */
const links = (children, active) =>
	children.map(({ title, link, isHash = false }) => (
		<CustomLink
			to={link}
			nav
			hash={isHash}
			activeClassName={active}
			smooth={isHash}
			key={link}
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
			primary: PropTypes.shape({
				light: PropTypes.string.isRequired,
				main: PropTypes.string.isRequired,
				dark: PropTypes.string.isRequired
			}).isRequired,
			type: PropTypes.string.isRequired
		}).isRequired
	}).isRequired,
	darkModeMenu: PropTypes.element.isRequired,
	left: PropTypes.element,
	right: PropTypes.element
};

function NavBar({
	classes: { active },
	children,
	theme: {
		palette: { primary, type }
	},
	darkModeMenu,
	left,
	right
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
				{left}
				<Grid container spacing={2} justify="center">
					{links(children, active)}
				</Grid>
				{right}
				{darkModeMenu}
			</Paper>
		</Box>
	);
}

export default withStyles(styles)(NavBar);
