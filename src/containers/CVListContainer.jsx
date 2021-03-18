import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { fetchResumeLanguages } from '../actions';

import CVList from '../components/CVList';

// configure the states to pass as props to the component
const mapStateToProps = ({ username, resumeLanguages }, ...props) => ({
	username,
	resumeLanguages,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	fetchResumeLanguages
};

// configure the prop types validation
UserContainer.propTypes = {
	username: PropTypes.string.isRequired,
	fetchResumeLanguages: PropTypes.func.isRequired
};

function UserContainer({ username, fetchResumeLanguages, ...props }) {
	// setup the resume languages fetching hook
	useEffect(() => {
		// fetch the resume languages at the loading of the component
		fetchResumeLanguages(false, username);
	}, [fetchResumeLanguages, username]);

	return <CVList username={username} {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
