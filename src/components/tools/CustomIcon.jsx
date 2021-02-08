import React from 'react';
import { PropTypes } from 'prop-types';

import { useAsync } from 'react-async';

import icons, { SOCIAL, CAREER, TECHNOLOGY } from './icons/icons';

/**
 * retrieve the icon or return the keyword
 * @param {object} props input keyword object
 */
const retrieveIcon = async ({ social, career, technology }) => {
	// check if no props is defined
	if (
		social === undefined &&
		career === undefined &&
		technology === undefined
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
			: icons.filter(iconInfo => iconInfo.type === TECHNOLOGY);

	// retrieve and convert the keyword in lowercase for normalization
	const keyword = (social || career || technology).toLowerCase();

	// find the icon corresponding to the keyword
	const icon = filteredIcons.find(currIcon => {
		// find an keyword which match the input keyword
		const finalKeyword = currIcon.keyword.find(key => key === keyword);

		// if a keyword is found, then the icon match the input request
		return finalKeyword !== undefined;
	});

	// check if an icon is found
	if (icon !== undefined) {
		// return the icon component export object
		return icon.loadIcon();
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
		props.technology === undefined
	) {
		return new Error(
			`One of props \`social\` or \`career\` or \`technology\` was not specified in \`${componentName}\`.`
		);
	}

	// check if at most one props was specified
	if (
		(props.social !== undefined &&
			(props.career !== undefined || props.technology !== undefined)) ||
		(props.career !== undefined && props.technology !== undefined)
	) {
		return new Error(
			`More than one of props \`social\` or \`career\` or \`technology\` was specified in \`${componentName}\`.`
		);
	}
};

// configure the prop types validation
CustomIcon.propTypes = {
	social: PropTypes.string,
	career: PropTypes.string,
	technology: PropTypes.string,
	customValidator
};

function CustomIcon({ social, career, technology }) {
	// setup the icon retrieve hook
	const { data } = useAsync({
		promiseFn: retrieveIcon,
		social,
		career,
		technology
	});

	// check if data is retrieved
	if (data) {
		// check if the data is the file import object
		if (typeof data === 'object') {
			// retrieve the icon component
			const Icon = data.default;

			// return the matched icon
			return <Icon />;
		}

		// return the keyword as no icon matches it
		return data;
	}

	// return null when the asynchronous function to retrieve icon is not ended
	return null;
}

export default CustomIcon;
