import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { useRouteMatch } from 'react-router-dom';

import { useCookies } from 'react-cookie';

import { fetchResume } from '../actions';

import Portfolio from '../components/Portfolio';

// configure the states to pass as props to the component
const mapStateToProps = (
	{ language, resume, navIntersection: { ref: navIntersectionRef } },
	...props
) => ({
	language,
	resume,
	navIntersectionRef,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	fetchResume
};

// configure the prop types validation
PortfolioContainer.propTypes = {
	fetchResume: PropTypes.func.isRequired,
	language: PropTypes.shape({
		resumeLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function PortfolioContainer({
	fetchResume,
	language: { resumeLanguageCode, ...language },
	...props
}) {
	// setup the cookies hook
	const [, setCookies] = useCookies(['languageCode']);

	// retrieve the username from the match hook
	const {
		params: { username }
	} = useRouteMatch();

	// setup the resume fetching hook
	useEffect(() => {
		// fetch the resume at the loading of the component
		fetchResume(false, username, resumeLanguageCode).then(resume => {
			// check if the resume is defined
			if (resume !== undefined) {
				// update the language code cookie
				setCookies('languageCode', resume.languageCode, {
					path: '/',
					sameSite: true
				});
			}
		});
	}, [fetchResume, resumeLanguageCode, setCookies, username]);

	return <Portfolio isMain={false} language={language} {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);
