import React from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/styles';

import hero800w from '../../assets/hero/hero-800w.png';
import hero1366w from '../../assets/hero/hero-1366w.png';
import hero1440w from '../../assets/hero/hero-1440w.png';
import hero1536w from '../../assets/hero/hero-1536w.png';
import hero1920w from '../../assets/hero/hero-1920w.png';
import hero2560w from '../../assets/hero/hero-2560w.png';
import hero3768w from '../../assets/hero/hero-3768w.png';

import webpHero800w from '../../assets/hero/hero-800w.webp';
import webpHero1366w from '../../assets/hero/hero-1366w.webp';
import webpHero1440w from '../../assets/hero/hero-1440w.webp';
import webpHero1536w from '../../assets/hero/hero-1536w.webp';
import webpHero1920w from '../../assets/hero/hero-1920w.webp';
import webpHero2560w from '../../assets/hero/hero-2560w.webp';
import webpHero3768w from '../../assets/hero/hero-3768w.webp';

import { Box, Container, Typography } from '@material-ui/core';

/**
 * define the style of the component
 * @param {object} theme the current applied theme
 * @returns the style object
 */
const styles = ({
	palette: {
		background: { default: defaultBG }
	}
}) => ({
	root: {
		backgroundImage: ({ webpSupport }) =>
			webpSupport ? `url(${webpHero800w})` : `url(${hero800w})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',

		// SEO optimization by loading a sized hero background image
		'@media (min-width: 800px)': {
			backgroundImage: ({ webpSupport }) =>
				webpSupport ? `url(${webpHero1366w})` : `url(${hero1366w})`
		},

		'@media (min-width: 1366px)': {
			backgroundImage: ({ webpSupport }) =>
				webpSupport ? `url(${webpHero1440w})` : `url(${hero1440w})`
		},

		'@media (min-width: 1440px)': {
			backgroundImage: ({ webpSupport }) =>
				webpSupport ? `url(${webpHero1536w})` : `url(${hero1536w})`
		},

		'@media (min-width: 1536px)': {
			backgroundImage: ({ webpSupport }) =>
				webpSupport ? `url(${webpHero1920w})` : `url(${hero1920w})`
		},

		'@media (min-width: 1920px)': {
			backgroundImage: ({ webpSupport }) =>
				webpSupport ? `url(${webpHero2560w})` : `url(${hero2560w})`
		},

		'@media (min-width: 2560px)': {
			backgroundImage: ({ webpSupport }) =>
				webpSupport ? `url(${webpHero3768w})` : `url(${hero3768w})`
		}
	},
	// filter the hero background to match the theme
	filter: {
		backgroundColor: `${defaultBG}66`
	}
});

// configure the prop types validation
Hero.propTypes = {
	title: PropTypes.string.isRequired,
	titleCursor: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	descriptionCursor: PropTypes.string.isRequired
};

function Hero({
	classes: { root, filter },
	title,
	titleCursor,
	description,
	descriptionCursor
}) {
	return (
		<Box component="header" width="100%" height="100vh" className={root}>
			<Box width="100%" height="100%" className={filter}>
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
								{titleCursor}
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
							{descriptionCursor}
						</Box>
					</Typography>
				</Container>
			</Box>
		</Box>
	);
}

export default withStyles(styles)(Hero);
