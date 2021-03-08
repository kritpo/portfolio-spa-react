import React from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/styles';

import { Box, MenuList } from '@material-ui/core';

import BurgerMenu from '../../utils/BurgerMenu';
import NavHashItem from './NavHashItem';

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
 * @returns the components array
 */
const links = children =>
	children.map(({ title, link, isHash = false }, index) =>
		isHash ? (
			<NavHashItem to={link} key={index}>
				{title}
			</NavHashItem>
		) : null
	);

// configure the prop types validation
NavBurger.propTypes = {
	children: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			link: PropTypes.string.isRequired,
			isHash: PropTypes.bool
		})
	).isRequired,
	darkModeMenu: PropTypes.element.isRequired,
	top: PropTypes.element,
	bottom: PropTypes.element
};

function NavBurger({ children, darkModeMenu, top, bottom }) {
	return (
		<BurgerMenu top="1em" right="1em">
			<Box display="flex" flexDirection="column" alignItems="center">
				{top}
				<MenuList>{links(children)}</MenuList>
				{bottom}
				{darkModeMenu}
			</Box>
		</BurgerMenu>
	);
}

export default withStyles(styles)(NavBurger);
