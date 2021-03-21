import { PropTypes } from 'prop-types';
import React from 'react';

import { Box } from '@material-ui/core';

import HomeMenuContainer from '../containers/Nav/HomeMenuContainer';
import NavBarContainer from '../containers/Nav/NavBarContainer';
import PreferenceContainerMenu from '../containers/Nav/PreferenceMenuContainer';
import UserMenuContainer from '../containers/Nav/UserMenuContainer';
import NavBurger from './Nav/NavBurger';

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
