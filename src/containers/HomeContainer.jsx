import { PropTypes } from 'prop-types';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';

import { fetchResume } from '../actions';
import Portfolio from '../components/Portfolio';

// configure the states to pass as props to the component
const mapStateToProps = (
	{ language, mainResume, navIntersection: { ref: navIntersectionRef } },
	...props
) => ({
	language,
	resume: mainResume,
	navIntersectionRef,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	fetchResume
};

// configure the prop types validation
HomeContainer.propTypes = {
	fetchResume: PropTypes.func.isRequired,
	language: PropTypes.shape({
		resumeLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function HomeContainer({
	fetchResume,
	language: { resumeLanguageCode, ...language },
	...props
}) {
	// setup the cookies hook
	const [, setCookies] = useCookies(['languageCode']);

	// setup the main resume fetching hook
	useEffect(() => {
		// fetch the main resume at the loading of the component
		fetchResume(true, 'kritpo', resumeLanguageCode).then(resume => {
			// check if the resume is defined
			if (resume !== undefined) {
				// update the language code cookie
				setCookies('languageCode', resume.languageCode, {
					path: '/',
					sameSite: true
				});
			}
		});
	}, [fetchResume, resumeLanguageCode, setCookies]);

	return <Portfolio isMain={true} language={language} {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
