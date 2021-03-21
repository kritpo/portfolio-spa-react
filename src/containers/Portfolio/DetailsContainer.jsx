import { Storage } from 'aws-amplify';
import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Details from '../../components/Portfolio/Details';
import { IMAGE_REGEX } from '../../utils/forms/Field/ImageField';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the prop types validation
DetailsContainer.propTypes = {
	basics: PropTypes.shape({
		picture: PropTypes.string.isRequired
	}).isRequired
};

function DetailsContainer({ basics, ...props }) {
	// setup the image url hook
	const [imageUrl, setImageUrl] = useState('');

	// retrieve the user profile image url
	useEffect(() => {
		// check the picture is in good format
		if (!IMAGE_REGEX.test(basics.picture)) {
			// end here
			return;
		}

		// setup the subscription status
		let isSubscribed = true;

		// retrieve image data
		const { identityId, key } = JSON.parse(basics.picture);

		// retrieve the image
		Storage.get(key, { level: 'protected', identityId }).then(url => {
			// check if the subscription is valid
			if (isSubscribed) {
				// update image url
				setImageUrl(url);
			}
		});

		return () => (isSubscribed = false);
	}, [basics.picture]);

	return <Details basics={basics} imageUrl={imageUrl} {...props} />;
}

export default connect(mapStateToProps)(DetailsContainer);
