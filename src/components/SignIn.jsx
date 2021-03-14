import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { TEXT, PASSWORD as PASSWORD_TYPE } from '../utils/Fields';
import { HOME, SIGN_UP } from '../routes';

import { Container, Box, Paper, Typography } from '@material-ui/core';

import Form from '../utils/Form';
import Header from './Header';
import CustomLink from '../utils/CustomLink';

// setup field name constants
export const USERNAME = 'username';
export const PASSWORD = 'password';

// configure the prop types validation
SignIn.propTypes = {
	form: PropTypes.shape({
		[USERNAME]: PropTypes.shape({
			value: PropTypes.string.isRequired,
			error: PropTypes.string.isRequired,
			triggered: PropTypes.bool.isRequired
		}).isRequired,
		[PASSWORD]: PropTypes.shape({
			value: PropTypes.string.isRequired,
			error: PropTypes.string.isRequired,
			triggered: PropTypes.bool.isRequired
		}).isRequired
	}).isRequired,
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired
	}).isRequired,
	handleSubmit: PropTypes.func.isRequired,
	isSending: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired
};

function SignIn({ form, handleForm, handleSubmit, isSending, error }) {
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
							fields={[
								{
									name: USERNAME,
									type: TEXT,
									label: 'Pseudo',
									placeholder: 'dupont'
								},
								{
									name: PASSWORD,
									type: PASSWORD_TYPE,
									label: 'Mot de passe',
									placeholder: 'Mot de passe'
								}
							]}
							form={form}
							handleForm={handleForm}
							handleSubmit={handleSubmit}
							action="Connexion"
							error={error}
							isSending={isSending}
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
