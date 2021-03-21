// setup french translations
const fr = {
	generic: {
		loadingError: 'Impossible de charger les données.',
		formSendingMessage: 'Envoi en cours...'
	},
	pages: {
		home: 'Accueil',
		terms: 'Mentions légales',
		signIn: 'Connexion',
		signUp: 'Inscription',
		signUpConfirm: "Confirmation d'inscription",
		logout: 'Déconnexion',
		cvList: 'Liste des CVs',
		cvCreate: 'Créer un CV',
		cvUpdate: 'Modifier le CV'
	},
	footer: {
		credits: 'Réalisé par Jimmy Weng'
	},
	error401: {
		title: 'Erreur 401',
		message: 'Vous ne pouvez pas accéder à la page.'
	},
	error404: {
		title: 'Erreur 404',
		message: "La page que vous cherchez n'existe pas."
	},
	portfolio: {
		hero: {
			titleDefault: '<Jimmy Weng />',
			titleLoading: 'En chargement...',
			titleError: 'Erreur de chargement',
			descriptionDefault: 'Développeur Full-Stack',
			descriptionLoading: 'Patientez un moment...',
			descriptionError: "Le CV n'existe pas"
		},
		details: {
			label: 'Présentation',
			title: 'Ma présentation',
			goToWebsite: 'Aller sur mon site'
		},
		career: {
			label: 'Parcours',
			title: 'Mon parcours',
			noElements: 'Aucun élément à afficher',
			current: 'Présent',
			menu: {
				invert: 'Inverser la sélection',
				work: 'Professionnel',
				education: 'Scolaire',
				volunteer: 'Associatif',
				showCourses: 'Voir les cours',
				goToWebsite: 'Voir le site'
			}
		},
		projects: {
			label: 'Projets',
			title: 'Mes projets',
			current: 'Présent',
			noElements: 'Aucun projet'
		},
		skills: {
			label: 'Compétences',
			title: 'Mes compétences',
			noElements: 'Aucune compétences'
		},
		languages: {
			title: 'Langues',
			noElements: 'Aucune langue'
		},
		interests: {
			title: "Centre d'intérêts",
			noElements: "Aucun centre d'intérêts"
		},
		references: {
			label: 'Références',
			title: 'Mes références',
			noElements: 'Aucune référence'
		}
	},
	signIn: {
		username: {
			label: 'Pseudo',
			placeholder: 'dupont'
		},
		password: {
			label: 'Mot de passe',
			placeholder: 'Mot de passe'
		},
		action: 'Connexion',
		error: "L'identification a échoué. Vérifiez vos identifiants.",
		goSignUp: 'Pas encore inscrit ? Inscrivez-vous'
	},
	signUp: {
		username: {
			label: 'Pseudo',
			placeholder: 'dupont'
		},
		email: {
			label: 'Adresse mail',
			placeholder: 'dupont@gmail.com'
		},
		password: {
			label: 'Mot de passe',
			placeholder: 'Mot de passe'
		},
		gdpr: {
			label:
				"J'ai pris connaissance et j'accepte sans réserves le traitement de mes données personnelles tel qu'énoncé dans les mentions légales."
		},
		action: 'Inscription',
		error: "L'inscription a échoué. Vérifiez les différents champs.",
		alreadyRegistered: 'Déjà inscrit ?',
		goSignIn: 'Connectez vous',
		goSignInConfirm: 'Confirmez votre inscription'
	},
	signUpConfirm: {
		username: {
			label: 'Pseudo',
			placeholder: 'dupont'
		},
		code: {
			label: 'Code de vérification',
			placeholder: '123456'
		},
		resendCode: {
			waitingMessage: waitLeft => `Attendez ${waitLeft}s`,
			error: 'Erreur',
			resend: 'Renvoyer'
		},
		action: 'Confirmer',
		error: 'La confirmation a échoué. Vérifiez votre code.',
		goSignUp: 'Pas encore inscrit ? Inscrivez-vous'
	},
	cv: {
		basics: {
			name: {
				label: 'Nom complet',
				placeholder: 'Jean Dupont'
			},
			label: {
				label: 'Titre',
				placeholder: 'Ingénieur en développement informatique'
			},
			summary: {
				label: 'Résumé',
				placeholder: 'Une petite description de M. Dupont'
			},
			picture: {
				label: 'Image de profil',
				placeholder: 'https://jean-dupont.fr/mon-image.jpg'
			},
			email: {
				label: 'Adresse mail',
				placeholder: 'dupont@gmail.com'
			},
			phone: {
				label: 'Numéro de téléphone',
				placeholder: '(+33) 6 12 34 56 78'
			},
			website: {
				label: 'Site internet',
				placeholder: 'https://jean-dupont.fr'
			},
			address: {
				label: 'Adresse postale',
				placeholder: '42, rue de la République'
			},
			postalCode: {
				label: 'Code postal',
				placeholder: '75001'
			},
			city: {
				label: 'Ville',
				placeholder: 'Paris'
			},
			region: {
				label: 'Région',
				placeholder: 'Île de France'
			},
			countryCode: {
				label: 'Code pays',
				placeholder: 'FR'
			},
			network: {
				label: 'Réseau',
				placeholder: 'LinkedIn'
			},
			username: {
				label: "Nom d'utilisateur",
				placeholder: 'dupont'
			},
			url: {
				label: 'Adresse URL',
				placeholder: 'https://www.linkedin.com/in/jean-dupont/'
			},
			addProfile: 'Ajouter un profil',
			removeProfile: 'Supprimer le profil'
		},
		work: {
			isInternship: {
				label: 'Stage'
			},
			company: {
				label: 'Entreprise',
				placeholder: 'Entreprise'
			},
			position: {
				label: 'Poste',
				placeholder: 'Développeur'
			},
			website: {
				label: 'Site internet',
				placeholder: 'https://entreprise.fr/'
			},
			startDate: {
				label: 'Date de début'
			},
			endDate: {
				label: 'Date de fin'
			},
			summary: {
				label: 'Résumé',
				placeholder: "Une petite description de l'expérience"
			},
			highlight: {
				label: 'Réalisation',
				placeholder: "Réalisation du site de l'entreprise"
			},
			addHighlights: 'Ajouter une réalisation',
			removeHighlights: 'Supprimer la réalisation',
			addWork: 'Ajouter une expérience professionnelle',
			removeWork: "Supprimer l'expérience"
		},
		volunteer: {
			organization: {
				label: 'Association',
				placeholder: 'Association'
			},
			position: {
				label: 'Poste',
				placeholder: 'Responsable technique'
			},
			website: {
				label: 'Site internet',
				placeholder: 'https://association.fr/'
			},
			startDate: {
				label: 'Date de début'
			},
			endDate: {
				label: 'Date de fin'
			},
			summary: {
				label: 'Résumé',
				placeholder: "Une petite description de l'expérience"
			},
			highlight: {
				label: 'Réalisation',
				placeholder: "Réalisation du site de l'association"
			},
			addHighlights: 'Ajouter une réalisation',
			removeHighlights: 'Supprimer la réalisation',
			addVolunteer: 'Ajouter une expérience associative',
			removeVolunteer: "Supprimer l'expérience"
		},
		education: {
			institution: {
				label: 'Établissement',
				placeholder: 'Ecole'
			},
			gpa: {
				label: 'GPA',
				placeholder: '3.5'
			},
			area: {
				label: 'Domaine',
				placeholder: 'Ingénierie informatique'
			},
			studyType: {
				label: 'Type',
				placeholder: "Diplôme d'ingénieur"
			},
			startDate: {
				label: 'Date de début'
			},
			endDate: {
				label: 'Date de fin'
			},
			category: {
				label: 'Catégorie',
				placeholder: 'S1'
			},
			course: {
				label: 'Cours',
				placeholder: 'TS1001 - Algorithmique'
			},
			addCoursesCourses: 'Ajouter un cours',
			removeCoursesCourses: 'Supprimer le cours',
			addCourses: 'Ajouter une catégorie de cours',
			removeCourses: 'Supprimer la catégorie',
			addEducation: 'Ajouter une formation',
			removeEducation: 'Supprimer la formation'
		},
		projects: {
			name: {
				label: 'Nom du projet',
				placeholder: 'Projet'
			},
			summary: {
				label: 'Description',
				placeholder: 'Description du projet'
			},
			picture: {
				label: 'Illustration',
				placeholder: 'https://jean-dupont.fr/mon-projet.jpg'
			},
			url: {
				label: 'Adresse URL du projet',
				placeholder: 'https://github.com/dupont/projet/'
			},
			startDate: {
				label: 'Date de début'
			},
			endDate: {
				label: 'Date de fin'
			},
			technology: {
				label: 'Technologie',
				placeholder: 'Javascript'
			},
			addTechnologies: 'Ajouter une technologie',
			removeTechnologies: 'Supprimer la technologie',
			addProjects: 'Ajouter un projet',
			removeProjects: 'Supprimer le projet'
		},
		skills: {
			name: {
				label: 'Nom',
				placeholder: 'Javascript'
			},
			level: {
				label: 'Niveau'
			},
			addSkills: 'Ajouter une compétence',
			removeSkills: 'Supprimer la compétence'
		},
		languages: {
			countryCode: {
				label: 'Code du pays',
				placeholder: 'FR'
			},
			language: {
				label: 'Langue',
				placeholder: 'Français'
			},
			fluency: {
				label: 'Niveau',
				placeholder: 'Avancé'
			},
			addLanguages: 'Ajouter une langue',
			removeLanguages: 'Supprimer la langue'
		},
		interests: {
			name: {
				label: 'Nom',
				placeholder: 'Informatique'
			},
			keyword: {
				label: 'Mot clé',
				placeholder: 'Résolution de problèmes'
			},
			addKeywords: 'Ajouter un mot clé',
			removeKeywords: 'Supprimer le mot clé',
			addInterests: "Ajouter un centre d'intérêts",
			removeInterests: "Supprimer le centre d'intérêts"
		},
		references: {
			name: {
				label: 'Nom',
				placeholder: 'Jeanne Dupont'
			},
			reference: {
				label: 'Référence',
				placeholder: 'Jean est un très bon élément.'
			},
			addReferences: 'Ajouter une référence',
			removeReferences: 'Supprimer la référence'
		},
		goToCVList: 'Revenir à la liste des CVs',
		minDateMessage: 'La date de fin devrait être après la date de début',
		maxDateMessage: 'La date de début devrait être avant la date de fin',
		dateFormat: 'dd/MM/yyyy',
		invalidDateMessage: 'Format de date incorrect',
		currentLabel: 'En cours',
		startProcessMessage: 'Le traitement a commencé...',
		previousDeletionMessage:
			'Le fichier précédent est en cours de suppression...',
		startUploadMessage: 'Le fichier est en cours de chargement...',
		uploadSucceedMessage: 'Le chargement a réussi!',
		noFileErrorMessage: 'Aucun fichier fourni...',
		notImageErrorMessage: "Le fichier fourni n'est pas une image...",
		error: "L'action a échoué. Vérifiez les champs."
	},
	cvList: {
		languageCode: 'Code langue',
		language: 'Langue',
		actions: 'Actions',
		create: 'Créer',
		see: 'Voir',
		default: 'Par défaut',
		update: 'Modifier',
		delete: 'Supprimer',
		setDefault: 'Mettre par défaut',
		deleteDialog: {
			title: language => `Supprimer le CV ${language}`,
			content: language =>
				`Souhaitez-vous réellement supprimer le CV ${language} ? Cette action est irreversible!`,
			cancel: 'Annuler',
			confirm: 'Confirmer'
		},
		noElements: 'Aucun CV'
	},
	cvCreate: {
		languageCode: {
			label: 'Code langue',
			placeholder: 'fr'
		},
		labels: [
			'Détails',
			'Expérience professionnelle',
			'Expérience associative',
			'Formation',
			'Projets',
			'Compétences',
			'Langues',
			"Centre d'intérêts",
			'Références'
		],
		nextButton: 'Suivant',
		languageCodeLabel: 'Langue du CV',
		error:
			"L'envoi du formulaire a échoué. Vérifiez que le code langue existe bien.",
		action: 'Créer'
	},
	cvUpdate: {
		tabData: [
			{ key: 'basics', label: 'Détails' },
			{ key: 'work', label: 'Expérience professionnelle' },
			{ key: 'volunteer', label: 'Expérience associative' },
			{ key: 'education', label: 'Formation' },
			{ key: 'projects', label: 'Projets' },
			{ key: 'skills', label: 'Compétences' },
			{ key: 'languages', label: 'Langues' },
			{ key: 'interests', label: "Centre d'intérêts" },
			{ key: 'references', label: 'Références' }
		],
		changeTabDialog: {
			title: 'Avez-vous sauvegardé votre modification ?',
			content:
				"Avant de changer d'onglet, nous vous conseillons de sauvegarder les modifications, sinon elles seront perdues.",
			cancel: 'Revenir aux modifications',
			continue: 'Continuer'
		},
		action: 'Modifier'
	},
	terms: {
		labels: {
			editor: 'Éditeur',
			hosting: 'Hébergeur',
			cookies: 'Cookies',
			privacy: 'Données personnelles',
			responsibilities: 'Responsabilités',
			credits: 'Crédits',
			jurisdiction: 'Juridiction'
		},
		content: {
			cookies: [
				"Dans le cadre de l'amélioration de l'expérience utilisateur de l'internaute, nous sommes contraints de faire usage de cookies. Ces cookies stockerons uniquement des données qui sont relatif à l'usage de ce site par l'internaute, tel que ses préférences, ses identifiants de connexion, etc... Ces derniers ne seront jamais utilisés à des fins commerciales.",
				'En poursuivant votre navigation, vous acceptez sans réserves que ces dits cookies soient fait usages.'
			],
			privacy: [
				"Pour toutes questions relatives aux données personnelles, veuillez vous addresser à l'éditeur de ce site.",
				'Dans un usage "visiteur", ce site web ne fera usage d\'aucune données personnelles venant de l\'internaute.',
				'Dans un usage "utilisateur", ce site web stockera un nom d\'utilisateur, une adresse email et un mot de passe, qui seront utilisés pour pouvoir identifier de manière unique un internaute. Il sera ensuite libre à l\'internaute de fournir un ou plusieurs CV qui seront dès lors également stockés par ce site.',
				"Les informations identifiant distinctement un internaute, exit le mot de passe, ne seront accessible que par l'éditeur du site et sur decision de justice aux personnes habilitées par cette dite décision.",
				'Les CV fournis par les internautes seront quant à eux disponible à consultation par tout internaute de ce site.',
				'La récupération et le stockage de ces données pré-citées sont obligatoires pour les finalités également pré-citées.',
				"Le consentement de l'internaute sera explicitement récupéré dès l'inscription de l'internaute pour que puisse être effectué les stockages et traitements de données personnelles pré-citées.",
				'Toutes ces données seront stockés dans les serveurs AWS en France, au Royaume-Uni et en Irlande.',
				"En application de la RGPD (Règlement Général sur la Protection des Données), l'internaute dispose d'un droit d'accès, de rectification, de modification et de suppression pour toutes les données le concernant. Pour pouvoir exercer ce droit, l'internaute peut contacter directement l'éditeur de ce site, ou à défaut utiliser les moyens qui lui seront alors proposés pour procéder à l'action voulue.",
				"L'internaute peut également exercer son droit à l'oubli en contactant directement l'éditeur de ce site et en formulant son désir d'exercer ce droit explicitement."
			],
			responsibilities: [
				"Ce site décline toute responsabilités quant aux données et contenus sur les CV fournis par les internautes. L'internaute est responsable du contenu qu'il produit, l'éditeur de ce site est libre de bannir définitivement un utilisateur qui publierait du contenu inapproprié sur ce site."
			],
			credits: [
				'Merci à :',
				'pour la plupart des icônes présentes sur ce site',
				'pour les icônes relatives au développement et la programmation',
				'pour les icônes représentant les drapeaux des pays'
			],
			jurisdiction: [
				'Ce site web et tout son contenu est soumis aux lois françaises. Également, en cas de litige, la version française de cette page prévaudra sur toutes les autres versions.'
			]
		}
	},
	checkFieldErrorMessage: {
		minLength: length =>
			`Le champ doit contenir au moins ${length} caractères.`,
		exactLength: length =>
			`Le champ doit contenir exactement ${length} caractères.`,
		regex: rgx => `Le champs doit être dans le bon format.`,
		charType: ({ lowercase, uppercase, number, symbols }) =>
			`Le champ doit contenir au moins${
				lowercase ? ' - 1 minuscule' : ''
			}${uppercase ? ' - 1 majuscule' : ''}${
				number ? ' - 1 chiffre' : ''
			}${symbols ? ' - 1 caractère spécial' : ''}.`,
		value: valueRef =>
			`Le champs doit correspondre à ${
				typeof valueRef === 'boolean'
					? valueRef
						? 'vrai'
						: 'faux'
					: valueRef
			}.`,
		date: () => `La date n'est pas correcte.`
	}
};

export default fr;
