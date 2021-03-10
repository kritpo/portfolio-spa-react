import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { HOME, SIGN_UP } from '../routes';

import { Container, Box, Paper, Typography, Button } from '@material-ui/core';

import Form, { TEXT } from '../utils/Form';
import Header from './Header';
import CustomLink from '../utils/CustomLink';

// setup field name constants
export const USERNAME = 'username';
export const CODE = 'code';

// configure the prop types validation
SignUpConfirm.propTypes = {
	form: PropTypes.shape({
		[USERNAME]: PropTypes.shape({
			value: PropTypes.string.isRequired,
			error: PropTypes.string.isRequired,
			triggered: PropTypes.bool.isRequired
		}).isRequired,
		[CODE]: PropTypes.shape({
			value: PropTypes.string.isRequired,
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
	error: PropTypes.string.isRequired,
	resend: PropTypes.func.isRequired,
	resendWaitMessage: PropTypes.string.isRequired,
	resendErrorMessage: PropTypes.string.isRequired
};

function SignUpConfirm({
	form,
	handleForm,
	isSending,
	error,
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
							fields={[
								{
									name: USERNAME,
									type: TEXT,
									label: 'Pseudo',
									placeholder: 'dupont',
									InputProps: {
										endAdornment: (
											<Button
												color="primary"
												size="small"
												onClick={resend}
												disabled={
													resendWaitMessage !== ''
												}
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
										)
									}
								},
								{
									name: CODE,
									type: TEXT,
									label: 'Code de vérification',
									placeholder: '123456'
								}
							]}
							form={form}
							handleForm={handleForm}
							action="Confirmer"
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

export default SignUpConfirm;
