import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

import {
	Box,
	Card,
	CardContent,
	Container,
	Link,
	Typography
} from '@material-ui/core';
import { Mail, Telegram } from '@material-ui/icons';

import { HOME } from '../routes';
import languages from '../utils/languages';
import Header from './Header';

// configure the prop types validation
Terms.propTypes = {
	language: PropTypes.shape({
		systemLanguageCode: PropTypes.string.isRequired
	}).isRequired
};

function Terms({ language: { systemLanguageCode } }) {
	return (
		<Fragment>
			<Header
				title={languages[systemLanguageCode].pages.terms}
				history={[
					{
						link: HOME,
						title: languages[systemLanguageCode].pages.home
					}
				]}
			/>
			<Container component="main" fixed>
				<Box mb={2} clone>
					<Card>
						<CardContent>
							<Typography component="h2" variant="h4">
								{
									languages[systemLanguageCode].terms.labels
										.editor
								}
							</Typography>
							<Typography variant="body2" component="p">
								Jimmy Weng
								<br />
								250, rue de Crimée
								<br />
								75019, Paris
								<br />
								France
								<br />
								<Mail fontSize="small" /> jimmy.weng@efrei.net
							</Typography>
						</CardContent>
					</Card>
				</Box>
				<Box mb={2} clone>
					<Card>
						<CardContent>
							<Typography component="h2" variant="h4">
								{
									languages[systemLanguageCode].terms.labels
										.hosting
								}
							</Typography>
							<Typography variant="body2" component="p">
								Amazon Web Services EMEA SARL
								<br />
								38, avenue John F. Kennedy
								<br />
								L-1855, Luxembourg
								<br />
								<Telegram fontSize="small" /> 352 2789 0057
							</Typography>
						</CardContent>
					</Card>
				</Box>
				<Box mb={2} clone>
					<Card>
						<CardContent>
							<Typography component="h2" variant="h4">
								{
									languages[systemLanguageCode].terms.labels
										.cookies
								}
							</Typography>
							<Typography variant="body2" component="p">
								{
									languages[systemLanguageCode].terms.content
										.cookies[0]
								}
								<br />
								<br />
								{
									languages[systemLanguageCode].terms.content
										.cookies[1]
								}
							</Typography>
						</CardContent>
					</Card>
				</Box>
				<Box mb={2} clone>
					<Card>
						<CardContent>
							<Typography component="h2" variant="h4">
								{
									languages[systemLanguageCode].terms.labels
										.privacy
								}
							</Typography>
							<Typography variant="body2" component="p">
								{
									languages[systemLanguageCode].terms.content
										.privacy[0]
								}
								<br />
								<br />
								{
									languages[systemLanguageCode].terms.content
										.privacy[1]
								}
								<br />
								<br />
								{
									languages[systemLanguageCode].terms.content
										.privacy[2]
								}
								<br />
								{
									languages[systemLanguageCode].terms.content
										.privacy[3]
								}
								<br />
								{
									languages[systemLanguageCode].terms.content
										.privacy[4]
								}
								<br />
								<br />
								{
									languages[systemLanguageCode].terms.content
										.privacy[5]
								}
								<br />
								{
									languages[systemLanguageCode].terms.content
										.privacy[6]
								}
								<br />
								{
									languages[systemLanguageCode].terms.content
										.privacy[7]
								}
								<br />
								{
									languages[systemLanguageCode].terms.content
										.privacy[8]
								}
								<br />
								{
									languages[systemLanguageCode].terms.content
										.privacy[9]
								}
							</Typography>
						</CardContent>
					</Card>
				</Box>
				<Box mb={2} clone>
					<Card>
						<CardContent>
							<Typography component="h2" variant="h4">
								{
									languages[systemLanguageCode].terms.labels
										.responsibilities
								}
							</Typography>
							<Typography variant="body2" component="p">
								{
									languages[systemLanguageCode].terms.content
										.responsibilities[0]
								}
							</Typography>
						</CardContent>
					</Card>
				</Box>
				<Box mb={2} clone>
					<Card>
						<CardContent>
							<Typography component="h2" variant="h4">
								{
									languages[systemLanguageCode].terms.labels
										.credits
								}
							</Typography>
							<Typography variant="body2" component="p">
								{
									languages[systemLanguageCode].terms.content
										.credits[0]
								}
								<br />
								<Link
									href="https://www.iconfinder.com/"
									target="_blank"
									rel="noreferrer noopener"
								>
									IconFinder
								</Link>{' '}
								{
									languages[systemLanguageCode].terms.content
										.credits[1]
								}
								<br />
								<Link
									href="https://devicon.dev/"
									target="_blank"
									rel="noreferrer noopener"
								>
									Devicon
								</Link>{' '}
								{
									languages[systemLanguageCode].terms.content
										.credits[2]
								}
								<br />
								<Link
									href="https://github.com/danalloway/react-country-flag"
									target="_blank"
									rel="noreferrer noopener"
								>
									react-country-flag
								</Link>{' '}
								{
									languages[systemLanguageCode].terms.content
										.credits[3]
								}
								<br />
							</Typography>
						</CardContent>
					</Card>
				</Box>
				<Card>
					<CardContent>
						<Typography component="h2" variant="h4">
							{
								languages[systemLanguageCode].terms.labels
									.jurisdiction
							}
						</Typography>
						<Typography variant="body2" component="p">
							{
								languages[systemLanguageCode].terms.content
									.jurisdiction[0]
							}
						</Typography>
					</CardContent>
				</Card>
			</Container>
		</Fragment>
	);
}

export default Terms;
