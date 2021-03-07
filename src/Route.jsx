import React, { Suspense } from 'react';

import routes from './routes';

import { Switch, Route } from 'react-router-dom';

import Loading from './utils/Loading';
import Error404 from './components/Error404';

// convert routes details to React component
const routesList = routes.map(({ path, exact, component }) => (
	<Route path={path} exact={exact} component={component} key={path} />
));

function Routes() {
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
