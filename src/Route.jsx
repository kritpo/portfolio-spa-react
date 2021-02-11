import React, { Suspense } from 'react';

import routes from './routes';

import { Switch, Route } from 'react-router-dom';

import Loading from './tools/Loading';
import Error404 from './components/Error404';

function Routes() {
	// convert routes details to React component
	const routesList = routes.map(route => (
		<Route
			path={route.path}
			exact={route.exact}
			component={route.component}
			key={route.path}
		/>
	));

	return (
		<Suspense fallback={<Loading size="50vh" />}>
			<Switch>
				{routesList}
				<Route>
					<Error404 />
				</Route>
			</Switch>
		</Suspense>
	);
}

export default Routes;
