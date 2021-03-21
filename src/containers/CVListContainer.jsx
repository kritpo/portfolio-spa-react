import { PropTypes } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchResumeLanguages } from '../actions';
import CVList from '../components/CVList';

// configure the states to pass as props to the component
const mapStateToProps = (
	{ username, resumeLanguages, language },
	...props
) => ({
	username,
	resumeLanguages,
	language,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	fetchResumeLanguages
};

// configure the prop types validation
UserContainer.propTypes = {
	username: PropTypes.string.isRequired,
	fetchResumeLanguages: PropTypes.func.isRequired,
	resumeLanguages: PropTypes.shape({
		resumeLanguages: PropTypes.object.isRequired,
		error: PropTypes.string
	}).isRequired
};

function UserContainer({
	username,
	fetchResumeLanguages,
	resumeLanguages: {
		isLoading,
		resumeLanguages: originalResumeLanguages,
		error
	},
	...props
}) {
	// setup the resume languages fetching hook
	useEffect(() => {
		// fetch the resume languages at the loading of the component
		fetchResumeLanguages(false, username);
	}, [fetchResumeLanguages, username]);

	// override the resume languages if an error occurs
	const resumeLanguages =
		error === null ? originalResumeLanguages : { languages: [] };

	return (
		<CVList
			username={username}
			resumeLanguages={{ isLoading, resumeLanguages }}
			{...props}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
