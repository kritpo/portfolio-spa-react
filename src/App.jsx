import { PropTypes } from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import {
	amber,
	blue,
	deepPurple,
	green,
	orange,
	red
} from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Route from './Route';
import {
	autoLogin,
	checkWebpSupport,
	setLanguage,
	setThemeMode
} from './actions';
import CookieCheckerContainer from './containers/CookieCheckerContainer';
import FooterContainer from './containers/FooterContainer';
import NavContainer from './containers/NavContainer';

// configure the states to pass as props to the component
const mapStateToProps = ({ darkMode }, ...props) => ({
	darkMode,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	checkWebpSupport,
	setThemeMode,
	autoLogin,
	setLanguage
};

// configure the prop types validation
App.propTypes = {
	darkMode: PropTypes.bool.isRequired,
	checkWebpSupport: PropTypes.func.isRequired,
	setThemeMode: PropTypes.func.isRequired,
	autoLogin: PropTypes.func.isRequired,
	setLanguage: PropTypes.func.isRequired
};

function App({
	darkMode,
	checkWebpSupport,
	setThemeMode,
	autoLogin,
	setLanguage
}) {
	// setup the cookies hook
	const [cookies] = useCookies(['darkMode', 'languageCode']);

	// setup the dark mode status hook
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	// check the webp image support and try to auto login the user
	useEffect(() => {
		checkWebpSupport();
		autoLogin();
	}, [autoLogin, checkWebpSupport]);

	// save the user theme
	useEffect(() => {
		// check if the cookie if not defined
		if (cookies.darkMode === undefined) {
			setThemeMode(prefersDarkMode);
		} else {
			setThemeMode(cookies.darkMode === 'true');
		}
	}, [cookies.darkMode, prefersDarkMode, setThemeMode]);

	// save the user language
	useEffect(() => {
		// check if the cookie if not defined
		if (cookies.languageCode === undefined) {
			setLanguage(
				(
					(navigator.languages && navigator.languages[0]) ||
					navigator.language ||
					navigator.userLanguage
				).substr(0, 2)
			);
		} else {
			setLanguage(cookies.languageCode);
		}
	}, [cookies.languageCode, setLanguage]);

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
			<CookieCheckerContainer />
			<BrowserRouter>
				<NavContainer />
				<Route />
				<FooterContainer />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
