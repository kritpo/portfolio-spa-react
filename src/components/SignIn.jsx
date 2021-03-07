import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { HOME, SIGN_UP } from '../routes';

import {
	Container,
	Box,
	Paper,
	Typography,
	TextField,
	FormControl,
	FormHelperText,
	Button
} from '@material-ui/core';

import Header from './Header';
import Loading from '../utils/Loading';
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
		onBlur: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired
	}).isRequired,
	isSending: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired
};

function SignIn({ form, handleForm, isSending, error }) {
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
								<FormControl error={error !== ''}>
									<Button
										variant="contained"
										color="primary"
										onClick={handleForm.onSubmit}
										disabled={form.sending}
									>
										Connexion
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
									<CustomLink to={SIGN_UP}>
										Pas encore inscrit ? Inscrivez-vous
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

export default SignIn;
