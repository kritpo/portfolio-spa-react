import React, { lazy, Suspense } from 'react';
import { PropTypes } from 'prop-types';

import icons, { SOCIAL, CAREER, TECHNOLOGY, HOBBY } from './icons';

import { Box } from '@material-ui/core';

import Loading from '../Loading';

/**
 * retrieve the icon or return the keyword
 * @param {object} props input keyword object
 */
const retrieveIcon = (social, career, technology, hobby, notExact = true) => {
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

	// retrieve the subset of icon infos which match the input request
	const filteredIcons =
		social !== undefined
			? icons.filter(iconInfo => iconInfo.type === SOCIAL)
			: career !== undefined
			? icons.filter(iconInfo => iconInfo.type === CAREER)
			: technology !== undefined
			? icons.filter(iconInfo => iconInfo.type === TECHNOLOGY)
			: icons.filter(iconInfo => iconInfo.type === HOBBY);

	// retrieve and convert the keyword in lowercase for normalization
	const keyword = (social || career || technology || hobby).toLowerCase();

	// find the icon corresponding to the keyword
	const icon = filteredIcons.find(currIcon => {
		// find an keyword which match the input keyword
		const finalKeyword = currIcon.keyword.find(key =>
			notExact ? key === keyword : key.includes(keyword)
		);

		// if a keyword is found, then the icon match the input request
		return finalKeyword !== undefined;
	});

	// check if an icon is found
	if (icon !== undefined) {
		// return the icon component export object
		return lazy(icon.loadIcon);
	} else {
		// otherwise return the input keyword
		return keyword;
	}
};

/**
 * check if one and only one of string keyword props was specified
 * @param {[object]} props list of props
 * @param {string} propName name of the checked prop
 * @param {string} componentName name of the component
 */
const customValidator = (props, propName, componentName) => {
	// check if at least one props was specified
	if (
		props.social === undefined &&
		props.career === undefined &&
		props.technology === undefined &&
		props.hobby === undefined
	) {
		return new Error(
			`One of props \`social\` or \`career\` or \`technology\` or \`hobby\` was not specified in \`${componentName}\`.`
		);
	}

	// check if at most one props was specified
	if (
		(props.social !== undefined &&
			(props.career !== undefined ||
				props.technology !== undefined ||
				props.hobby !== undefined)) ||
		(props.career !== undefined &&
			(props.technology !== undefined || props.hobby !== undefined)) ||
		(props.technology !== undefined && props.hobby !== undefined)
	) {
		return new Error(
			`More than one of props \`social\` or \`career\` or \`technology\` or \`hobby\` was specified in \`${componentName}\`.`
		);
	}
};

// configure default props
CustomIcon.defaultProps = {
	notExact: true
};

// configure the prop types validation
CustomIcon.propTypes = {
	social: PropTypes.string,
	career: PropTypes.string,
	technology: PropTypes.string,
	hobby: PropTypes.string,
	customValidator,
	notExact: PropTypes.bool
};

function CustomIcon({ social, career, technology, hobby, notExact }) {
	// retrieve the icon
	const Icon = retrieveIcon(social, career, technology, hobby, notExact);

	// setup the text container if the icon is a plain text
	const text = typeof Icon === 'string' ? Icon : undefined;

	return (
		<Suspense
			fallback={
				<Box>
					<Loading size="1em" />
				</Box>
			}
		>
			{text === undefined ? <Icon /> : text}
		</Suspense>
	);
}

export default CustomIcon;
