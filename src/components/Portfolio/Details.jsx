import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';
import ReactCountryFlag from 'react-country-flag';

import {
	Avatar,
	Box,
	Button,
	Grid,
	Paper,
	Typography
} from '@material-ui/core';

import languages from '../../utils/languages';
import SocialNetwork from './Details/SocialNetwork';

/**
 * convert profiles details to React component
 * @param {array} profiles the list of profiles data
 * @returns the components array
 */
const socialNetwork = profiles =>
	profiles.map((profile, index) => (
		<SocialNetwork profile={profile} key={index} />
	));

// configure the prop types validation
Details.propTypes = {
	basics: PropTypes.shape({
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		phone: PropTypes.string.isRequired,
		location: PropTypes.shape({
			address: PropTypes.string.isRequired,
			postalCode: PropTypes.string.isRequired,
			city: PropTypes.string.isRequired,
			region: PropTypes.string.isRequired,
			countryCode: PropTypes.string.isRequired
		}).isRequired,
		profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
		summary: PropTypes.string.isRequired,
		website: PropTypes.string.isRequired
	}).isRequired,
	isMain: PropTypes.bool.isRequired,
	imageUrl: PropTypes.string.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function Details({
	basics: {
		name,
		email,
		phone,
		location: { address, postalCode, city, region, countryCode },
		profiles,
		summary,
		website
	},
	isMain,
	imageUrl,
	language: { systemLanguageCode }
}) {
	return (
		<Fragment>
			<Box textAlign="center" clone>
				<Typography component="h3" variant="h4" gutterBottom>
					{languages[systemLanguageCode].portfolio.details.title}
				</Typography>
			</Box>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6} lg={4}>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						textAlign="center"
						height="100%"
					>
						<Box mb={2} clone>
							<Avatar
								alt={name}
								src={imageUrl}
								style={{ height: '20vh', width: '20vh' }}
							/>
						</Box>
						<Box mb={2}>
							<Typography variant="h5">{name}</Typography>
						</Box>
						<Box mb={2}>
							<Typography variant="body1">{email}</Typography>
							<Typography variant="body1">{phone}</Typography>
						</Box>
						<Box mb={2}>
							<Typography variant="body1">{address}</Typography>
							<Typography variant="body1">
								{`${postalCode}, ${city}, ${region}, `}
								<ReactCountryFlag
									countryCode={countryCode}
									svg
								/>
								{` ${countryCode}`}
							</Typography>
						</Box>
						<Grid container spacing={2} justify="center">
							{socialNetwork(profiles)}
						</Grid>
					</Box>
				</Grid>
				<Grid item xs={12} md={6} lg={8}>
					<Box p={2} clone>
						<Paper elevation={4}>
							<Box whiteSpace="pre-line" clone>
								<Typography variant="body2">
									{summary}
								</Typography>
							</Box>
							{!isMain && website && website !== '' && (
								<Box mt={2}>
									<Button
										size="large"
										href={website}
										target="_blank"
									>
										{
											languages[systemLanguageCode]
												.portfolio.details.goToWebsite
										}
									</Button>
								</Box>
							)}
						</Paper>
					</Box>
				</Grid>
			</Grid>
		</Fragment>
	);
}

export default Details;
