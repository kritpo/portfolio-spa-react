import { matchPath } from 'react-router-dom';

import impLoader from './utils/impLoader';

// load all components
const PortfolioContainer = impLoader(() =>
	import('./containers/PortfolioContainer')
);
const Terms = impLoader(() => import('./components/Terms'));
const SignUp = impLoader(() => import('./containers/SignUpContainer'));
const SignUpConfirm = impLoader(() =>
	import('./containers/SignUpConfirmContainer')
);

// setup route constants
export const HOME = '/';
export const TERMS = '/mentions';
export const SIGN_UP = '/inscription';
export const SIGN_UP_CONFIRM = '/inscription/confirmation';

// store all details about routes
const routes = [
	{ path: HOME, exact: true, component: PortfolioContainer },
	{ path: TERMS, exact: true, component: Terms },
	{ path: SIGN_UP, exact: true, component: SignUp },
	{ path: SIGN_UP_CONFIRM, exact: true, component: SignUpConfirm }
];

/**
 * setup the component preloader
 * @param {string} currentPath the path of the component to preload
 */
export const routePreloadComponent = currentPath => {
	// filter the path to remove hashes and queries
	if (currentPath.includes('#') || currentPath.includes('?')) {
		currentPath = currentPath.split('#')[0].split('?')[0];
	}

	// find the associated route
	const route = routes.find(({ path, exact }) =>
		matchPath(currentPath, { path, exact })
	);

	// check if the route is founded
	if (route !== undefined) {
		// preload the component
		route.component.preload();
	}
};

export default routes;
