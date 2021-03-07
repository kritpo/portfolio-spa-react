import React, { Fragment } from 'react';

import { HOME } from '../routes';

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
				history={[{ link: HOME, title: 'Accueil' }]}
			/>
			<Container component="main" fixed>
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
				<Box mb={2} clone>
					<Card>
						<CardContent>
							<Typography component="h2" variant="h4">
								Cookies
							</Typography>
							<Typography variant="body2" component="p">
								Dans le cadre de l'amélioration de l'expérience
								utilisateur de l'internaute, nous sommes
								contraints de faire usage de cookies. Ces
								cookies stockerons uniquement des données qui
								sont relatif à l'usage de ce site par
								l'internaute, tel que ses préférences, ses
								identifiants de connexion, etc... Ces derniers
								ne seront jamais utilisés à des fins
								commerciales.
								<br />
								<br />
								En poursuivant votre navigation, vous acceptez
								sans réserves que ces dits cookies soient fait
								usages.
							</Typography>
						</CardContent>
					</Card>
				</Box>
				<Box mb={2} clone>
					<Card>
						<CardContent>
							<Typography component="h2" variant="h4">
								Données personnelles
							</Typography>
							<Typography variant="body2" component="p">
								Pour toutes questions relatives aux données
								personnelles, veuillez vous addresser à
								l'éditeur de ce site.
								<br />
								<br />
								Dans un usage "visiteur", ce site web ne fera
								usage d'aucune données personnelles venant de
								l'internaute.
								<br />
								<br />
								Dans un usage "utilisateur", ce site web
								stockera un nom d'utilisateur, une adresse email
								et un mot de passe, qui seront utilisés pour
								pouvoir identifier de manière unique un
								internaute. Il sera ensuite libre à l'internaute
								de fournir un ou plusieurs CV qui seront dès
								lors également stockés par ce site.
								<br />
								Les informations identifiant distinctement un
								internaute, exit le mot de passe, ne seront
								accessible que par l'éditeur du site et sur
								decision de justice aux personnes habilitées par
								cette dite décision.
								<br />
								Les CV fournis par les internautes seront quant
								à eux disponible à consultation par tout
								internaute de ce site.
								<br />
								<br />
								La récupération et le stockage de ces données
								pré-citées sont obligatoires pour les finalités
								également pré-citées.
								<br />
								Le consentement de l'internaute sera
								explicitement récupéré dès l'inscription de
								l'internaute pour que puisse être effectué les
								stockages et traitements de données personnelles
								pré-citées.
								<br />
								Toutes ces données seront stockés dans les
								serveurs AWS en France, au Royaume-Uni et en
								Irlande.
								<br />
								En application de la RGPD (Règlement Général sur
								la Protection des Données), l'internaute dispose
								d'un droit d'accès, de rectification, de
								modification et de suppression pour toutes les
								données le concernant. Pour pouvoir exercer ce
								droit, l'internaute peut contacter directement
								l'éditeur de ce site, ou à défaut utiliser les
								moyens qui lui seront alors proposés pour
								procéder à l'action voulue.
								<br />
								L'internaute peut également exercer son droit à
								l'oubli en contactant directement l'éditeur de
								ce site et en formulant son désir d'exercer ce
								droit explicitement.
							</Typography>
						</CardContent>
					</Card>
				</Box>
				<Box mb={2} clone>
					<Card>
						<CardContent>
							<Typography component="h2" variant="h4">
								Responsabilités
							</Typography>
							<Typography variant="body2" component="p">
								Ce site décline toute responsabilités quant aux
								données et contenus sur les CV fournis par les
								internautes. L'internaute est responsable du
								contenu qu'il produit, l'éditeur de ce site est
								libre de bannir définitivement un utilisateur
								qui publierait du contenu inapproprié sur ce
								site.
							</Typography>
						</CardContent>
					</Card>
				</Box>
				<Box mb={2} clone>
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
								<Link
									href="https://devicon.dev/"
									target="_blank"
								>
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
								pour les icônes représentant les drapeaux des
								pays
								<br />
							</Typography>
						</CardContent>
					</Card>
				</Box>
				<Card>
					<CardContent>
						<Typography component="h2" variant="h4">
							Juridiction
						</Typography>
						<Typography variant="body2" component="p">
							Ce site web et tout son contenu est soumis aux lois
							françaises.
						</Typography>
					</CardContent>
				</Card>
			</Container>
		</Fragment>
	);
}

export default Terms;
