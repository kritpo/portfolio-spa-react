import React, { useEffect, useMemo } from 'react';
import { PropTypes } from 'prop-types';

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

import { checkWebpSupport, setThemeMode, autoLogin } from './actions';

import { BrowserRouter } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import NavContainer from './containers/NavContainer';
import Footer from './components/Footer';

import Route from './Route';

// configure the states to pass as props to the component
const mapStateToProps = ({ darkMode }, ...props) => ({
	darkMode,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	checkWebpSupport,
	setThemeMode,
	autoLogin
};

// configure the prop types validation
App.propTypes = {
	darkMode: PropTypes.bool.isRequired,
	checkWebpSupport: PropTypes.func.isRequired,
	setThemeMode: PropTypes.func.isRequired,
	autoLogin: PropTypes.func.isRequired
};

function App({ darkMode, checkWebpSupport, setThemeMode, autoLogin }) {
	// setup the dark mode status hook
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	// check the webp image support
	useEffect(() => {
		checkWebpSupport();
	}, [checkWebpSupport]);

	// save the user theme
	useEffect(() => {
		setThemeMode(prefersDarkMode);
	}, [prefersDarkMode, setThemeMode]);

	// try to auto login the user
	useEffect(() => {
		autoLogin();
	}, [autoLogin]);

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
				<Route />
				<Footer />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
