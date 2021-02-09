import React, { useState, Fragment } from 'react';
import { PropTypes } from 'prop-types';

import {
	Box,
	Grid,
	Collapse,
	LinearProgress,
	Typography,
	IconButton
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

import CustomIcon from './tools/CustomIcon';

// configure the prop types validation
Skill.propTypes = {
	resume: PropTypes.shape({
		skills: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				level: PropTypes.string.isRequired,
				keywords: PropTypes.arrayOf(PropTypes.string).isRequired
			})
		).isRequired
	}).isRequired
};

function Skill({ resume }) {
	// setup the collapse status hook
	const [openCollapse, setOpenCollapse] = useState(false);

	// setup the toggle handler
	const collapseToggle = state => {
		setOpenCollapse(!openCollapse);
	};

	// convert skills details to React component
	const skills = resume.skills.map((skill, index) => (
		<Box display="flex" alignItems="center" mt={2} key={index}>
			<CustomIcon technology={skill.name} />
			<Box ml={2} width="100%">
				<LinearProgress
					variant="determinate"
					value={
						skill.level === 'Maîtrise'
							? 95
							: skill.level === 'Avancé'
							? 75
							: skill.level === 'Intermédiaire'
							? 50
							: 25
					}
				/>
			</Box>
		</Box>
	));

	return (
		<Grid item xs={12}>
			<Typography component="h3" variant="h4" gutterBottom>
				Mes compétences
			</Typography>
			{skills.slice(0, 8)}
			{skills.length > 8 && (
				<Fragment>
					<Box textAlign="center">
						<IconButton onClick={collapseToggle}>
							{openCollapse ? <ExpandLess /> : <ExpandMore />}
						</IconButton>
					</Box>
					<Collapse in={openCollapse} timeout="auto" unmountOnExit>
						{skills.slice(8)}
					</Collapse>
				</Fragment>
			)}
		</Grid>
	);
}

export default Skill;
