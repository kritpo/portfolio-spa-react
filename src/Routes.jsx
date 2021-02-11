import React, { lazy, Suspense } from 'react';

import { Switch, Route } from 'react-router-dom';

import Loading from './tools/Loading';

const PortfolioContainer = lazy(() =>
	import('./containers/PortfolioContainer')
);
const Terms = lazy(() => import('./components/Terms'));

function Routes() {
	return (
		<Suspense fallback={<Loading size="50vh" />}>
			<Switch>
				<Route path="/terms">
					<Terms />
				</Route>
				<Route path="/">
					<PortfolioContainer />
				</Route>
			</Switch>
		</Suspense>
	);
}

export default Routes;
