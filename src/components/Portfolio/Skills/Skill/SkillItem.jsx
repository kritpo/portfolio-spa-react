import { PropTypes } from 'prop-types';
import React from 'react';

import { Box, LinearProgress } from '@material-ui/core';

import CustomIcon from '../../../../utils/icons/CustomIcon';

// setup the skill level contant
export const LEVEL = ['Novice', 'Intermediate', 'Advanced', 'Master'];

// configure the prop types validation
SkillItem.propTypes = {
	skill: PropTypes.shape({
		name: PropTypes.string.isRequired,
		level: PropTypes.string.isRequired
	}).isRequired
};

function SkillItem({ skill: { name, level } }) {
	return (
		<Box display="flex" alignItems="center" mt={2}>
			<CustomIcon technology={name} />
			<Box ml={2} width="100%">
				<LinearProgress
					aria-label={name}
					variant="determinate"
					value={
						level === LEVEL[3]
							? 98
							: level === LEVEL[2]
							? 90
							: level === LEVEL[1]
							? 75
							: 50
					}
				/>
			</Box>
		</Box>
	);
}

export default SkillItem;
