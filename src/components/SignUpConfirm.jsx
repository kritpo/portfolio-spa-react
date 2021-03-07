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
	error: PropTypes.string.isRequired
};

function SignUpConfirm({ form, handleForm, isSending, error }) {
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
										id={CODE}
										label="Code de vérification"
										placeholder="123456"
										value={form[CODE].value}
										helperText={form[CODE].error}
										onChange={handleForm.onChange(CODE)}
										onBlur={handleForm.onBlur(CODE)}
										error={form[CODE].error !== ''}
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
										Confirmer
									</Button>
									<FormHelperText>{error}</FormHelperText>
								</FormControl>
								{isSending && (
									<Box mt={2} textAlign="center">
										<Loading size="32px" />
										<Typography variant="body1">
											Envoi en cours...
										</Typography>
									</Box>
								)}
							</form>
						</Box>
					</Paper>
				</Box>
			</Container>
		</Fragment>
	);
}

export default SignUpConfirm;
