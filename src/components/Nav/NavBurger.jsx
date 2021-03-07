import React from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/styles';

import { MenuList } from '@material-ui/core';

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
	darkModeMenu: PropTypes.element.isRequired
};

function NavBurger({ children, darkModeMenu }) {
	return (
		<BurgerMenu top="1em" right="1em">
			<MenuList>
				{links(children)}
				{darkModeMenu}
			</MenuList>
		</BurgerMenu>
	);
}

export default withStyles(styles)(NavBurger);
