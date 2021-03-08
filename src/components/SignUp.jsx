import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { HOME, SIGN_IN, SIGN_UP_CONFIRM } from '../routes';

import { Container, Box, Paper, Typography } from '@material-ui/core';

import Form, {
	TEXT,
	EMAIL as EMAIL_TYPE,
	PASSWORD as PASSWORD_TYPE,
	CHECKBOX
} from '../utils/Form';
import Header from './Header';
import CustomLink from '../utils/CustomLink';

// setup field name constants
export const USERNAME = 'username';
export const EMAIL = 'email';
export const PASSWORD = 'password';
export const GDPR = 'gdpr';

// configure the prop types validation
SignUp.propTypes = {
	form: PropTypes.shape({
		[USERNAME]: PropTypes.shape({
			value: PropTypes.string.isRequired,
			error: PropTypes.string.isRequired,
			triggered: PropTypes.bool.isRequired
		}).isRequired,
		[EMAIL]: PropTypes.shape({
			value: PropTypes.string.isRequired,
			error: PropTypes.string.isRequired,
			triggered: PropTypes.bool.isRequired
		}).isRequired,
		[PASSWORD]: PropTypes.shape({
			value: PropTypes.string.isRequired,
			error: PropTypes.string.isRequired,
			triggered: PropTypes.bool.isRequired
		}).isRequired,
		[GDPR]: PropTypes.shape({
			value: PropTypes.bool.isRequired,
			error: PropTypes.string.isRequired,
			triggered: PropTypes.bool.isRequired
		}).isRequired
	}).isRequired,
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired
	}).isRequired,
	isSending: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired
};

function SignUp({ form, handleForm, isSending, error }) {
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
							fields={[
								{
									name: USERNAME,
									type: TEXT,
									label: 'Pseudo',
									placeholder: 'dupont'
								},
								{
									name: EMAIL,
									type: EMAIL_TYPE,
									label: 'Adresse mail',
									placeholder: 'dupont@gmail.com'
								},
								{
									name: PASSWORD,
									type: PASSWORD_TYPE,
									label: 'Mot de passe',
									placeholder: 'Mot de passe'
								},
								{
									name: GDPR,
									type: CHECKBOX,
									label:
										"J'ai pris connaissance et j'accepte sans réserves le traitement de mes données personnelles tel qu'énoncé dans les mentions légales."
								}
							]}
							form={form}
							handleForm={handleForm}
							action="Inscription"
							error={error}
							isSending={isSending}
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
