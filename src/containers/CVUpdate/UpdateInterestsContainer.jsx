import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { CV_LIST } from '../../routes';
import { updateResume } from '../../actions';
import * as cvUtils from '../../utils/cvUtils';
import languages from '../../utils/languages';

import InterestsContainer, {
	INTERESTS,
	NAME,
	KEYWORDS,
	KEYWORD
} from '../CV/InterestsContainer';
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
UpdateInterestsContainer.propTypes = {
	interests: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			keyword: PropTypes.arrayOf(PropTypes.string).isRequired
		})
	).isRequired,
	updateResume: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function UpdateInterestsContainer({
	interests,
	updateResume,
	setForm,
	language: { systemLanguageCode }
}) {
	// setup the fields data
	const data = [
		{
			name: INTERESTS,
			payload: interests.map(({ name, keywords }) => [
				{ name: NAME, payload: name },
				{
					name: KEYWORDS,
					payload: keywords.map(keyword => [
						{ name: KEYWORD, payload: keyword }
					])
				}
			])
		}
	];

	// setup the onSubmit callback
	const onSubmit = useCallback(
		(form, reCaptchaToken, unlock) =>
			updateResume({
				interests: cvUtils.mapInterestsFormToObject(form)
			}).then(() => {
				// call setForm to change the update status to false
				setForm();

				// unlock the form
				unlock();
			}),
		[setForm, updateResume]
	);

	return (
		<InterestsContainer
			data={data}
			onSubmit={onSubmit}
			action={languages[systemLanguageCode].cvUpdate.action}
			setForm={setForm}
		>
			<CustomLink to={CV_LIST}>
				{languages[systemLanguageCode].cv.goToCVList}
			</CustomLink>
		</InterestsContainer>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpdateInterestsContainer);
