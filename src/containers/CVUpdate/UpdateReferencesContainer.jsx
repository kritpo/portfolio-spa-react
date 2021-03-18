import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { CV_LIST } from '../../routes';
import { updateResume } from '../../actions';
import * as cvUtils from '../../utils/cvUtils';

import ReferencesContainer, {
	REFERENCES,
	NAME,
	REFERENCE
} from '../CV/ReferencesContainer';
import CustomLink from '../../utils/CustomLink';

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	updateResume
};

// configure the prop types validation
UpdateReferencesContainer.propTypes = {
	references: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			reference: PropTypes.string.isRequired
		})
	).isRequired,
	updateResume: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired
};

function UpdateReferencesContainer({ references, updateResume, setForm }) {
	// setup the fields data
	const data = [
		{
			name: REFERENCES,
			payload: references.map(({ name, reference }) => [
				{ name: NAME, payload: name },
				{ name: REFERENCE, payload: reference }
			])
		}
	];

	// setup the onSubmit callback
	const onSubmit = useCallback(
		(form, reCaptchaToken, unlock) =>
			updateResume({
				references: cvUtils.mapReferencesFormToObject(form)
			}).then(() => {
				// call setForm to change the update status to false
				setForm();

				// unlock the form
				unlock();
			}),
		[setForm, updateResume]
	);

	return (
		<ReferencesContainer
			data={data}
			onSubmit={onSubmit}
			action="Modifier"
			setForm={setForm}
		>
			<CustomLink to={CV_LIST}>Revenir à la liste des CVs</CustomLink>
		</ReferencesContainer>
	);
}

export default connect(null, mapDispatchToProps)(UpdateReferencesContainer);
