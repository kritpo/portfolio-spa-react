import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { API } from 'aws-amplify';

import CVS from '../components/CVS';

// configure the states to pass as props to the component
const mapStateToProps = ({ username }, ...props) => ({
	username,
	...props
});

// configure the prop types validation
UserContainer.propTypes = {
	username: PropTypes.string.isRequired
};

function UserContainer({ username, ...props }) {
	// initialize the languages hook
	const [languages, setLanguages] = useState({
		defaultLanguage: {},
		languages: []
	});

	// retrieve the languages list
	useEffect(() => {
		API.get(
			'PortfolioAPIServerless',
			'/resumes/' + username + '/languages',
			{}
		)
			.then(resumeLanguages => {
				setLanguages(resumeLanguages);
			})
			.catch(() => {});
	}, [username]);

	return <CVS languages={languages} username={username} {...props} />;
}

export default connect(mapStateToProps)(UserContainer);
