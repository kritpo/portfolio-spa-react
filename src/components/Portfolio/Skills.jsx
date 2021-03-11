import React from 'react';
import { PropTypes } from 'prop-types';

import { Grid, Box } from '@material-ui/core';

import SkillContainer from '../../containers/Portfolio/Skills/SkillContainer';
import Languages from './Skills/Languages';
import Hobbies from './Skills/Hobbies';

// configure the prop types validation
Skills.propTypes = {
	skills: PropTypes.arrayOf(PropTypes.object).isRequired,
	languages: PropTypes.arrayOf(PropTypes.object).isRequired,
	interests: PropTypes.arrayOf(PropTypes.object).isRequired
};

function Skills({ skills, languages, interests }) {
	return (
		<Box textAlign="center" clone>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<SkillContainer skills={skills} />
				</Grid>
				<Grid item xs={12} md={6}>
					<Languages languages={languages} />
				</Grid>
				<Grid item xs={12} md={6}>
					<Hobbies interests={interests} />
				</Grid>
			</Grid>
		</Box>
	);
}

export default Skills;
