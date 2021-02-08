import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import Hero from '../components/Hero';

// setup cursor speed constants
const CURSOR_SPEED = 250;
const SHORT_SPEED = 200;
const LONG_SPEED = 80;

// timeout container to be able to clear them if concurrency
let titleTimeout = null;
let descriptionTimeout = null;

/**
 * setup the writing animation
 * @param {function(string|function)} setState state updater
 * @param {string} text text to write
 * @param {number} speed speed of the write
 * @param {boolean} isTitle if the animation is a title
 */
const writingAnimation = (setState, text, speed, isTitle) => {
	// setup the animation
	const setAnimator = () => {
		// update the state
		setState(prev => {
			// check if the animation is finished
			let final = '';
			if (prev.includes(text)) {
				// alternate cursor showing/hiding
				if (prev === text + '|') final = text + '\u00A0';
				else final = text + '|';

				// override speed to uniformize it when it is finished
				speed = CURSOR_SPEED;
			} else {
				// compute the next step
				final = prev.slice(0, -1) + text[prev.length - 1] + '|';
			}

			// clear the timeout in case of concurrency
			clearTimeout(isTitle ? titleTimeout : descriptionTimeout);

			// setup the timeout for the next step
			const timeout = setTimeout(() => setAnimator(), speed);

			// check if it is the title animation
			if (isTitle) {
				// update the title timeout
				titleTimeout = timeout;
			} else {
				// otherwise update the description timeout
				descriptionTimeout = timeout;
			}

			return final;
		});
	};

	// reset the state
	setState('|');

	// start the animation with the first step
	setAnimator();
};

// configure the states to pass as props to the component
const mapStateToProps = (state, ...props) => ({
	resume: state.resume,
	...props
});

function HeroContainer({ resume, ...props }) {
	// setup the title state hook
	const [title, setTitle] = useState('|');

	// setup the description state hook
	const [description, setDescription] = useState('|');

	// setup the writing animation hook
	useEffect(() => {
		// retrieve the final title
		const finalTitle =
			!resume.isLoading && resume.error === null
				? `<${resume.resume.basics.name} />`
				: '<Jimmy Weng />';

		// retrieve the final description
		const finalDescription =
			!resume.isLoading && resume.error === null
				? resume.resume.basics.label
				: 'Développeur Full-Stack';

		// start the writing animation
		writingAnimation(setTitle, finalTitle, SHORT_SPEED, true);
		writingAnimation(setDescription, finalDescription, LONG_SPEED, false);
	}, [resume]);

	return <Hero title={title} description={description} {...props} />;
}

export default connect(mapStateToProps)(HeroContainer);
