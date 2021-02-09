import React, { useMemo } from 'react';

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

import store from './store';

import { Provider } from 'react-redux';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import PortfolioContainer from './containers/PortfolioContainer';
import Terms from './components/Terms';
import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
	// setup the dark mode status hook
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	// setup the app theme
	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? 'dark' : 'light',
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
		[prefersDarkMode]
	);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<Nav />

					<Switch>
						<Route path="/terms">
							<Terms />
						</Route>
						<Route path="/">
							<PortfolioContainer />
						</Route>
					</Switch>

					<Footer />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
