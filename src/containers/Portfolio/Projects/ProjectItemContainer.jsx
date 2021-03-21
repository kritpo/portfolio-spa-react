import { Storage } from 'aws-amplify';
import { PropTypes } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import ProjectItem from '../../../components/Portfolio/Projects/ProjectItem';
import { IMAGE_REGEX } from '../../../utils/forms/Field/ImageField';
import languages from '../../../utils/languages';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the prop types validation
ProjectItemContainer.propTypes = {
	project: PropTypes.shape({
		picture: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string
	}).isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function ProjectItemContainer({
	project,
	language: { systemLanguageCode },
	...props
}) {
	// setup the mounting status checker hook
	let _isMounted = useRef(true);

	// auto unsubscribe
	useEffect(
		// config the willUnmount cleanup
		() => () => {
			_isMounted.current = false;
		},
		[]
	);

	// compute the dates associated to the project item
	const startDate = new Date(project.startDate).toLocaleDateString();
	const endDate =
		project.endDate !== undefined
			? new Date(project.endDate).toLocaleDateString()
			: languages[systemLanguageCode].portfolio.projects.current;

	// setup the image url hook
	const [imageUrl, setImageUrl] = useState('');

	// retrieve the project image url
	useEffect(() => {
		// check the picture is in good format
		if (!IMAGE_REGEX.test(project.picture)) {
			// end here
			return;
		}

		// retrieve image data
		const { identityId, key } = JSON.parse(project.picture);

		// retrieve the image
		Storage.get(key, { level: 'protected', identityId }).then(url => {
			// check if the component is still mounted
			if (_isMounted.current) {
				// update image url
				setImageUrl(url);
			}
		});
	}, [project.picture]);

	return (
		<ProjectItem
			project={project}
			startDate={startDate}
			endDate={endDate}
			imageUrl={imageUrl}
			{...props}
		/>
	);
}

export default connect(mapStateToProps)(ProjectItemContainer);
