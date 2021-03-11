import React from 'react';
import { PropTypes } from 'prop-types';

import { Box, Grid, Typography } from '@material-ui/core';

import ProjectItemContainer from '../../containers/Portfolio/Projects/ProjectItemContainer';

/**
 * convert projects details to React component
 * @param {array} projects the list of projects data
 * @returns the components array
 */
const projectsList = projects =>
	projects.map((project, index) => (
		<ProjectItemContainer project={project} key={index} />
	));

// configure the prop types validation
Projects.propTypes = {
	projects: PropTypes.arrayOf(PropTypes.object).isRequired
};

function Projects({ projects }) {
	return (
		<Box textAlign="center">
			<Typography component="h3" variant="h4" gutterBottom>
				Mes projets
			</Typography>
			<Grid container spacing={2} justify="center">
				{projects.length > 0 ? (
					projectsList(projects)
				) : (
					<Typography variant="body1">Aucun projet</Typography>
				)}
			</Grid>
		</Box>
	);
}

export default Projects;
