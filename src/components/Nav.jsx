import React from 'react';
import { PropTypes } from 'prop-types';

import { Box } from '@material-ui/core';

import NavBarContainer from '../containers/Nav/NavBarContainer';
import NavBurger from './Nav/NavBurger';
import HomeMenu from './Nav/HomeMenu';
import UserMenuContainer from '../containers/Nav/UserMenuContainer';
import PreferenceContainerMenu from '../containers/Nav/PreferenceMenuContainer';

// configure the prop types validation
Nav.propTypes = {
	links: PropTypes.array.isRequired,
	showBar: PropTypes.bool.isRequired,
	isHome: PropTypes.bool.isRequired,
	showTextBreakpoint: PropTypes.bool.isRequired
};

function Nav({ links, showBar, isHome, showTextBreakpoint }) {
	return (
		<Box component="nav">
			{showBar ? (
				<NavBarContainer
					darkModeMenu={<PreferenceContainerMenu />}
					left={
						!isHome ? (
							<HomeMenu showTextBreakpoint={showTextBreakpoint} />
						) : null
					}
					right={
						<UserMenuContainer
							showTextBreakpoint={showTextBreakpoint}
						/>
					}
				>
					{links}
				</NavBarContainer>
			) : (
				<NavBurger
					darkModeMenu={<PreferenceContainerMenu />}
					top={
						!isHome ? (
							<HomeMenu
								showTextBreakpoint={showTextBreakpoint}
								isBurger={true}
							/>
						) : null
					}
					bottom={
						<UserMenuContainer
							showTextBreakpoint={showTextBreakpoint}
							isBurger={true}
						/>
					}
				>
					{links}
				</NavBurger>
			)}
		</Box>
	);
}

export default Nav;
