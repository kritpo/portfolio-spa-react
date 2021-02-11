import React, { Fragment } from 'react';

import Header from './Header';
import Error from '../tools/Error';

function Error404() {
	return (
		<Fragment>
			<Header
				title="Erreur 404"
				history={[{ link: '/', title: 'Accueil' }]}
			/>
			<Error size="50vh">La page que vous cherchez n'existe pas</Error>
		</Fragment>
	);
}

export default Error404;
