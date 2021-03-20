import React from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

import languages from '../../../utils/languages';

import CareerItem, {
	WORK,
	EDUCATION,
	VOLUNTEER
} from '../../../components/Portfolio/Career/CareerItem';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

// configure the prop types validation
CareerItemContainer.propTypes = {
	career: PropTypes.oneOfType([
		// work career object shape
		PropTypes.shape({
			company: PropTypes.string.isRequired,
			position: PropTypes.string.isRequired,
			startDate: PropTypes.string.isRequired,
			endDate: PropTypes.string,
			highlights: PropTypes.arrayOf(PropTypes.string.isRequired)
				.isRequired,
			type: PropTypes.oneOf([WORK]).isRequired
		}),

		// education career object shape
		PropTypes.shape({
			institution: PropTypes.string.isRequired,
			area: PropTypes.string.isRequired,
			studyType: PropTypes.string.isRequired,
			startDate: PropTypes.string.isRequired,
			endDate: PropTypes.string,
			gpa: PropTypes.string.isRequired,
			type: PropTypes.oneOf([EDUCATION]).isRequired
		}),

		// volunteer career object shape
		PropTypes.shape({
			organization: PropTypes.string.isRequired,
			position: PropTypes.string.isRequired,
			startDate: PropTypes.string.isRequired,
			endDate: PropTypes.string,
			highlights: PropTypes.arrayOf(PropTypes.string.isRequired)
				.isRequired,
			type: PropTypes.oneOf([VOLUNTEER]).isRequired
		})
	]).isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function CareerItemContainer({
	career,
	language: { systemLanguageCode },
	...props
}) {
	// setup the breakpoints matchers hooks
	const { breakpoints } = useTheme();
	const isUpSm = useMediaQuery(breakpoints.up('sm'));

	// compute the dates, the title associated to the career item, the name of the career reference entity and the highlights elements associated to the career item
	const startDate = new Intl.DateTimeFormat(systemLanguageCode).format(
		new Date(career.startDate)
	);
	const endDate =
		career.endDate !== undefined
			? new Intl.DateTimeFormat(systemLanguageCode).format(
					new Date(career.endDate)
			  )
			: languages[systemLanguageCode].portfolio.career.current;
	const careerTitle =
		career.type === EDUCATION
			? career.studyType
			: career.position.replace(/^\[.+?\]/, '');
	const entityName =
		career.type === WORK
			? career.company
			: career.type === EDUCATION
			? career.institution
			: career.organization;
	const careerHighlights =
		career.type === EDUCATION
			? `${career.area} - GPA: ${career.gpa}`
			: career.highlights.join(' - ');

	return (
		<CareerItem
			career={career}
			isUpSm={isUpSm}
			startDate={startDate}
			endDate={endDate}
			careerTitle={careerTitle}
			entityName={entityName}
			careerHighlights={careerHighlights}
			language={{ systemLanguageCode }}
			{...props}
		/>
	);
}

export default connect(mapStateToProps)(CareerItemContainer);
