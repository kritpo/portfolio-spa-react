import React, { useMemo } from 'react';

import { connect } from 'react-redux';

import { WORK, EDUCATION, VOLUNTEER } from '../components/CareerItem';

import Career from '../components/Career';

/**
 * setup the anti-chronological comparator between two career objects
 * @param {object} careerA career A to compare
 * @param {object} careerB career B to compare
 */
const careerAntiChronoComparator = (careerA, careerB) => {
	// check if either the end dates of A or B is specified
	if (careerA.endDate !== undefined || careerB.endDate !== undefined) {
		// check if the end date of A is not specified
		if (careerA.endDate === undefined) {
			// return -1 which means A < B, A is pending while B is already finished
			return -1;
		}

		// check if the end date of B is not specified
		if (careerB.endDate === undefined) {
			// return 1 which means A > B, A is already finished while B is still pending
			return 1;
		}

		/**
		 * the end date of A and B are both specified, we must compare them as date
		 */
		if (Date.parse(careerA.endDate) > Date.parse(careerB.endDate)) {
			// return -1 which means A < B, A ends after B ends
			return -1;
		}
		if (Date.parse(careerA.endDate) < Date.parse(careerB.endDate)) {
			// return 1 which means A > B, A ends before B ends
			return 1;
		}
	}

	/**
	 * the end dates of A and B are both not specified or equals, we must compare the start dates
	 */
	if (Date.parse(careerA.startDate) > Date.parse(careerB.startDate)) {
		// return -1 which means A < B, A starts after B starts
		return -1;
	}
	if (Date.parse(careerA.startDate) < Date.parse(careerB.startDate)) {
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

// configure the states to pass as props to the component
const mapStateToProps = (state, props) => ({
	resume: state.resume.resume,
	...props
});

function CareerContainer({ resume, ...props }) {
	// setup the load of careers
	const careers = useMemo(
		() =>
			loadCareer(
				{ show: true, data: resume.work },
				{ show: true, data: resume.education },
				{ show: true, data: resume.volunteer }
			),
		[resume]
	);

	return <Career careers={careers} {...props} />;
}

export default connect(mapStateToProps)(CareerContainer);
