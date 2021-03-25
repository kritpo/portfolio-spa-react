import { PropTypes } from 'prop-types';
import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Error401Container from './containers/Error401Container';
import Error404Container from './containers/Error404Container';
import routes from './routes';
import Loading from './utils/Loading';

// convert routes details to React component
const routesList = username =>
	routes.map(({ path, exact, component, logged }) =>
		logged === undefined ||
		(logged && username !== '') ||
		(!logged && username === '') ? (
			<Route path={path} exact={exact} component={component} key={path} />
		) : (
			<Route
				path={path}
				exact={exact}
				component={Error401Container}
				key={path}
			/>
		)
	);

// configure the states to pass as props to the component
const mapStateToProps = ({ username }, ...props) => ({
	username,
	...props
});

// configure the prop types validation
Routes.propTypes = {
	username: PropTypes.string.isRequired
};

function Routes({ username }) {
	return (
		<Suspense fallback={<Loading size="50vh" />}>
			<Switch>
				{routesList(username)}
				<Route>
					<Error404Container />
				</Route>
			</Switch>
		</Suspense>
	);
}

export default connect(mapStateToProps)(Routes);
