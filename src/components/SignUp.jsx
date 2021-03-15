import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { HOME, SIGN_IN, SIGN_UP_CONFIRM } from '../routes';

import { Container, Box, Paper, Typography } from '@material-ui/core';

import Form from '../utils/forms/Form';
import Header from './Header';
import CustomLink from '../utils/CustomLink';

// configure the prop types validation
SignUp.propTypes = {
	data: PropTypes.array.isRequired,
	template: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired
};

function SignUp({ data, template, onSubmit }) {
	return (
		<Fragment>
			<Header
				title="Inscription"
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
							Inscription
						</Typography>
						<Form
							data={data}
							template={template}
							onSubmit={onSubmit}
							errorMessage="Une erreur inattendue est survenue. Veuillez réessayer ultérieurement."
							action="Inscription"
						>
							Déjà inscrit ?
							<br />
							<CustomLink to={SIGN_IN}>Connectez vous</CustomLink>
							<br />
							<CustomLink to={SIGN_UP_CONFIRM}>
								Confirmez votre inscription
							</CustomLink>
						</Form>
					</Paper>
				</Box>
			</Container>
		</Fragment>
	);
}

export default SignUp;
