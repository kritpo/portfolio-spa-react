import React, { useState, useMemo } from 'react';
import { PropTypes } from 'prop-types';

import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import {
	WORK,
	EDUCATION,
	VOLUNTEER
} from '../../components/Portfolio/Career/CareerItem';

import Career from '../../components/Portfolio/Career';

/**
 * setup the anti-chronological comparator between two career objects
 * @param {object} careerA career A to compare
 * @param {object} careerB career B to compare
 */
const careerAntiChronoComparator = (
	{ startDate: startDateA, endDate: endDateA },
	{ startDate: startDateB, endDate: endDateB }
) => {
	// check if either the end dates of A or B is specified
	if (endDateA !== undefined || endDateB !== undefined) {
		// check if the end date of A is not specified
		if (endDateA === undefined) {
			// return -1 which means A < B, A is pending while B is already finished
			return -1;
		}

		// check if the end date of B is not specified
		if (endDateB === undefined) {
			// return 1 which means A > B, A is already finished while B is still pending
			return 1;
		}

		/**
		 * the end date of A and B are both specified, we must compare them as date
		 */
		if (Date.parse(endDateA) > Date.parse(endDateB)) {
			// return -1 which means A < B, A ends after B ends
			return -1;
		}
		if (Date.parse(endDateA) < Date.parse(endDateB)) {
			// return 1 which means A > B, A ends before B ends
			return 1;
		}
	}

	/**
	 * the end dates of A and B are both not specified or equals, we must compare the start dates
	 */
	if (Date.parse(startDateA) > Date.parse(startDateB)) {
		// return -1 which means A < B, A starts after B starts
		return -1;
	}
	if (Date.parse(startDateA) < Date.parse(startDateB)) {
		// return 1 which means A > B, A starts before B starts
		return 1;
	}

	// otherwise, return 0 which means A = B, A and B start and end at the same time, even if pending
	return 0;
};

/**
 * setup the career array generator
 * @param {object} work work data
 * @param {object} education education data
 * @param {object} volunteer volunteer data
 */
const loadCareer = (work, education, volunteer) => {
	// initialize the final career container
	let career = [];

	// check if the work data need to be added
	if (work.show) {
		// add all work data into the final career container
		career = career.concat(
			// add `WORK` mark into all data from work array
			work.data.map(currentWork => ({ ...currentWork, type: WORK }))
		);
	}

	// check if the education data need to be added
	if (education.show) {
		// add all education data into the final career container
		career = career.concat(
			// add `EDUCATION` mark into all data from education array
			education.data.map(currentWork => ({
				...currentWork,
				type: EDUCATION
			}))
		);
	}

	// check if the volunteer data need to be added
	if (volunteer.show) {
		// add all volunteer data into the final career container
		career = career.concat(
			// add `VOLUNTEER` mark into all data from volunteer array
			volunteer.data.map(currentWork => ({
				...currentWork,
				type: VOLUNTEER
			}))
		);
	}

	// sort the career array
	career.sort(careerAntiChronoComparator);

	return career;
};

// configure the prop types validation
CareerContainer.propTypes = {
	work: PropTypes.arrayOf(
		PropTypes.shape({
			company: PropTypes.string.isRequired,
			position: PropTypes.string.isRequired,
			website: PropTypes.string.isRequired,
			startDate: PropTypes.string.isRequired,
			endDate: PropTypes.string,
			summary: PropTypes.string.isRequired,
			highlights: PropTypes.arrayOf(PropTypes.string.isRequired)
				.isRequired
		})
	).isRequired,
	education: PropTypes.arrayOf(
		PropTypes.shape({
			institution: PropTypes.string.isRequired,
			area: PropTypes.string.isRequired,
			studyType: PropTypes.string.isRequired,
			startDate: PropTypes.string.isRequired,
			endDate: PropTypes.string,
			gpa: PropTypes.string.isRequired,
			courses: PropTypes.arrayOf(
				PropTypes.shape({
					category: PropTypes.string.isRequired,
					courses: PropTypes.arrayOf(PropTypes.string).isRequired
				})
			).isRequired
		})
	).isRequired,
	volunteer: PropTypes.arrayOf(
		PropTypes.shape({
			organization: PropTypes.string.isRequired,
			position: PropTypes.string.isRequired,
			website: PropTypes.string.isRequired,
			startDate: PropTypes.string.isRequired,
			endDate: PropTypes.string,
			summary: PropTypes.string.isRequired,
			highlights: PropTypes.arrayOf(PropTypes.string.isRequired)
				.isRequired
		})
	).isRequired
};

function CareerContainer({ work, education, volunteer, ...props }) {
	// setup the show career items hooks
	const [show, setShow] = useState({
		[WORK]: true,
		[EDUCATION]: true,
		[VOLUNTEER]: true
	});

	// setup the breakpoints matchers hooks
	const { breakpoints } = useTheme();
	const isUpMd = useMediaQuery(breakpoints.up('md'));

	// setup the load of careers
	const careers = useMemo(
		() =>
			loadCareer(
				{ show: show[WORK], data: work },
				{ show: show[EDUCATION], data: education },
				{ show: show[VOLUNTEER], data: volunteer }
			),
		[education, show, volunteer, work]
	);

	// setup filter event handlers
	const [workToggle, educationToggle, volunteerToggle, allToggle] = useMemo(
		() => [
			() => setShow({ ...show, [WORK]: !show[WORK] }),
			() => setShow({ ...show, [EDUCATION]: !show[EDUCATION] }),
			() => setShow({ ...show, [VOLUNTEER]: !show[VOLUNTEER] }),
			() =>
				setShow({
					...show,
					[WORK]: !show[WORK],
					[EDUCATION]: !show[EDUCATION],
					[VOLUNTEER]: !show[VOLUNTEER]
				})
		],
		[show]
	);

	return (
		<Career
			careers={careers}
			show={show}
			workToggle={workToggle}
			educationToggle={educationToggle}
			volunteerToggle={volunteerToggle}
			allToggle={allToggle}
			isUpMd={isUpMd}
			{...props}
		/>
	);
}

export default CareerContainer;
