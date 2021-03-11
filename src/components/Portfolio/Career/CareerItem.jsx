import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { Box, Card, CardContent, Typography, Hidden } from '@material-ui/core';
import {
	TimelineItem,
	TimelineContent,
	TimelineOppositeContent,
	TimelineSeparator,
	TimelineConnector,
	TimelineDot
} from '@material-ui/lab';

import CustomIcon from '../../../utils/icons/CustomIcon';
import CustomLink from '../../../utils/CustomLink';
import CareerItemButtonContainer from '../../../containers/Portfolio/Career/CareerItemButtonContainer';

// setup career types constants
export const WORK = 'work';
export const EDUCATION = 'education';
export const VOLUNTEER = 'volunteer';

/**
 * retrieve the good icon
 * @param {object} career the career object
 * @returns the component
 */
const icon = ({ type, isInternship }) => (
	<CustomIcon
		career={type !== WORK ? type : isInternship ? 'Internship' : WORK}
	/>
);

// configure the prop types validation
CareerItem.propTypes = {
	career: PropTypes.oneOfType([
		// work career object shape
		PropTypes.shape({
			isInternship: PropTypes.bool,
			website: PropTypes.string.isRequired,
			summary: PropTypes.string.isRequired,
			type: PropTypes.oneOf([WORK]).isRequired
		}),

		// education career object shape
		PropTypes.shape({
			institution: PropTypes.string.isRequired,
			area: PropTypes.string.isRequired,
			studyType: PropTypes.string.isRequired,
			gpa: PropTypes.string.isRequired,
			courses: PropTypes.arrayOf(
				PropTypes.shape({
					category: PropTypes.string.isRequired,
					courses: PropTypes.arrayOf(PropTypes.string).isRequired
				})
			).isRequired,
			type: PropTypes.oneOf([EDUCATION]).isRequired
		}),

		// volunteer career object shape
		PropTypes.shape({
			organization: PropTypes.string.isRequired,
			website: PropTypes.string.isRequired,
			summary: PropTypes.string.isRequired,
			type: PropTypes.oneOf([VOLUNTEER]).isRequired
		})
	]).isRequired,
	id: PropTypes.number.isRequired,
	isUpSm: PropTypes.bool.isRequired,
	startDate: PropTypes.string.isRequired,
	endDate: PropTypes.string.isRequired,
	careerTitle: PropTypes.string.isRequired,
	entityName: PropTypes.string.isRequired,
	careerHighlights: PropTypes.string.isRequired
};

function CareerItem({
	career,
	id,
	isUpSm,
	startDate,
	endDate,
	careerTitle,
	entityName,
	careerHighlights
}) {
	return (
		<Box
			flexDirection={isUpSm ? 'row' : 'column'}
			mb={isUpSm ? 0 : 6}
			clone
		>
			<TimelineItem>
				<TimelineOppositeContent>
					{isUpSm ? (
						<Fragment>
							<Typography variant="body1" color="textSecondary">
								{endDate}
							</Typography>
							<Typography variant="body1" color="textSecondary">
								{startDate}
							</Typography>
						</Fragment>
					) : (
						<Typography variant="body1" color="textSecondary">
							{startDate}-{endDate}
						</Typography>
					)}
				</TimelineOppositeContent>
				<Hidden xsDown>
					<TimelineSeparator>
						<CustomLink to="#career" hash smooth>
							<TimelineDot color="secondary">
								{icon(career)}
							</TimelineDot>
						</CustomLink>
						<TimelineConnector />
					</TimelineSeparator>
				</Hidden>
				<TimelineContent>
					<Card>
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								{careerTitle}
							</Typography>
							<Typography component="h3" variant="h5">
								{entityName}
							</Typography>
							<Box pb={1} clone>
								<Typography color="textSecondary">
									{careerHighlights}
								</Typography>
							</Box>
							{career.type !== EDUCATION && (
								<Box whiteSpace="pre-line" clone>
									<Typography component="p" variant="body2">
										{career.summary}
									</Typography>
								</Box>
							)}
							<Box mt={2}>
								<CareerItemButtonContainer
									link={career.website}
									courses={career.courses}
									id={id}
								>
									{career.type === EDUCATION
										? 'Voir les cours'
										: 'Voir le site'}
								</CareerItemButtonContainer>
							</Box>
						</CardContent>
					</Card>
				</TimelineContent>
			</TimelineItem>
		</Box>
	);
}

export default CareerItem;
