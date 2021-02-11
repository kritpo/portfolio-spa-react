import React, { lazy, Suspense } from 'react';

import { Switch, Route } from 'react-router-dom';

import Loading from './tools/Loading';
import Error404 from './components/Error404';

const PortfolioContainer = lazy(() =>
	import('./containers/PortfolioContainer')
);
const Terms = lazy(() => import('./components/Terms'));

function Routes() {
	return (
		<Suspense fallback={<Loading size="50vh" />}>
			<Switch>
				<Route exact path="/">
					<PortfolioContainer />
				</Route>
				<Route path="/terms">
					<Terms />
				</Route>
				<Route>
					<Error404 />
				</Route>
			</Switch>
		</Suspense>
	);
}

export default Routes;
