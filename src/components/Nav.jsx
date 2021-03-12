import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/styles';

import { HOME, SIGN_UP, SIGN_IN, USER } from '../routes';

import {
	Box,
	FormControlLabel,
	Switch,
	Button,
	Typography,
	IconButton
} from '@material-ui/core';
import {
	Brightness4 as Dark,
	Brightness7 as Light,
	Home,
	AccountCircle as User,
	PersonAdd as SignUp,
	ExitToApp as SignOut
} from '@material-ui/icons';

import NavBarContainer from '../containers/Nav/NavBarContainer';
import NavBurger from './Nav/NavBurger';
import CustomLink from '../utils/CustomLink';

/**
 * define the style of the component
 * @param {object} theme the current applied theme
 * @returns the style object
 */
const styles = ({ palette: { divider } }) => ({
	active: {
		backgroundColor: divider
	},
	circle: {
		borderRadius: '50%'
	}
});

/**
 * setup the dark mode menu
 * @param {bool} darkMode the status of dark mode
 * @param {function} darkModeToggle the dark mode toggler
 * @returns the component
 */
const darkModeMenu = (darkMode, darkModeToggle) => (
	<Box display="flex">
		<FormControlLabel
			control={<Switch checked={darkMode} onChange={darkModeToggle} />}
			label={darkMode ? <Dark /> : <Light />}
		/>
	</Box>
);

/**
 * setup the home menu
 * @param {bool} isBurger the type of menu
 * @returns the component
 */
const homeMenu = (isBurger = false) => (
	<Box width={isBurger ? '100%' : null}>
		<CustomLink to={HOME}>
			{isBurger ? (
				<Button startIcon={<Home />} fullWidth>
					<Typography component="div" color="textPrimary">
						<Box fontSize="5vh">Accueil</Box>
					</Typography>
				</Button>
			) : (
				<IconButton>
					<Home />
				</IconButton>
			)}
		</CustomLink>
	</Box>
);

/**
 * setup the user menu
 * @param {string} username the username
 * @param {function} logout the logout function
 * @param {object} active the active class
 * @param {object} circle the circle class
 * @param {bool} isBurger the type of menu
 * @returns the component
 */
const userMenu = (username, logout, active, circle, isBurger = false) => (
	<Box
		display="flex"
		flexDirection={isBurger ? 'column' : 'row'}
		alignItems="center"
		mr={!isBurger ? 2 : undefined}
		width={isBurger ? '100%' : undefined}
	>
		{username === '' ? (
			<Fragment>
				<CustomLink
					to={SIGN_IN}
					nav
					activeClassName={`${active} ${!isBurger ? circle : ''}`}
				>
					{isBurger ? (
						<Button startIcon={<User />} fullWidth>
							<Typography component="div" color="textPrimary">
								<Box fontSize="5vh">Connexion</Box>
							</Typography>
						</Button>
					) : (
						<IconButton>
							<User />
						</IconButton>
					)}
				</CustomLink>
				<CustomLink
					to={SIGN_UP}
					nav
					activeClassName={`${active} ${!isBurger ? circle : ''}`}
				>
					{isBurger ? (
						<Button startIcon={<SignUp />} fullWidth>
							<Typography component="div" color="textPrimary">
								<Box fontSize="5vh">Inscription</Box>
							</Typography>
						</Button>
					) : (
						<IconButton>
							<SignUp />
						</IconButton>
					)}
				</CustomLink>
			</Fragment>
		) : (
			<Fragment>
				<CustomLink
					to={USER}
					nav
					activeClassName={active}
				>
					<Button
						startIcon={isBurger ? <User /> : undefined}
						endIcon={!isBurger ? <User /> : undefined}
						fullWidth={isBurger}
					>
						<Typography component="div" color="textPrimary">
							<Box fontSize={isBurger ? '5vh' : undefined}>
								{username}
							</Box>
						</Typography>
					</Button>
				</CustomLink>
				{isBurger ? (
					<Button startIcon={<SignOut />} onClick={logout} fullWidth>
						<Typography component="div" color="textPrimary">
							<Box fontSize="5vh">Déconnexion</Box>
						</Typography>
					</Button>
				) : (
					<IconButton onClick={logout}>
						<SignOut />
					</IconButton>
				)}
			</Fragment>
		)}
	</Box>
);

// configure the prop types validation
Nav.propTypes = {
	links: PropTypes.array.isRequired,
	darkMode: PropTypes.bool.isRequired,
	darkModeToggle: PropTypes.func.isRequired,
	showBar: PropTypes.bool.isRequired,
	isHome: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired
};

function Nav({
	classes: { active, circle },
	links,
	darkMode,
	darkModeToggle,
	showBar,
	isHome,
	username,
	logout
}) {
	return (
		<Box component="nav">
			{showBar ? (
				<NavBarContainer
					darkModeMenu={darkModeMenu(darkMode, darkModeToggle)}
					left={!isHome ? homeMenu() : null}
					right={userMenu(username, logout, active, circle)}
				>
					{links}
				</NavBarContainer>
			) : (
				<NavBurger
					darkModeMenu={darkModeMenu(darkMode, darkModeToggle)}
					top={!isHome ? homeMenu(true) : null}
					bottom={userMenu(username, logout, active, circle, true)}
				>
					{links}
				</NavBurger>
			)}
		</Box>
	);
}

export default withStyles(styles)(Nav);
