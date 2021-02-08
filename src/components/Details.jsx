import React, { Fragment } from 'react';

import {
	Box,
	Grid,
	Paper,
	Button,
	Typography,
	Avatar
} from '@material-ui/core';

import CustomIcon from './tools/CustomIcon';

function Details({ resume }) {
	// convert profiles details to React component
	const socialNetwork = resume.resume.basics.profiles.map(
		(profile, index) => (
			<Grid item xs={6} sm={4} key={index}>
				<Button href={profile.url} target="_blank">
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
					>
						<CustomIcon social={profile.network} />
						<Typography variant="body1" noWrap>
							{profile.username}
						</Typography>
					</Box>
				</Button>
			</Grid>
		)
	);

	return (
		<Fragment>
			<Typography component="h3" variant="h4" gutterBottom>
				Ma présentation
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6} lg={4}>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						height="100%"
					>
						<Box mb={2} height="10vh" width="10vh" clone>
							<Avatar
								alt={`Portfolio de ${resume.resume.basics.name}`}
								src={resume.resume.basics.picture}
							/>
						</Box>
						<Box mb={2}>
							<Typography variant="h5">
								{resume.resume.basics.name}
							</Typography>
						</Box>
						<Box mb={2}>
							<Typography variant="body1">
								{resume.resume.basics.email}
							</Typography>
							<Typography variant="body1">
								{resume.resume.basics.phone}
							</Typography>
						</Box>
						<Box mb={2}>
							<Typography variant="body1">
								{resume.resume.basics.location.address}
							</Typography>
							<Typography variant="body1">
								{`${resume.resume.basics.location.postalCode}, ${resume.resume.basics.location.city}, ${resume.resume.basics.location.region}, ${resume.resume.basics.location.countryCode}`}
							</Typography>
						</Box>
						<Grid container spacing={2} justify="center">
							{socialNetwork}
						</Grid>
					</Box>
				</Grid>
				<Grid item xs={12} md={6} lg={8}>
					<Box p={2} clone>
						<Paper elevation={4}>
							<Box whiteSpace="pre-line" clone>
								<Typography variant="body2">
									{resume.resume.basics.summary}
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
