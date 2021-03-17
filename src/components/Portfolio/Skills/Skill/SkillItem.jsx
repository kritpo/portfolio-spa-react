import React from 'react';
import { PropTypes } from 'prop-types';

import { Box, LinearProgress } from '@material-ui/core';
import CustomIcon from '../../../../utils/icons/CustomIcon';

// setup skill level constants
export const LEVEL = ['Novice', 'Intermédiaire', 'Avancé', 'Maîtrise'];

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
