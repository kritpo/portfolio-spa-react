import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { HOME, SIGN_UP } from '../routes';

import { Container, Box, Paper, Typography } from '@material-ui/core';

import Form from '../utils/forms/Form';
import Header from './Header';
import CustomLink from '../utils/CustomLink';

// configure the prop types validation
SignIn.propTypes = {
	data: PropTypes.array.isRequired,
	template: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired
};

function SignIn({ data, template, onSubmit }) {
	return (
		<Fragment>
			<Header
				title="Connexion"
				history={[{ link: HOME, title: 'Accueil' }]}
			/>
			<Container component="main" fixed>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					p={2}
					clone
				>
					<Paper>
						<Typography component="h2" variant="h4">
							Connexion
						</Typography>
						<Form
							data={data}
							template={template}
							onSubmit={onSubmit}
							errorMessage="Une erreur inattendue est survenue. Vérifiez vos identifiants, sinon veuillez réessayer ultérieurement."
							action="Connexion"
						>
							<CustomLink to={SIGN_UP}>
								Pas encore inscrit ? Inscrivez-vous
							</CustomLink>
						</Form>
					</Paper>
				</Box>
			</Container>
		</Fragment>
	);
}

export default SignIn;
