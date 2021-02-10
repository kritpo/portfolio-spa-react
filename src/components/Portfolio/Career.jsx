import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { useTheme } from '@material-ui/core/styles';

import { HashLink } from 'react-router-hash-link';

import {
	Box,
	Grid,
	Button,
	Typography,
	useMediaQuery
} from '@material-ui/core';
import { ArrowUpward, Star } from '@material-ui/icons';
import {
	Timeline,
	TimelineItem,
	TimelineContent,
	TimelineSeparator,
	TimelineConnector,
	TimelineDot
} from '@material-ui/lab';

import CareerItem, { WORK, EDUCATION, VOLUNTEER } from './Career/CareerItem';

// configure the prop types validation
Career.propTypes = {
	careers: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.oneOf([WORK, EDUCATION, VOLUNTEER]).isRequired
		})
	).isRequired,
	showWork: PropTypes.bool.isRequired,
	workToggle: PropTypes.func.isRequired,
	showEducation: PropTypes.bool.isRequired,
	educationToggle: PropTypes.func.isRequired,
	showVolunteer: PropTypes.bool.isRequired,
	volunteerToggle: PropTypes.func.isRequired
};

function Career({
	careers,
	showWork,
	workToggle,
	showEducation,
	educationToggle,
	showVolunteer,
	volunteerToggle
}) {
	// setup the breakpoints matchers hooks
	const theme = useTheme();
	const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

	// convert careers details to React component
	const careerList = careers.map(career => (
		<CareerItem career={career} id={career.id} key={career.id} />
	));

	return (
		<Fragment>
			<Box textAlign="center" clone>
				<Typography component="h3" variant="h4" gutterBottom>
					Mon parcours
				</Typography>
			</Box>
			<Grid container spacing={2} justify="center">
				<Grid item>
					<Button
						variant="contained"
						color={showWork ? 'default' : 'primary'}
						disableElevation={showWork}
						onClick={workToggle}
					>
						Professionnel
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color={showEducation ? 'default' : 'primary'}
						disableElevation={showEducation}
						onClick={educationToggle}
					>
						Scolaire
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color={showVolunteer ? 'default' : 'primary'}
						disableElevation={showVolunteer}
						onClick={volunteerToggle}
					>
						Associatif
					</Button>
				</Grid>
			</Grid>
			<Timeline align={isUpMd ? 'alternate' : 'left'}>
				{careerList.length > 0 ? (
					careerList
				) : (
					<TimelineItem>
						<TimelineSeparator>
							<HashLink to="#career">
								<TimelineDot color="primary">
									<Star />
								</TimelineDot>
							</HashLink>
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
						<HashLink to="#career">
							<TimelineDot color="primary">
								<ArrowUpward />
							</TimelineDot>
						</HashLink>
					</TimelineSeparator>
					<TimelineContent />
				</TimelineItem>
			</Timeline>
		</Fragment>
	);
}

export default Career;
