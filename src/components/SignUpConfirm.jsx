import { Box, Button, Container, Paper, Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

import { HOME, SIGN_UP } from '../routes';
import CustomLink from '../utils/CustomLink';
import Form from '../utils/forms/Form';
import languages from '../utils/languages';
import Header from './Header';

// configure the prop types validation
SignUpConfirm.propTypes = {
	data: PropTypes.array.isRequired,
	template: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	setForm: PropTypes.func.isRequired,
	resend: PropTypes.func.isRequired,
	resendWaitMessage: PropTypes.string.isRequired,
	resendErrorMessage: PropTypes.string.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function SignUpConfirm({
	data,
	template,
	onSubmit,
	setForm,
	resend,
	resendWaitMessage,
	resendErrorMessage,
	language: { systemLanguageCode }
}) {
	return (
		<Fragment>
			<Header
				title={languages[systemLanguageCode].pages.signUpConfirm}
				history={[
					{
						link: HOME,
						title: languages[systemLanguageCode].pages.home
					},
					{
						link: SIGN_UP,
						title: languages[systemLanguageCode].pages.signUp
					}
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
							{languages[systemLanguageCode].pages.signUpConfirm}
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
										languages[systemLanguageCode]
											.signUpConfirm.resendCode.resend
									)}
								</Button>
							)}
							onSubmit={onSubmit}
							errorMessage={
								languages[systemLanguageCode].signUpConfirm
									.error
							}
							sendingMessage={
								languages[systemLanguageCode].generic
									.sendingMessage
							}
							action={
								languages[systemLanguageCode].signUpConfirm
									.action
							}
							setForm={setForm}
						>
							<CustomLink to={SIGN_UP}>
								{
									languages[systemLanguageCode].signUpConfirm
										.goSignUp
								}
							</CustomLink>
						</Form>
					</Paper>
				</Box>
			</Container>
		</Fragment>
	);
}

export default SignUpConfirm;
