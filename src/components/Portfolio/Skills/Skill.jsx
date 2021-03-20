import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import languages from '../../../utils/languages';

import { Box, Collapse, Typography, IconButton } from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';

import SkillItemContainer from '../../../containers/Portfolio/Skills/Skill/SkillItemContainer';

/**
 * convert skills details to React component
 * @param {array} skills the list of skills data
 * @param {number} start the start index
 * @param {number} end the end index
 * @returns the components array
 */
const skillsList = (skills, start, end) =>
	skills
		.slice(start, end)
		.map((skill, index) => (
			<SkillItemContainer skill={skill} key={index} />
		));

// configure the prop types validation
Skill.propTypes = {
	skills: PropTypes.arrayOf(PropTypes.object).isRequired,
	openCollapse: PropTypes.bool.isRequired,
	collapseToggle: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function Skill({
	skills,
	openCollapse,
	collapseToggle,
	language: { systemLanguageCode }
}) {
	return (
		<Fragment>
			<Typography component="h3" variant="h4" gutterBottom>
				{languages[systemLanguageCode].portfolio.skills.title}
			</Typography>
			{skills.length > 0 ? (
				<Fragment>
					{skillsList(skills, 0, 8)}
					{skills.length > 8 && (
						<Fragment>
							<Box textAlign="center">
								<IconButton onClick={collapseToggle}>
									{openCollapse ? (
										<ExpandLess />
									) : (
										<ExpandMore />
									)}
								</IconButton>
							</Box>
							<Collapse
								in={openCollapse}
								timeout="auto"
								unmountOnExit
							>
								{skillsList(skills, 8)}
							</Collapse>
						</Fragment>
					)}
				</Fragment>
			) : (
				<Typography variant="body1">
					{languages[systemLanguageCode].portfolio.skills.noElements}
				</Typography>
			)}
		</Fragment>
	);
}

export default Skill;
