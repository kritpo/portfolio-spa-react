import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { HOME, SIGN_UP_CONFIRM } from '../routes';

import {
	Container,
	Box,
	Paper,
	Typography,
	TextField,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Checkbox,
	Button
} from '@material-ui/core';

import Header from './Header';
import Loading from '../utils/Loading';
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
						<Box
							display="flex"
							flexDirection="column"
							width="75%"
							minWidth="250px"
							maxWidth="400px"
							clone
						>
							<form noValidate autoComplete="off">
								<Box mb={2}>
									<TextField
										id={USERNAME}
										label="Pseudo"
										placeholder="dupont"
										value={form[USERNAME].value}
										helperText={form[USERNAME].error}
										onChange={handleForm.onChange(USERNAME)}
										onBlur={handleForm.onBlur(USERNAME)}
										error={form[USERNAME].error !== ''}
										fullWidth
										required
									/>
								</Box>
								<Box mb={2}>
									<TextField
										id={EMAIL}
										type="email"
										label="Adresse mail"
										placeholder="dupont@gmail.com"
										value={form[EMAIL].value}
										helperText={form[EMAIL].error}
										onChange={handleForm.onChange(EMAIL)}
										onBlur={handleForm.onBlur(EMAIL)}
										error={form[EMAIL].error !== ''}
										fullWidth
										required
									/>
								</Box>
								<Box mb={2}>
									<TextField
										id={PASSWORD}
										type="password"
										label="Mot de passe"
										placeholder="Mot de passe"
										value={form[PASSWORD].value}
										helperText={form[PASSWORD].error}
										onChange={handleForm.onChange(PASSWORD)}
										onBlur={handleForm.onBlur(PASSWORD)}
										error={form[PASSWORD].error !== ''}
										fullWidth
										required
									/>
								</Box>
								<Box mb={2}>
									<FormControl
										error={form[GDPR].error !== ''}
										required
									>
										<FormControlLabel
											control={
												<Checkbox
													color="primary"
													checked={form[GDPR].value}
													onChange={handleForm.onChange(
														GDPR,
														true
													)}
													required
												/>
											}
											label="J'ai pris connaissance et j'accepte sans réserves le traitement de mes données personnelles tel qu'énoncé dans les mentions légales."
										/>
										<FormHelperText>
											{form[GDPR].error}
										</FormHelperText>
									</FormControl>
								</Box>
								<FormControl error={error !== ''}>
									<Button
										variant="contained"
										color="primary"
										onClick={handleForm.onSubmit}
										disabled={form.sending}
									>
										Inscription
									</Button>
									<FormHelperText>{error}</FormHelperText>
								</FormControl>
								<Box mt={2} textAlign="center">
									{isSending && (
										<Box mb={2}>
											<Loading size="32px" />
											<Typography variant="body1">
												Envoi en cours...
											</Typography>
										</Box>
									)}
									<CustomLink to={SIGN_UP_CONFIRM}>
										Déjà inscrit? Confirmez votre
										inscription
									</CustomLink>
								</Box>
							</form>
						</Box>
					</Paper>
				</Box>
			</Container>
		</Fragment>
	);
}

export default SignUp;
