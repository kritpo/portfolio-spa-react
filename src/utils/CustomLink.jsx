import { Link } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import React, { useCallback } from 'react';
import { NavLink as NavRouterLink, Link as RouterLink } from 'react-router-dom';
import { HashLink, NavHashLink } from 'react-router-hash-link';

import routes from '../routes';
import impPreloader from './impPreloader';

// configure default props
CustomLink.defaultProps = {
	nav: false,
	hash: false
};

// configure the prop types validation
CustomLink.propTypes = {
	to: PropTypes.string.isRequired,
	nav: PropTypes.bool.isRequired,
	hash: PropTypes.bool.isRequired
};

function CustomLink({ children, to, nav, hash, ...props }) {
	// setup the route component preloader
	const preloadRoutedComponent = useCallback(() => impPreloader(to, routes), [
		to
	]);

	return (
		<Link
			component={
				hash
					? nav
						? NavHashLink
						: HashLink
					: nav
					? NavRouterLink
					: RouterLink
			}
			to={to}
			onMouseEnter={preloadRoutedComponent}
			{...props}
		>
			{children}
		</Link>
	);
}

export default CustomLink;
