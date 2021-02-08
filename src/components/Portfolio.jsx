import React, { Fragment } from 'react';

import { Box, Container, Paper, IconButton } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import Loading from '../components/Loading';
import Error from '../components/Error';
import HeroContainer from '../containers/HeroContainer';

function Portfolio({ resume }) {
	return (
		<Fragment>
			<HeroContainer />
			<Box component="main" mt={-8} p={2}>
				<Container fixed>
					<Box px={2} pb={2} clone>
						<Paper>
							<Box mb={2} textAlign="center">
								<IconButton>
									<ExpandMore />
								</IconButton>
							</Box>
							{resume.isLoading ? (
								<Loading size="40vh" />
							) : resume.error !== null ? (
								<Error size="40vh">
									Impossible de charger les données
								</Error>
							) : (
								<Box textAlign="center">Hello World!</Box>
							)}
						</Paper>
					</Box>
				</Container>
			</Box>
		</Fragment>
	);
}

export default Portfolio;
