import { Box } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import React, { lazy, Suspense, useMemo } from 'react';

import Loading from '../Loading';
import careerIcons from './career';
import hobbyIcons from './hobby';
import socialIcons from './social';
import technologyIcons from './technology';

/**
 * retrieve the icon or return the keyword
 * @param {string} social the social keyword
 * @param {string} career the career keyword
 * @param {string} technology the technology keyword
 * @param {string} hobby the hobby keyword
 * @returns the icon or the keyword
 */
const retrieveIcon = (social, career, technology, hobby) => {
	// check if no props is defined
	if (
		social === undefined &&
		career === undefined &&
		technology === undefined &&
		hobby === undefined
	) {
		// stop the function, it would be interpreted as nothing in React
		return null;
	}

	// find the icon corresponding to the keyword
	const icon =
		social !== undefined
			? socialIcons[social]
			: career !== undefined
			? careerIcons[career]
			: technology !== undefined
			? technologyIcons[technology]
			: hobbyIcons[hobby];

	// check if an icon is found
	if (icon !== undefined) {
		// return the icon component export object
		return lazy(icon.loadIcon);
	} else {
		// otherwise return the input keyword
		return social || career || technology || hobby;
	}
};

/**
 * check if one and only one of string keyword props was specified
 * @param {[object]} props list of props
 * @param {string} propName name of the checked prop
 * @param {string} componentName name of the component
 */
const customValidator = (
	{ social, career, technology, hobby },
	propName,
	componentName
) => {
	// check if at least one props was specified
	if (
		social === undefined &&
		career === undefined &&
		technology === undefined &&
		hobby === undefined
	) {
		return new Error(
			`One of props \`social\` or \`career\` or \`technology\` or \`hobby\` was not specified in \`${componentName}\`.`
		);
	}

	// check if at most one props was specified
	if (
		(social !== undefined &&
			(career !== undefined ||
				technology !== undefined ||
				hobby !== undefined)) ||
		(career !== undefined &&
			(technology !== undefined || hobby !== undefined)) ||
		(technology !== undefined && hobby !== undefined)
	) {
		return new Error(
			`More than one of props \`social\` or \`career\` or \`technology\` or \`hobby\` was specified in \`${componentName}\`.`
		);
	}
};

// configure the prop types validation
CustomIcon.propTypes = {
	social: PropTypes.string,
	career: PropTypes.string,
	technology: PropTypes.string,
	hobby: PropTypes.string,
	customValidator
};

function CustomIcon({ social, career, technology, hobby }) {
	// retrieve the icon
	const Icon = useMemo(
		() => retrieveIcon(social, career, technology, hobby),
		[career, hobby, social, technology]
	);

	return (
		<Suspense
			fallback={
				<Box>
					<Loading size="1em" />
				</Box>
			}
		>
			{typeof Icon === 'string' || Icon === null ? Icon : <Icon />}
		</Suspense>
	);
}

export default CustomIcon;
