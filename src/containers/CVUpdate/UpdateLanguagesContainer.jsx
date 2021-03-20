import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { CV_LIST } from '../../routes';
import { updateResume } from '../../actions';
import * as cvUtils from '../../utils/cvUtils';
import languages_const from '../../utils/languages';

import LanguagesContainer, {
	LANGUAGES,
	COUNTRY_CODE,
	LANGUAGE,
	FLUENCY
} from '../CV/LanguagesContainer';
import CustomLink from '../../utils/CustomLink';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	updateResume
};

// configure the prop types validation
UpdateLanguagesContainer.propTypes = {
	languages: PropTypes.arrayOf(
		PropTypes.shape({
			countryCode: PropTypes.string.isRequired,
			language: PropTypes.string.isRequired,
			fluency: PropTypes.string.isRequired
		})
	).isRequired,
	updateResume: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function UpdateLanguagesContainer({
	languages,
	updateResume,
	setForm,
	language: { systemLanguageCode }
}) {
	// setup the fields data
	const data = [
		{
			name: LANGUAGES,
			payload: languages.map(({ countryCode, language, fluency }) => [
				{ name: COUNTRY_CODE, payload: countryCode },
				{ name: LANGUAGE, payload: language },
				{ name: FLUENCY, payload: fluency }
			])
		}
	];

	// setup the onSubmit callback
	const onSubmit = useCallback(
		(form, reCaptchaToken, unlock) =>
			updateResume({
				languages: cvUtils.mapLanguagesFormToObject(form)
			}).then(() => {
				// call setForm to change the update status to false
				setForm();

				// unlock the form
				unlock();
			}),
		[setForm, updateResume]
	);

	return (
		<LanguagesContainer
			data={data}
			onSubmit={onSubmit}
			action={languages_const[systemLanguageCode].cvUpdate.action}
			setForm={setForm}
		>
			<CustomLink to={CV_LIST}>
				{languages_const[systemLanguageCode].cv.goToCVList}
			</CustomLink>
		</LanguagesContainer>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpdateLanguagesContainer);
