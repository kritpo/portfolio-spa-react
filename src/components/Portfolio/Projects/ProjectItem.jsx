import React from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/styles';

import {
	Box,
	Grid,
	Card,
	CardContent,
	Typography,
	ButtonBase
} from '@material-ui/core';

import CustomIcon from '../../../utils/icons/CustomIcon';

/**
 * define the style of the component
 * @param {object} theme the current applied theme
 * @returns the style object
 */
const styles = ({
	palette: {
		background: { default: defaultBG }
	},
	transitions
}) => ({
	root: {
		'&:hover $mask': {
			opacity: 0.75
		}
	},
	image: {
		backgroundImage: ({ project: { picture } }) => `url(${picture})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover'
	},
	mask: {
		backgroundColor: defaultBG,
		opacity: 0.95,
		transition: transitions.create('opacity')
	},
	card: {
		backgroundColor: 'inherit'
	}
});

/**
 * convert technologies details to React component
 * @param {array} technologies the list of technologies data
 * @returns the components array
 */
const technologiesList = technologies =>
	technologies.map((technology, index) => (
		<CustomIcon technology={technology} key={index} />
	));

// configure the prop types validation
ProjectItem.propTypes = {
	project: PropTypes.shape({
		name: PropTypes.string.isRequired,
		summary: PropTypes.string.isRequired,
		picture: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		technologies: PropTypes.arrayOf(PropTypes.string).isRequired
	}).isRequired,
	startDate: PropTypes.string.isRequired,
	endDate: PropTypes.string.isRequired
};

function ProjectItem({
	classes: { root, image, mask, card },
	project: { name, summary, url, technologies },
	startDate,
	endDate
}) {
	return (
		<Grid item xs={12} sm={6} md={4}>
			<Box width="100%" clone>
				<ButtonBase href={url} target="_blank" className={root}>
					<Box
						position="absolute"
						width="100%"
						height="100%"
						className={image}
					/>
					<Box
						position="absolute"
						width="100%"
						height="100%"
						className={mask}
					/>
					<Box zIndex="1" width="100%" className={card} clone>
						<Card>
							<CardContent>
								<Typography color="textSecondary" gutterBottom>
									{startDate}-{endDate}
								</Typography>
								<Typography component="h3" variant="h5">
									{name}
								</Typography>
								<Box whiteSpace="pre-line" clone>
									<Typography component="p" variant="body2">
										{summary}
									</Typography>
								</Box>
								<Box mt={2}>
									{technologiesList(technologies)}
								</Box>
							</CardContent>
						</Card>
					</Box>
				</ButtonBase>
			</Box>
		</Grid>
	);
}

export default withStyles(styles)(ProjectItem);