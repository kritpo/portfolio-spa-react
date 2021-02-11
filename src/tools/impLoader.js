import { lazy } from 'react';

/**
 * setup the component loader
 * @param {function} imp the import statement
 */
const impLoader = imp => {
	// setup the dynamic import
	const Component = lazy(imp);

	// put the import statement into the preload stack
	Component.preload = imp;

	return Component;
};

export default impLoader;
