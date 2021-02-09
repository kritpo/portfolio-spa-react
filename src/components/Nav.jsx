import React from 'react';

import { Box, MenuList } from '@material-ui/core';

import BurgerMenu from '../tools/BurgerMenu';
import NavHashItem from './Nav/NavHashItem';

function Nav() {
	return (
		<Box component="nav">
			<BurgerMenu top="1em" right="1em">
				<MenuList>
					<NavHashItem to="/#details">Présentation</NavHashItem>
					<NavHashItem to="/#career">Parcours</NavHashItem>
					<NavHashItem to="/#skills">Compétences</NavHashItem>
					<NavHashItem to="/#references">Recommandations</NavHashItem>
				</MenuList>
			</BurgerMenu>
		</Box>
	);
}

export default Nav;
