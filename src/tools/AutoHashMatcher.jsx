import React, { useEffect, useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { useLocation, useHistory } from 'react-router-dom';

import { useInView } from 'react-intersection-observer';

import { Box } from '@material-ui/core';

// configure default props
AutoHashMatcher.defaultProps = {
	hashText: ''
};

// configure the prop types validation
AutoHashMatcher.propTypes = {
	hashText: PropTypes.string.isRequired
};

function AutoHashMatcher({ children, hashText }) {
	// retrieve the location hook
	const location = useLocation();

	// retrieve the history hook
	const history = useHistory();

	// setup the in intersection observer hook
	const { ref: inRef, inView: inInView } = useInView({
		rootMargin: '-11% 0% -89% 0%'
	});

	// setup the out intersection observer hook
	const { ref: outRef, inView: inOutView } = useInView({
		rootMargin: '-12% 0% -88% 0%'
	});

	// setup the hash updater
	useEffect(() => {
		// check if the section intersect the in and not the out
		if (inInView) {
			// push the hash into the history
			history.push(`${location.pathname}#${hashText}`);
		}
		// check if the section intersect the out line
		else if (inOutView) {
			// put the empty url into the history
			history.push(location.pathname);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inInView, inOutView]);

	// setup the final ref
	const finalRef = useCallback(
		node => {
			// link the `in` intersection observer
			inRef(node);

			// link the `out` intersection observer
			outRef(node);
		},
		[inRef, outRef]
	);

	return <Box ref={finalRef}>{children}</Box>;
}

export default AutoHashMatcher;
