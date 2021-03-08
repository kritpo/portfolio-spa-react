import React, { Fragment } from 'react';

import { HOME } from '../routes';

import { Box } from '@material-ui/core';

import Header from './Header';
import Error from '../utils/Error';

function Error401() {
	return (
		<Fragment>
			<Header
				title="Erreur 401"
				history={[{ link: HOME, title: 'Accueil' }]}
			/>
			<Box component="main">
				<Error size="50vh">Vous ne pouvez pas accéder à la page</Error>
			</Box>
		</Fragment>
	);
}

export default Error401;
