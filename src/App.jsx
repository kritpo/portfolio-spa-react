import React, { useEffect, useMemo } from 'react';

import { connect } from 'react-redux';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
	amber,
	blue,
	deepPurple,
	green,
	orange,
	red
} from '@material-ui/core/colors';

import { setThemeMode } from './actions';

import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import NavContainer from './containers/NavContainer';
import Footer from './components/Footer';

import Routes from './Routes';

// configure the states to pass as props to the component
const mapStateToProps = (state, ...props) => ({
	darkMode: state.darkMode,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	setThemeMode
};

function App({ darkMode, setThemeMode }) {
	// setup the dark mode status hook
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	// save the user theme
	useEffect(() => {
		setThemeMode(prefersDarkMode);
	}, [prefersDarkMode, setThemeMode]);

	// setup the app theme
	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: darkMode ? 'dark' : 'light',
					primary: {
						main: orange[500]
					},
					secondary: {
						main: deepPurple.A400
					},
					error: {
						main: red[500]
					},
					warning: {
						main: amber[500]
					},
					info: {
						main: blue[500]
					},
					success: {
						main: green[500]
					}
				}
			}),
		[darkMode]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<NavContainer />
				<Routes />
				<Footer />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
