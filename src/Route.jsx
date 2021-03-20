import React, { Suspense } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import routes from './routes';

import { Switch, Route } from 'react-router-dom';

import Loading from './utils/Loading';
import Error401Container from './containers/Error401Container';
import Error404Container from './containers/Error404Container';

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
