import { useTheme } from '@material-ui/styles';
import React from 'react';

import NavBar from '../../components/Nav/NavBar';

function NavBarContainer({ ...props }) {
	// retrieve the current theme
	const theme = useTheme();

	return <NavBar theme={theme} {...props} />;
}

export default NavBarContainer;
