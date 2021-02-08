import React from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/styles';

import hero800w from '../assets/hero/hero-800w.png';
import hero1366w from '../assets/hero/hero-1366w.png';
import hero1440w from '../assets/hero/hero-1440w.png';
import hero1536w from '../assets/hero/hero-1536w.png';
import hero1920w from '../assets/hero/hero-1920w.png';
import hero2560w from '../assets/hero/hero-2560w.png';
import hero3768w from '../assets/hero/hero-3768w.png';

import { Box, Container, Typography } from '@material-ui/core';

// define the style of the component
const styles = theme => ({
	root: {
		backgroundImage: `url(${hero800w})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',

		// SEO optimization by loading a sized hero background image
		'@media (min-width: 800px)': {
			backgroundImage: `url(${hero1366w})`
		},

		'@media (min-width: 1366px)': {
			backgroundImage: `url(${hero1440w})`
		},

		'@media (min-width: 1440px)': {
			backgroundImage: `url(${hero1536w})`
		},

		'@media (min-width: 1536px)': {
			backgroundImage: `url(${hero1920w})`
		},

		'@media (min-width: 1920px)': {
			backgroundImage: `url(${hero2560w})`
		},

		'@media (min-width: 2560px)': {
			backgroundImage: `url(${hero3768w})`
		}
	},
	// filter the hero background to match the theme
	filter: {
		backgroundColor: `${theme.palette.background.default}66`
	}
});

// configure the prop types validation
Hero.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
};

function Hero({ classes, title, description }) {
	return (
		<Box
			component="header"
			width="100%"
			height="100vh"
			className={classes.root}
		>
			<Box width="100%" height="100%" className={classes.filter}>
				<Container fixed>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="flex-end"
						height="50vh"
					>
						<Typography component="h1" align="center">
							<Box
								component="span"
								fontFamily="monospace"
								fontSize="10vh"
							>
								{title}
							</Box>
						</Typography>
					</Box>
					<Typography component="h2" align="center">
						<Box
							component="span"
							fontFamily="monospace"
							fontSize="3.5vh"
						>
							{description}
						</Box>
					</Typography>
				</Container>
			</Box>
		</Box>
	);
}

export default withStyles(styles)(Hero);
