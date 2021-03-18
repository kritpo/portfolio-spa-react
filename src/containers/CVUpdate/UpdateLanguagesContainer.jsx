import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { updateResume } from '../../actions';
import * as cvUtils from '../../utils/cvUtils';

import LanguagesContainer, {
	LANGUAGES,
	LANGUAGE,
	FLUENCY
} from '../CV/LanguagesContainer';

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	updateResume
};

// configure the prop types validation
UpdateLanguagesContainer.propTypes = {
	languages: PropTypes.arrayOf(
		PropTypes.shape({
			language: PropTypes.string.isRequired,
			fluency: PropTypes.string.isRequired
		})
	).isRequired,
	updateResume: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired
};

function UpdateLanguagesContainer({ languages, updateResume, setForm }) {
	// setup the fields data
	const data = [
		{
			name: LANGUAGES,
			payload: languages.map(({ language, fluency }) => [
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
				// unlock the form
				unlock();
			}),
		[updateResume]
	);

	return (
		<LanguagesContainer
			data={data}
			onSubmit={onSubmit}
			action="Modifier"
			setForm={setForm}
		/>
	);
}

export default connect(null, mapDispatchToProps)(UpdateLanguagesContainer);
