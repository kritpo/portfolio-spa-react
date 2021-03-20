import React from 'react';
import { PropTypes } from 'prop-types';

import { Box } from '@material-ui/core';

import NavBarContainer from '../containers/Nav/NavBarContainer';
import NavBurger from './Nav/NavBurger';
import HomeMenuContainer from '../containers/Nav/HomeMenuContainer';
import UserMenuContainer from '../containers/Nav/UserMenuContainer';
import PreferenceContainerMenu from '../containers/Nav/PreferenceMenuContainer';

// configure the prop types validation
Nav.propTypes = {
	links: PropTypes.array.isRequired,
	showBar: PropTypes.bool.isRequired,
	isHome: PropTypes.bool.isRequired,
	isCV: PropTypes.bool.isRequired,
	showTextBreakpoint: PropTypes.bool.isRequired
};

function Nav({ links, showBar, isHome, isCV, showTextBreakpoint }) {
	return (
		<Box component="nav">
			{showBar ? (
				<NavBarContainer
					darkModeMenu={
						<PreferenceContainerMenu isHome={isHome} isCV={isCV} />
					}
					left={
						!isHome ? (
							<HomeMenuContainer
								showTextBreakpoint={showTextBreakpoint}
							/>
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
					darkModeMenu={
						<PreferenceContainerMenu isHome={isHome} isCV={isCV} />
					}
					top={
						!isHome ? (
							<HomeMenuContainer
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
