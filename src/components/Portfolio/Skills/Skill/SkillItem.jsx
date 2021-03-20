import React from 'react';
import { PropTypes } from 'prop-types';

import languages from '../../../../utils/languages';

import { Box, LinearProgress } from '@material-ui/core';
import CustomIcon from '../../../../utils/icons/CustomIcon';

// configure the prop types validation
SkillItem.propTypes = {
	skill: PropTypes.shape({
		name: PropTypes.string.isRequired,
		level: PropTypes.string.isRequired
	}).isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function SkillItem({
	skill: { name, level },
	language: { systemLanguageCode }
}) {
	return (
		<Box display="flex" alignItems="center" mt={2}>
			<CustomIcon technology={name} />
			<Box ml={2} width="100%">
				<LinearProgress
					variant="determinate"
					value={
						level === languages[systemLanguageCode].generic.level[3]
							? 98
							: level ===
							  languages[systemLanguageCode].generic.level[2]
							? 90
							: level ===
							  languages[systemLanguageCode].generic.level[1]
							? 75
							: 50
					}
				/>
			</Box>
		</Box>
	);
}

export default SkillItem;
