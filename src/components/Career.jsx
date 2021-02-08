import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { useTheme } from '@material-ui/core/styles';

import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { ArrowUpward, Star } from '@material-ui/icons';
import {
	Timeline,
	TimelineItem,
	TimelineContent,
	TimelineSeparator,
	TimelineConnector,
	TimelineDot
} from '@material-ui/lab';

import CareerItem, { WORK, EDUCATION, VOLUNTEER } from './CareerItem';

// configure the prop types validation
Career.propTypes = {
	careers: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.oneOf([WORK, EDUCATION, VOLUNTEER]).isRequired
		})
	).isRequired
};

function Career({ careers }) {
	// setup the breakpoints matchers hooks
	const theme = useTheme();
	const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

	// convert careers details to React component
	const careerList = careers.map((career, index) => (
		<CareerItem career={career} id={index} key={index} />
	));

	return (
		<Fragment>
			<Box textAlign="center" clone>
				<Typography component="h3" variant="h4" gutterBottom>
					Mon parcours
				</Typography>
			</Box>
			<Timeline align={isUpMd ? 'alternate' : 'left'}>
				{careerList.length > 0 ? (
					careerList
				) : (
					<TimelineItem>
						<TimelineSeparator>
							<TimelineDot color="primary">
								<Star />
							</TimelineDot>
							<TimelineConnector />
						</TimelineSeparator>
						<Box mt={1} clone>
							<TimelineContent>
								<Typography variant="body1">
									Aucun élément à afficher
								</Typography>
							</TimelineContent>
						</Box>
					</TimelineItem>
				)}
				<TimelineItem>
					<TimelineSeparator>
						<TimelineDot color="primary">
							<ArrowUpward />
						</TimelineDot>
					</TimelineSeparator>
					<TimelineContent />
				</TimelineItem>
			</Timeline>
		</Fragment>
	);
}

export default Career;
