import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Hero from '../../components/Portfolio/Hero';
import languages from '../../utils/languages';

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
 * @param {function(string|function)} setCursorState cursor state updater
 * @param {string} text text to write
 * @param {boolean} isTitle if the animation is a title
 */
const writingAnimation = (setState, setCursorState, text, isTitle) => {
	// setup timeout cleaner
	const cleanTimeout = () => {
		// check if the title timeout is defined
		if (isTitle && titleTimeout !== undefined) {
			// clear the timeout
			clearTimeout(titleTimeout);
			titleTimeout = undefined;
		} else if (!isTitle && descriptionTimeout !== undefined) {
			// clear the timeout
			clearTimeout(descriptionTimeout);
			descriptionTimeout = undefined;
		}
	};

	// clean the timeout
	cleanTimeout();

	// clean the writing space
	setState('');
	setCursorState('|');

	// save a local copy of the text to write
	let leftText = text;

	// setup the animation stepper
	const nextStep = () => {
		// clean the timeout
		cleanTimeout();

		// check if the text still need to be written
		if (leftText.length > 0) {
			// retrieve the next letter to write
			const letter = leftText[0];

			// update the textContainer
			leftText = leftText.substring(1);

			// check if it is a title
			if (isTitle) {
				// set the next animation state for the title
				titleTimeout = setTimeout(() => {
					nextStep();
				}, SHORT_SPEED);
			} else {
				// otherwise set the next animation state for the description
				descriptionTimeout = setTimeout(() => {
					nextStep();
				}, LONG_SPEED);
			}

			// setup the writing animation
			setState(prev => prev + letter);
		} else {
			// check if it is a title
			if (isTitle) {
				// set the next animation state for the title cursor
				titleTimeout = setTimeout(() => {
					nextStep();
				}, CURSOR_SPEED);
			} else {
				// otherwise set the next animation state for the description cursor
				descriptionTimeout = setTimeout(() => {
					nextStep();
				}, CURSOR_SPEED);
			}

			// alternate cursor / blank space
			setCursorState(prev => (prev === '|' ? '\u00A0' : '|'));
		}
	};

	// start the animation with the first step
	nextStep();
};

// configure the states to pass as props to the component
const mapStateToProps = ({ webpSupport, language }, ...props) => ({
	webpSupport,
	language,
	...props
});

// configure the prop types validation
HeroContainer.propTypes = {
	resume: PropTypes.shape({
		resume: PropTypes.shape({
			basics: PropTypes.shape({
				name: PropTypes.string.isRequired,
				label: PropTypes.string.isRequired
			})
		}).isRequired,
		isLoading: PropTypes.bool.isRequired,
		error: PropTypes.string
	}).isRequired,
	isMain: PropTypes.bool.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function HeroContainer({
	resume: { resume, isLoading, error },
	isMain,
	language: { systemLanguageCode },
	...props
}) {
	// setup the title state hook
	const [title, setTitle] = useState('');
	const [titleCursor, setTitleCursor] = useState('|');

	// setup the description state hook
	const [description, setDescription] = useState('');
	const [descriptionCursor, setDescriptionCursor] = useState('|');

	// setup the writing animation hook
	useEffect(() => {
		// retrieve the final title
		const finalTitle =
			!isLoading && error === null
				? `<${resume.basics.name} />`
				: isMain
				? languages[systemLanguageCode].portfolio.hero.titleDefault
				: isLoading
				? languages[systemLanguageCode].portfolio.hero.titleLoading
				: languages[systemLanguageCode].portfolio.hero.titleError;

		// retrieve the final description
		const finalDescription =
			!isLoading && error === null
				? resume.basics.label
				: isMain
				? languages[systemLanguageCode].portfolio.hero
						.descriptionDefault
				: isLoading
				? languages[systemLanguageCode].portfolio.hero
						.descriptionLoading
				: languages[systemLanguageCode].portfolio.hero.descriptionError;

		// start the writing animation
		writingAnimation(setTitle, setTitleCursor, finalTitle, true);
		writingAnimation(
			setDescription,
			setDescriptionCursor,
			finalDescription,
			false
		);

		return () => {
			// clear the timeouts
			clearTimeout(titleTimeout);
			clearTimeout(descriptionTimeout);
		};
	}, [error, isLoading, isMain, resume, systemLanguageCode]);

	return (
		<Hero
			title={title}
			titleCursor={titleCursor}
			description={description}
			descriptionCursor={descriptionCursor}
			{...props}
		/>
	);
}

export default connect(mapStateToProps)(HeroContainer);
