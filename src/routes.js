import { matchPath } from 'react-router-dom';

import impLoader from './tools/impLoader';

// load all components
const PortfolioContainer = impLoader(() =>
	import('./containers/PortfolioContainer')
);
const Terms = impLoader(() => import('./components/Terms'));
const SignUp = impLoader(() => import('./containers/SignUpContainer'));

// setup route constants
export const HOME = '/';
export const TERMS = '/mentions';
export const SIGN_UP = '/inscription';

// store all details about routes
const routes = [
	{ path: HOME, exact: true, component: PortfolioContainer },
	{ path: TERMS, exact: true, component: Terms },
	{ path: SIGN_UP, exact: true, component: SignUp }
];

/**
 * setup the component preloader
 * @param {string} path the path of the component to preload
 */
export const routePreloadComponent = path => {
	// filter the path to remove hashes and queries
	if (path.includes('#') || path.includes('?')) {
		path = path.split('#')[0].split('?')[0];
	}

	// find the associated route
	const route = routes.find(route =>
		matchPath(path, { path: route.path, exact: route.exact })
	);

	// check if the route is founded
	if (route !== undefined) {
		// preload the component
		route.component.preload();
	}
};

export default routes;
