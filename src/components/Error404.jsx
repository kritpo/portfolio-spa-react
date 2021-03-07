import React, { Fragment } from 'react';

import { HOME } from '../routes';

import { Box } from '@material-ui/core';

import Header from './Header';
import Error from '../utils/Error';

function Error404() {
	return (
		<Fragment>
			<Header
				title="Erreur 404"
				history={[{ link: HOME, title: 'Accueil' }]}
			/>
			<Box component="main">
				<Error size="50vh">
					La page que vous cherchez n'existe pas
				</Error>
			</Box>
		</Fragment>
	);
}

export default Error404;
