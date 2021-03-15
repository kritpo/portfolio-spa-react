import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { HOME, SIGN_UP } from '../routes';

import { Container, Box, Paper, Typography, Button } from '@material-ui/core';

import Form from '../utils/forms/Form';
import Header from './Header';
import CustomLink from '../utils/CustomLink';

// configure the prop types validation
SignUpConfirm.propTypes = {
	data: PropTypes.array.isRequired,
	template: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired,
	resend: PropTypes.func.isRequired,
	resendWaitMessage: PropTypes.string.isRequired,
	resendErrorMessage: PropTypes.string.isRequired
};

function SignUpConfirm({
	data,
	template,
	onSubmit,
	setForm,
	resend,
	resendWaitMessage,
	resendErrorMessage
}) {
	return (
		<Fragment>
			<Header
				title="Confirmation d'inscription"
				history={[
					{ link: HOME, title: 'Accueil' },
					{ link: SIGN_UP, title: 'Inscription' }
				]}
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
							Confirmation d'inscription
						</Typography>
						<Form
							data={data}
							template={template(
								<Button
									color="primary"
									size="small"
									onClick={resend}
									disabled={resendWaitMessage !== ''}
								>
									{resendErrorMessage !== '' ? (
										<Typography color="error">
											{resendErrorMessage}
										</Typography>
									) : resendWaitMessage !== '' ? (
										resendWaitMessage
									) : (
										'Renvoyer'
									)}
								</Button>
							)}
							onSubmit={onSubmit}
							errorMessage="Une erreur inattendue est survenue. Vérifiez le code, sinon veuillez réessayer ultérieurement."
							action="Confirmer"
							setForm={setForm}
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

export default SignUpConfirm;
