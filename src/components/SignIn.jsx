import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { HOME, SIGN_UP } from '../routes';
import languages from '../utils/languages';

import { Container, Box, Paper, Typography } from '@material-ui/core';

import Form from '../utils/forms/Form';
import Header from './Header';
import CustomLink from '../utils/CustomLink';

// configure the prop types validation
SignIn.propTypes = {
	data: PropTypes.array.isRequired,
	template: PropTypes.object.isRequired,
	onSubmit: PropTypes.func.isRequired,
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function SignIn({
	data,
	template,
	onSubmit,
	language: { systemLanguageCode }
}) {
	return (
		<Fragment>
			<Header
				title={languages[systemLanguageCode].pages.signIn}
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
							{languages[systemLanguageCode].pages.signIn}
						</Typography>
						<Form
							data={data}
							template={template}
							onSubmit={onSubmit}
							errorMessage={
								languages[systemLanguageCode].signIn.error
							}
							sendingMessage={
								languages[systemLanguageCode].generic
									.sendingMessage
							}
							action={languages[systemLanguageCode].signIn.action}
						>
							<CustomLink to={SIGN_UP}>
								{languages[systemLanguageCode].signIn.goSignUp}
							</CustomLink>
						</Form>
					</Paper>
				</Box>
			</Container>
		</Fragment>
	);
}

export default SignIn;
