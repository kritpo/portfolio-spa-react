import React from 'react';
import { PropTypes } from 'prop-types';

import { Link as RouterLink, NavLink as NavRouterLink } from 'react-router-dom';
import { HashLink, NavHashLink } from 'react-router-hash-link';

import { Link } from '@material-ui/core';

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
			{...props}
		>
			{children}
		</Link>
	);
}

export default CustomLink;
