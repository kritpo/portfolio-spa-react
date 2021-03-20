import { Box } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

import { HOME } from '../routes';
import Error from '../utils/Error';
import languages from '../utils/languages';
import Header from './Header';

// configure the prop types validation
Error404.propTypes = {
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function Error404({ language: { systemLanguageCode } }) {
	return (
		<Fragment>
			<Header
				title={languages[systemLanguageCode].error404.title}
				history={[
					{
						link: HOME,
						title: languages[systemLanguageCode].pages.home
					}
				]}
			/>
			<Box component="main">
				<Error size="50vh">
					{languages[systemLanguageCode].error404.message}
				</Error>
			</Box>
		</Fragment>
	);
}

export default Error404;
