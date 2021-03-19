import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { logout } from '../../actions';
import { HOME } from '../../routes';

import UserMenu from '../../components/Nav/UserMenu';

// configure the states to pass as props to the component
const mapStateToProps = ({ username }, ...props) => ({
	username,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	logout
};

// configure the prop types validation
UserMenuContainer.propTypes = {
	logout: PropTypes.func.isRequired
};

function UserMenuContainer({ logout, ...props }) {
	// setup the history hook
	const history = useHistory();

	// setup the logout function
	const logoutCallback = useCallback(() => {
		// logout the user
		logout();

		// redirect the user to the home page
		history.push(HOME);
	}, [history, logout]);

	return <UserMenu logout={logoutCallback} {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenuContainer);
