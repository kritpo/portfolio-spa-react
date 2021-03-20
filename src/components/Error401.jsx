import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { HOME } from '../routes';
import languages from '../utils/languages';

import { Box } from '@material-ui/core';

import Header from './Header';
import Error from '../utils/Error';

// configure the prop types validation
Error401.propTypes = {
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function Error401({ language: { systemLanguageCode } }) {
	return (
		<Fragment>
			<Header
				title={languages[systemLanguageCode].error401.title}
				history={[
					{
						link: HOME,
						title: languages[systemLanguageCode].pages.home
					}
				]}
			/>
			<Box component="main">
				<Error size="50vh">
					{languages[systemLanguageCode].error401.message}
				</Error>
			</Box>
		</Fragment>
	);
}

export default Error401;
