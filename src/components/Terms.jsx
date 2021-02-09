import React, { Fragment } from 'react';

import {
	Container,
	Box,
	Card,
	CardContent,
	Link,
	Typography
} from '@material-ui/core';
import { Mail, Telegram } from '@material-ui/icons';

import Header from './Header';

function Terms() {
	return (
		<Fragment>
			<Header
				title="Mentions légales"
				history={[{ link: '/', title: 'Accueil' }]}
			/>
			<Container fixed>
				<Box mb={2} clone>
					<Card>
						<CardContent>
							<Typography component="h2" variant="h4">
								Éditeur
							</Typography>
							<Typography variant="body2" component="p">
								Jimmy Weng
								<br />
								250, rue de Crimée
								<br />
								75019, Paris
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
								Hébergeur
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
				<Card>
					<CardContent>
						<Typography component="h2" variant="h4">
							Crédits
						</Typography>
						<Typography variant="body2" component="p">
							Merci à :<br />
							<Link
								href="https://www.iconfinder.com/"
								target="_blank"
							>
								IconFinder
							</Link>{' '}
							pour la plupart des icônes présentes sur ce site
							<br />
							<Link href="https://devicon.dev/" target="_blank">
								Devicon
							</Link>{' '}
							pour les icônes relatives au développement et la
							programmation
							<br />
							<Link
								href="https://github.com/danalloway/react-country-flag"
								target="_blank"
							>
								react-country-flag
							</Link>{' '}
							pour les icônes représentant les drapeaux des pays
							<br />
						</Typography>
					</CardContent>
				</Card>
			</Container>
		</Fragment>
	);
}

export default Terms;
