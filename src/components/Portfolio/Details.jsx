import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import {
	Box,
	Grid,
	Paper,
	Button,
	Typography,
	Avatar
} from '@material-ui/core';

import CustomIcon from '../../utils/icons/CustomIcon';

/**
 * convert profiles details to React component
 * @param {array} profiles the list of profiles data
 * @returns the components array
 */
const socialNetwork = profiles =>
	profiles.map(({ url, network, username }, index) => (
		<Grid item xs={6} sm={4} key={index}>
			<Button href={url} target="_blank">
				<Box display="flex" flexDirection="column" alignItems="center">
					<CustomIcon social={network} />
					<Typography
						variant="body1"
						style={{ textTransform: 'none' }}
						noWrap
					>
						{username}
					</Typography>
				</Box>
			</Button>
		</Grid>
	));

// configure the prop types validation
Details.propTypes = {
	resume: PropTypes.shape({
		basics: PropTypes.shape({
			name: PropTypes.string.isRequired,
			picture: PropTypes.string.isRequired,
			email: PropTypes.string.isRequired,
			phone: PropTypes.string.isRequired,
			website: PropTypes.string.isRequired,
			summary: PropTypes.string.isRequired,
			location: PropTypes.shape({
				address: PropTypes.string.isRequired,
				postalCode: PropTypes.string.isRequired,
				city: PropTypes.string.isRequired,
				countryCode: PropTypes.string.isRequired,
				region: PropTypes.string.isRequired
			}).isRequired,
			profiles: PropTypes.arrayOf(
				PropTypes.shape({
					network: PropTypes.string.isRequired,
					username: PropTypes.string.isRequired,
					url: PropTypes.string.isRequired
				})
			).isRequired
		}).isRequired
	}).isRequired
};

function Details({
	resume: {
		basics: {
			name,
			picture,
			email,
			phone,
			location: { address, postalCode, city, region, countryCode },
			profiles,
			summary
		}
	}
}) {
	return (
		<Fragment>
			<Box textAlign="center" clone>
				<Typography component="h3" variant="h4" gutterBottom>
					Ma présentation
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
								alt={`Portfolio de ${name}`}
								src={picture}
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
								{`${postalCode}, ${city}, ${region}, ${countryCode}`}
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
						</Paper>
					</Box>
				</Grid>
			</Grid>
		</Fragment>
	);
}

export default Details;
