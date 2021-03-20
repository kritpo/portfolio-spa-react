import { Box, Button, Grid, Typography } from '@material-ui/core';
import { ArrowUpward, Star } from '@material-ui/icons';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@material-ui/lab';
import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

import CareerItemContainer from '../../containers/Portfolio/Career/CareerItemContainer';
import CustomLink from '../../utils/CustomLink';
import languages from '../../utils/languages';
import { EDUCATION, VOLUNTEER, WORK } from './Career/CareerItem';

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
	isUpMd: PropTypes.bool.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function Career({
	careers,
	show,
	workToggle,
	educationToggle,
	volunteerToggle,
	allToggle,
	isUpMd,
	language: { systemLanguageCode }
}) {
	return (
		<Fragment>
			<Box textAlign="center" clone>
				<Typography component="h3" variant="h4" gutterBottom>
					{languages[systemLanguageCode].portfolio.career.title}
				</Typography>
			</Box>
			<Grid container spacing={2} justify="center">
				<Grid item>
					<Button
						variant="contained"
						color="primary"
						onClick={allToggle}
					>
						{
							languages[systemLanguageCode].portfolio.career.menu
								.invert
						}
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color={show[WORK] ? 'default' : 'primary'}
						disableElevation={show[WORK]}
						onClick={workToggle}
					>
						{
							languages[systemLanguageCode].portfolio.career.menu
								.work
						}
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color={show[EDUCATION] ? 'default' : 'primary'}
						disableElevation={show[EDUCATION]}
						onClick={educationToggle}
					>
						{
							languages[systemLanguageCode].portfolio.career.menu
								.education
						}
					</Button>
				</Grid>
				<Grid item>
					<Button
						variant="contained"
						color={show[VOLUNTEER] ? 'default' : 'primary'}
						disableElevation={show[VOLUNTEER]}
						onClick={volunteerToggle}
					>
						{
							languages[systemLanguageCode].portfolio.career.menu
								.volunteer
						}
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
									{
										languages[systemLanguageCode].portfolio
											.career.noElements
									}
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
