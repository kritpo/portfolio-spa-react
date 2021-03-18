import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { CVS } from '../../routes';
import { updateResume } from '../../actions';
import * as cvUtils from '../../utils/cvUtils';

import BasicsContainer, {
	NAME,
	LABEL,
	SUMMARY,
	PICTURE,
	EMAIL,
	PHONE,
	WEBSITE,
	ADDRESS,
	POSTAL_CODE,
	CITY,
	REGION,
	COUNTRY_CODE,
	PROFILES,
	NETWORK,
	USERNAME,
	URL
} from '../CV/BasicsContainer';
import CustomLink from '../../utils/CustomLink';

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	updateResume
};

// configure the prop types validation
UpdateBasicsContainer.propTypes = {
	basics: PropTypes.shape({
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		picture: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		phone: PropTypes.string.isRequired,
		website: PropTypes.string.isRequired,
		summary: PropTypes.string.isRequired,
		location: PropTypes.shape({
			address: PropTypes.string.isRequired,
			postalCode: PropTypes.string.isRequired,
			city: PropTypes.string.isRequired,
			countryCode: PropTypes.string.isRequired,
			region: PropTypes.string.isRequired
		}).isRequired,
		profiles: PropTypes.arrayOf(
			PropTypes.shape({
				network: PropTypes.string.isRequired,
				username: PropTypes.string.isRequired,
				url: PropTypes.string.isRequired
			})
		).isRequired
	}).isRequired,
	updateResume: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired
};

function UpdateBasicsContainer({
	basics: {
		name,
		label,
		picture,
		email,
		phone,
		website,
		summary,
		location: { address, postalCode, city, countryCode, region },
		profiles
	},
	updateResume,
	setForm
}) {
	// setup the fields data
	const data = [
		{ name: NAME, payload: name },
		{ name: LABEL, payload: label },
		{ name: SUMMARY, payload: summary },
		{ name: PICTURE, payload: picture },
		{ name: EMAIL, payload: email },
		{ name: PHONE, payload: phone },
		{ name: WEBSITE, payload: website },
		{ name: ADDRESS, payload: address },
		{ name: POSTAL_CODE, payload: postalCode },
		{ name: CITY, payload: city },
		{ name: REGION, payload: region },
		{ name: COUNTRY_CODE, payload: countryCode },
		{
			name: PROFILES,
			payload: profiles.map(({ network, username, url }) => [
				{ name: NETWORK, payload: network },
				{ name: USERNAME, payload: username },
				{ name: URL, payload: url }
			])
		}
	];

	// setup the onSubmit callback
	const onSubmit = useCallback(
		(form, reCaptchaToken, unlock) =>
			updateResume({ basics: cvUtils.mapBasicsFormToObject(form) }).then(
				() => {
					// unlock the form
					unlock();
				}
			),
		[updateResume]
	);

	return (
		<BasicsContainer
			data={data}
			onSubmit={onSubmit}
			action="Modifier"
			setForm={setForm}
		>
			<CustomLink to={CVS}>Revenir à la liste des CVs</CustomLink>
		</BasicsContainer>
	);
}

export default connect(null, mapDispatchToProps)(UpdateBasicsContainer);
