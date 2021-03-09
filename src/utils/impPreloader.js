import { matchPath } from 'react-router-dom';

/**
 * setup the component preloader
 * @param {string} currentPath the path of the component to preload
 * @param {array} routes the list of routes
 */
const impPreloader = (currentPath, routes) => {
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

export default impPreloader;
