import React, { useMemo } from 'react';
import { PropTypes } from 'prop-types';

import { useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import CareerItem, {
	WORK,
	EDUCATION,
	VOLUNTEER
} from '../../../components/Portfolio/Career/CareerItem';

// configure the prop types validation
CareerItemContainer.propTypes = {
	career: PropTypes.oneOfType([
		// work career object shape
		PropTypes.shape({
			company: PropTypes.string.isRequired,
			position: PropTypes.string.isRequired,
			website: PropTypes.string.isRequired,
			startDate: PropTypes.string.isRequired,
			endDate: PropTypes.string,
			summary: PropTypes.string.isRequired,
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
			courses: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
			type: PropTypes.oneOf([EDUCATION]).isRequired
		}),

		// volunteer career object shape
		PropTypes.shape({
			organization: PropTypes.string.isRequired,
			position: PropTypes.string.isRequired,
			website: PropTypes.string.isRequired,
			startDate: PropTypes.string.isRequired,
			endDate: PropTypes.string,
			summary: PropTypes.string.isRequired,
			highlights: PropTypes.arrayOf(PropTypes.string.isRequired)
				.isRequired,
			type: PropTypes.oneOf([VOLUNTEER]).isRequired
		})
	]).isRequired
};

function CareerItemContainer({ career, ...props }) {
	// setup the breakpoints matchers hooks
	const { breakpoints } = useTheme();
	const isUpSm = useMediaQuery(breakpoints.up('sm'));

	// compute the dates, the title associated to the career item, the name of the career reference entity and the highlights elements associated to the career item
	const [
		startDate,
		endDate,
		careerTitle,
		entityName,
		careerHighlights
	] = useMemo(
		() => [
			new Date(career.startDate).toLocaleDateString(),
			career.endDate !== undefined
				? new Date(career.endDate).toLocaleDateString()
				: 'Présent',
			career.type === EDUCATION
				? career.studyType
				: career.position.replace(/^\[.+?\]/, ''),
			career.type === WORK
				? career.company
				: career.type === EDUCATION
				? career.institution
				: career.organization,
			career.type === EDUCATION
				? `${career.area} - GPA: ${career.gpa}`
				: career.highlights.join(' - ')
		],
		[career]
	);

	return (
		<CareerItem
			career={career}
			isUpSm={isUpSm}
			startDate={startDate}
			endDate={endDate}
			careerTitle={careerTitle}
			entityName={entityName}
			careerHighlights={careerHighlights}
			{...props}
		/>
	);
}

export default CareerItemContainer;