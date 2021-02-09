import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { useTheme } from '@material-ui/core/styles';

import { HashLink } from 'react-router-hash-link';

import {
	Box,
	Card,
	CardContent,
	Typography,
	Hidden,
	useMediaQuery
} from '@material-ui/core';
import {
	TimelineItem,
	TimelineContent,
	TimelineOppositeContent,
	TimelineSeparator,
	TimelineConnector,
	TimelineDot
} from '@material-ui/lab';

import CustomIcon from '../../../tools/icons/CustomIcon';
import CareerItemButton from './CareerItemButton';

// setup career types constants
export const WORK = 'WORK';
export const VOLUNTEER = 'VOLUNTEER';
export const EDUCATION = 'EDUCATION';

// configure the prop types validation
CareerItem.propTypes = {
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
	]).isRequired,
	id: PropTypes.number.isRequired
};

function CareerItem({ career, id }) {
	// setup the breakpoints matchers hooks
	const theme = useTheme();
	const isUpSm = useMediaQuery(theme.breakpoints.up('sm'));

	// compute the dates
	const startDate = new Date(career.startDate).toLocaleDateString();
	const endDate =
		career.endDate !== undefined
			? new Date(career.endDate).toLocaleDateString()
			: 'Présent';

	// retrieve the good icon
	const icon = (
		<CustomIcon
			career={
				career.type !== WORK
					? career.type
					: career.position.includes('Stage')
					? 'Internship'
					: WORK
			}
		/>
	);

	// retrieve the title associated to the career item
	const careerTitle =
		career.type === EDUCATION
			? career.studyType
			: career.position.replace(/^\[.+?\]/, '');

	// retrieve the name of the career reference entity
	const entityName =
		career.type === WORK
			? career.company
			: career.type === EDUCATION
			? career.institution
			: career.organization;

	// retrieve the highlights elements associated to the career item
	const careerHighlights =
		career.type === EDUCATION
			? `${career.area} - GPA: ${career.gpa}`
			: career.highlights.join(' - ');

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
						<HashLink to="#career">
							<TimelineDot color="secondary">{icon}</TimelineDot>
						</HashLink>
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
								<CareerItemButton
									link={career.website}
									courses={career.courses}
									id={id}
								>
									{career.type === EDUCATION
										? 'Voir les cours'
										: 'Voir le site'}
								</CareerItemButton>
							</Box>
						</CardContent>
					</Card>
				</TimelineContent>
			</TimelineItem>
		</Box>
	);
}

export default CareerItem;
