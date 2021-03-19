import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/styles';

import { SIGN_UP, SIGN_IN, CV_LIST } from '../../routes';

import { Box, Button, Typography, IconButton } from '@material-ui/core';
import {
	AccountCircle as User,
	PersonAdd as SignUp,
	ExitToApp as SignOut
} from '@material-ui/icons';

import CustomLink from '../../utils/CustomLink';

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
	},
	fullWidth: {
		width: '100%'
	}
});

// configure default props
UserMenu.defaultProps = {
	isBurger: false
};

// configure the prop types validation
UserMenu.propTypes = {
	username: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired,
	showTextBreakpoint: PropTypes.bool.isRequired,
	isBurger: PropTypes.bool.isRequired
};

function UserMenu({
	classes: { active, circle, fullWidth },
	username,
	logout,
	showTextBreakpoint,
	isBurger
}) {
	return (
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
						activeClassName={`${active} ${
							!(isBurger || showTextBreakpoint) ? circle : ''
						}`}
						className={isBurger ? fullWidth : undefined}
					>
						{isBurger ? (
							<Button startIcon={<User />} fullWidth>
								<Typography component="div" color="textPrimary">
									<Box fontSize="5vh">Connexion</Box>
								</Typography>
							</Button>
						) : showTextBreakpoint ? (
							<Button endIcon={<User />}>Connexion</Button>
						) : (
							<IconButton>
								<User />
							</IconButton>
						)}
					</CustomLink>
					<CustomLink
						to={SIGN_UP}
						nav
						activeClassName={`${active} ${
							!(isBurger || showTextBreakpoint) ? circle : ''
						}`}
						className={isBurger ? fullWidth : undefined}
					>
						{isBurger ? (
							<Button startIcon={<SignUp />} fullWidth>
								<Typography component="div" color="textPrimary">
									<Box fontSize="5vh">Inscription</Box>
								</Typography>
							</Button>
						) : showTextBreakpoint ? (
							<Button endIcon={<SignUp />}>Inscription</Button>
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
						to={CV_LIST}
						nav
						activeClassName={active}
						className={isBurger ? fullWidth : undefined}
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
						<Button
							startIcon={<SignOut />}
							onClick={logout}
							fullWidth
						>
							<Typography component="div" color="textPrimary">
								<Box fontSize="5vh">Déconnexion</Box>
							</Typography>
						</Button>
					) : showTextBreakpoint ? (
						<Button endIcon={<SignOut />} onClick={logout}>
							Déconnexion
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
}

export default withStyles(styles)(UserMenu);
