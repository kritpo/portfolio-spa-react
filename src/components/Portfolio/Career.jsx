import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { WORK, EDUCATION, VOLUNTEER } from './Career/CareerItem';

import { Box, Grid, Button, Typography } from '@material-ui/core';
import { ArrowUpward, Star } from '@material-ui/icons';
import {
	Timeline,
	TimelineItem,
	TimelineContent,
	TimelineSeparator,
	TimelineConnector,
	TimelineDot
} from '@material-ui/lab';

import CustomLink from '../../utils/CustomLink';
import CareerItemContainer from '../../containers/Portfolio/Career/CareerItemContainer';

/**
 * convert careers details to React component
 * @param {array} careers the list of careers data
 * @returns the components array
 */
const careerList = careers =>
	careers.map(career => (
		<CareerItemContainer career={career} id={career.id} key={career.id} />
	));

// configure the prop types validation
Career.propTypes = {
	careers: PropTypes.arrayOf(PropTypes.object).isRequired,
	show: PropTypes.shape({
		[WORK]: PropTypes.bool.isRequired,
		[EDUCATION]: PropTypes.bool.isRequired,
		[VOLUNTEER]: PropTypes.bool.isRequired
	}).isRequired,
	workToggle: PropTypes.func.isRequired,
	educationToggle: PropTypes.func.isRequired,
	volunteerToggle: PropTypes.func.isRequired,
	allToggle: PropTypes.func.isRequired,
	isUpMd: PropTypes.bool.isRequired
};

function Career({
	careers,
	show,
	workToggle,
	educationToggle,
	volunteerToggle,
	allToggle,
	isUpMd
}) {
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
						color="primary"
						onClick={allToggle}
					>
						Inverser la sélection
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color={show[WORK] ? 'default' : 'primary'}
						disableElevation={show[WORK]}
						onClick={workToggle}
					>
						Professionnel
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color={show[EDUCATION] ? 'default' : 'primary'}
						disableElevation={show[EDUCATION]}
						onClick={educationToggle}
					>
						Scolaire
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color={show[VOLUNTEER] ? 'default' : 'primary'}
						disableElevation={show[VOLUNTEER]}
						onClick={volunteerToggle}
					>
						Associatif
					</Button>
				</Grid>
			</Grid>
			<Timeline align={isUpMd ? 'alternate' : 'left'}>
				{careers.length > 0 ? (
					careerList(careers)
				) : (
					<TimelineItem>
						<TimelineSeparator>
							<CustomLink to="#career" hash smooth>
								<TimelineDot color="primary">
									<Star />
								</TimelineDot>
							</CustomLink>
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
						<CustomLink to="#career" hash smooth>
							<TimelineDot color="primary">
								<ArrowUpward />
							</TimelineDot>
						</CustomLink>
					</TimelineSeparator>
					<TimelineContent />
				</TimelineItem>
			</Timeline>
		</Fragment>
	);
}

export default Career;
