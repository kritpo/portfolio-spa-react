import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

import { Box, Container, Paper, Typography } from '@material-ui/core';

import { HOME, SIGN_IN, SIGN_UP_CONFIRM } from '../routes';
import CustomLink from '../utils/CustomLink';
import Form from '../utils/forms/Form';
import languages from '../utils/languages';
import Header from './Header';

// configure the prop types validation
SignUp.propTypes = {
	data: PropTypes.array.isRequired,
	template: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function SignUp({
	data,
	template,
	onSubmit,
	language: { systemLanguageCode }
}) {
	return (
		<Fragment>
			<Header
				title={languages[systemLanguageCode].pages.signUp}
				history={[
					{
						link: HOME,
						title: languages[systemLanguageCode].pages.home
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
							{languages[systemLanguageCode].pages.signUp}
						</Typography>
						<Form
							data={data}
							template={template}
							onSubmit={onSubmit}
							action={languages[systemLanguageCode].signUp.action}
							errorMessage={
								languages[systemLanguageCode].signUp.error
							}
							sendingMessage={
								languages[systemLanguageCode].generic
									.sendingMessage
							}
							sendedMessage={
								languages[systemLanguageCode].generic
									.sendedMessage
							}
						>
							{
								languages[systemLanguageCode].signUp
									.alreadyRegistered
							}
							<br />
							<CustomLink to={SIGN_IN}>
								{languages[systemLanguageCode].signUp.goSignIn}
							</CustomLink>
							<br />
							<CustomLink to={SIGN_UP_CONFIRM}>
								{
									languages[systemLanguageCode].signUp
										.goSignInConfirm
								}
							</CustomLink>
						</Form>
					</Paper>
				</Box>
			</Container>
		</Fragment>
	);
}

export default SignUp;
