import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/styles';

import { Box, Slide, IconButton } from '@material-ui/core';

import CssNoScroll from './css/CssNoScroll';

// define the style of the component
const styles = theme => ({
	root: {
		// when the menu is open
		'&.open': {
			// update the duplicate to show animation
			'& $button:before': {
				backgroundColor:
					theme.palette.type === 'dark'
						? theme.palette.primary.dark
						: theme.palette.primary.light,
				height: 'calc(4*max(100vw, 100vh))',
				left: 'calc(-2*max(100vw, 100vh))',
				top: 'calc(-2*max(100vw, 100vh))',
				width: 'calc(4*max(100vw, 100vh))'
			},

			// transform the burger icon to cross icon
			'& $icon': {
				width: '0px',

				'&:before': {
					transform: 'translateY(9px) rotate(135deg)'
				},

				'&:after': {
					transform: 'translateY(-9px) rotate(225deg)'
				}
			}
		}
	},
	button: {
		// duplicate the button to apply a design
		'&:before': {
			backgroundColor: theme.palette.primary.main,
			borderRadius: '50%',
			content: '""',
			height: '59px',
			left: '0px',
			position: 'absolute',
			top: '0px',
			transitionDuration: '0.75s',
			transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
			width: '59px'
		}
	},
	icon: {
		left: '16.5px',
		top: '27.5px',

		// three bars of the burger icon
		'&, &:before, &:after': {
			backgroundColor: theme.palette.text.primary,
			height: '4px',
			position: 'absolute',
			transitionDuration: '0.45s',
			transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
			width: '26px'
		},

		'&:before, &:after': {
			content: '""',
			left: '0px'
		},

		'&:before': {
			top: '-9px'
		},

		'&:after': {
			top: '9px'
		}
	},
	cursorPointer: {
		cursor: 'pointer'
	}
});

/**
 * check if at most one of string x-axis props was specified
 * @param {[object]} props list of props
 * @param {string} propName name of the checked prop
 * @param {string} componentName name of the component
 */
const customXAxisValidator = (props, propName, componentName) => {
	// check if at most one props was specified fox x-axis
	if (
		props.left !== '0px' &&
		props.left !== undefined &&
		props.right !== undefined
	) {
		return new Error(
			`Both props \`left\` and \`right\` were specified in \`${componentName}\`.`
		);
	}
};

/**
 * check if at most one of string y-axis props was specified
 * @param {[object]} props list of props
 * @param {string} propName name of the checked prop
 * @param {string} componentName name of the component
 */
const customYAxisValidator = (props, propName, componentName) => {
	// check if at most one props was specified for y-axis
	if (
		props.top !== '0px' &&
		props.top !== undefined &&
		props.bottom !== undefined
	) {
		return new Error(
			`Both props \`top\` and \`bottom\` were specified in \`${componentName}\`.`
		);
	}
};

// configure default props
BurgerMenu.defaultProps = {
	top: '0px',
	left: '0px'
};

// configure the prop types validation
BurgerMenu.propTypes = {
	top: PropTypes.string,
	bottom: PropTypes.string,
	left: PropTypes.string,
	right: PropTypes.string,
	customXAxisValidator,
	customYAxisValidator
};

function BurgerMenu({ children, classes, top, bottom, left, right }) {
	// setup the menu state hook
	const [isOpen, setIsOpen] = useState(false);

	// setup the open menu handler
	const openMenu = () => setIsOpen(true);

	// setup the clone menu handler
	const closeMenu = () => setIsOpen(false);

	return (
		<Box className={`${classes.root} ${isOpen ? 'open' : ''}`}>
			<CssNoScroll scroll={!isOpen} />
			<Box
				zIndex="appBar"
				position="fixed"
				top={bottom === undefined ? top : ''}
				bottom={bottom ?? ''}
				left={right === undefined ? left : ''}
				right={right ?? ''}
				className={classes.button}
				clone
			>
				<IconButton onClick={openMenu} style={{ position: 'fixed' }}>
					<Box width="35px" height="35px">
						<Box className={classes.icon} />
					</Box>
				</IconButton>
			</Box>
			<Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
				<Box
					zIndex="modal"
					position="fixed"
					top="0px"
					left="0px"
					display="flex"
					justifyContent="center"
					alignItems="center"
					width="100%"
					height="100%"
					className={classes.cursorPointer}
					onClick={closeMenu}
				>
					{children}
				</Box>
			</Slide>
		</Box>
	);
}

export default withStyles(styles)(BurgerMenu);
