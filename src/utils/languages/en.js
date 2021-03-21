// setup english translations
const en = {
	generic: {
		loadingError: 'Unable to load data.',
		formSendingMessage: 'Sending in progress...'
	},
	pages: {
		home: 'Home',
		terms: 'Terms',
		signIn: 'Sign in',
		signUp: 'Sign up',
		signUpConfirm: 'Registration confirmation',
		logout: 'Logout',
		cvList: 'CVs list',
		cvCreate: 'Create a CV',
		cvUpdate: 'Update the CV'
	},
	footer: {
		credits: 'Realized by Jimmy Weng'
	},
	error401: {
		title: 'Error 401',
		message: 'You can not access to this page.'
	},
	error404: {
		title: 'Error 404',
		message: 'The page you are looking for does not exist.'
	},
	portfolio: {
		hero: {
			titleDefault: '<Jimmy Weng />',
			titleLoading: 'Loading...',
			titleError: 'Loading error',
			descriptionDefault: 'Full-Stack Developer',
			descriptionLoading: 'Wait a moment...',
			descriptionError: 'CV does not exist'
		},
		details: {
			label: 'Details',
			title: 'My details',
			goToWebsite: 'Go to my website'
		},
		career: {
			label: 'Career',
			title: 'My career',
			noElements: 'No elements to show',
			current: 'Current',
			menu: {
				invert: 'Invert selection',
				work: 'Work',
				education: 'School',
				volunteer: 'Volunteer',
				showCourses: 'See courses',
				goToWebsite: 'See website'
			}
		},
		projects: {
			label: 'Projects',
			title: 'My projects',
			current: 'Current',
			noElements: 'No projects'
		},
		skills: {
			label: 'Skills',
			title: 'My skills',
			noElements: 'No skills'
		},
		languages: {
			title: 'Languages',
			noElements: 'No languages'
		},
		interests: {
			title: 'Interests',
			noElements: 'No interests'
		},
		references: {
			label: 'References',
			title: 'My references',
			noElements: 'No references'
		}
	},
	signIn: {
		username: {
			label: 'Pseudo',
			placeholder: 'john'
		},
		password: {
			label: 'Password',
			placeholder: 'Password'
		},
		action: 'Sign in',
		error: 'The identification failed. Check your credentials.',
		goSignUp: 'Not registered? Sign up'
	},
	signUp: {
		username: {
			label: 'Pseudo',
			placeholder: 'john'
		},
		email: {
			label: 'Email',
			placeholder: 'john@gmail.com'
		},
		password: {
			label: 'Password',
			placeholder: 'Password'
		},
		gdpr: {
			label:
				'I have read and fully accept the processing of my personal data as set out in the legal notices. '
		},
		action: 'Sign up',
		error: 'The registration failed. Check all fields.',
		alreadyRegistered: 'Already registered?',
		goSignIn: 'Sign in',
		goSignInConfirm: 'Confirm your registration'
	},
	signUpConfirm: {
		username: {
			label: 'Pseudo',
			placeholder: 'john'
		},
		code: {
			label: 'Verification code',
			placeholder: '123456'
		},
		resendCode: {
			waitingMessage: waitLeft => `Wait ${waitLeft}s`,
			error: 'Error',
			resend: 'Resend'
		},
		action: 'Confirm',
		error: 'The confirmation failed. Check your code.',
		goSignUp: 'Not registered? Sign up'
	},
	cv: {
		basics: {
			name: {
				label: 'Complete name',
				placeholder: 'John Doe'
			},
			label: {
				label: 'Title',
				placeholder: 'IT development engineer'
			},
			summary: {
				label: 'Summary',
				placeholder: 'A short description of Mr. Doe'
			},
			picture: {
				label: 'Profile picture',
				placeholder: 'https://john-doe.fr/my-image.jpg'
			},
			email: {
				label: 'Email',
				placeholder: 'john@gmail.com'
			},
			phone: {
				label: 'Phone number',
				placeholder: '(+33) 6 12 34 56 78'
			},
			website: {
				label: 'Website',
				placeholder: 'https://john-doe.fr'
			},
			address: {
				label: 'Address',
				placeholder: '42, rue de la République'
			},
			postalCode: {
				label: 'Postal code',
				placeholder: '75001'
			},
			city: {
				label: 'City',
				placeholder: 'Paris'
			},
			region: {
				label: 'Region',
				placeholder: 'Île de France'
			},
			countryCode: {
				label: 'Country code',
				placeholder: 'FR'
			},
			network: {
				label: 'Network',
				placeholder: 'LinkedIn'
			},
			username: {
				label: 'Username',
				placeholder: 'dupont'
			},
			url: {
				label: 'URL address',
				placeholder: 'https://www.linkedin.com/in/john-doe/'
			},
			addProfile: 'Add a profile',
			removeProfile: 'Delete the profile'
		},
		work: {
			isInternship: {
				label: 'Internship'
			},
			company: {
				label: 'Corporation',
				placeholder: 'Corporation'
			},
			position: {
				label: 'Position',
				placeholder: 'Developer'
			},
			website: {
				label: 'Website',
				placeholder: 'https://corporation.fr/'
			},
			startDate: {
				label: 'Start date'
			},
			endDate: {
				label: 'End date'
			},
			summary: {
				label: 'Summary',
				placeholder: 'A little summary of the experience'
			},
			highlight: {
				label: 'Production',
				placeholder: 'Make the website of the company'
			},
			addHighlights: 'Add a production',
			removeHighlights: 'Delete the production',
			addWork: 'Add a working experience',
			removeWork: 'Delete the working experience'
		},
		volunteer: {
			organization: {
				label: 'Organization',
				placeholder: 'Organization'
			},
			position: {
				label: 'Position',
				placeholder: 'Technical manager'
			},
			website: {
				label: 'Website',
				placeholder: 'https://organization.fr/'
			},
			startDate: {
				label: 'Start date'
			},
			endDate: {
				label: 'End date'
			},
			summary: {
				label: 'Summary',
				placeholder: 'A little summary of the experience'
			},
			highlight: {
				label: 'Production',
				placeholder: 'Make the website of the organization'
			},
			addHighlights: 'Add a production',
			removeHighlights: 'Delete the production',
			addVolunteer: 'Add an associative experience',
			removeVolunteer: 'Delete the associative experience'
		},
		education: {
			institution: {
				label: 'School',
				placeholder: 'School'
			},
			gpa: {
				label: 'GPA',
				placeholder: '3.5'
			},
			area: {
				label: 'Area',
				placeholder: 'IT Engineering'
			},
			studyType: {
				label: 'Study type',
				placeholder: 'Engineering diploma'
			},
			startDate: {
				label: 'Start date'
			},
			endDate: {
				label: 'End date'
			},
			category: {
				label: 'Category',
				placeholder: 'S1'
			},
			course: {
				label: 'Course',
				placeholder: 'TS1001 - Algorithmic'
			},
			addCoursesCourses: 'Add a course',
			removeCoursesCourses: 'Delete the course',
			addCourses: 'Add a course category',
			removeCourses: 'Delete the course category',
			addEducation: 'Add an academic experience',
			removeEducation: 'Delete the academic experience'
		},
		projects: {
			name: {
				label: 'Project name',
				placeholder: 'Project'
			},
			summary: {
				label: 'Summary',
				placeholder: 'Projet summary'
			},
			picture: {
				label: 'Picture',
				placeholder: 'https://john-doe.fr/my-project.jpg'
			},
			url: {
				label: 'Project URL address',
				placeholder: 'https://github.com/john/project/'
			},
			startDate: {
				label: 'Start date'
			},
			endDate: {
				label: 'End date'
			},
			technology: {
				label: 'Technology',
				placeholder: 'Javascript'
			},
			addTechnologies: 'Add a technology',
			removeTechnologies: 'Delete the technology',
			addProjects: 'Add a project',
			removeProjects: 'Delete the project'
		},
		skills: {
			name: {
				label: 'Name',
				placeholder: 'Javascript'
			},
			level: {
				label: 'Level'
			},
			addSkills: 'Add a skill',
			removeSkills: 'Delete the skill'
		},
		languages: {
			countryCode: {
				label: 'Country code',
				placeholder: 'FR'
			},
			language: {
				label: 'Language',
				placeholder: 'French'
			},
			fluency: {
				label: 'Level',
				placeholder: 'Advanced'
			},
			addLanguages: 'Add a language',
			removeLanguages: 'Delete the language'
		},
		interests: {
			name: {
				label: 'Name',
				placeholder: 'IT'
			},
			keyword: {
				label: 'Keyword',
				placeholder: 'Problem solving'
			},
			addKeywords: 'Add a keyword',
			removeKeywords: 'Delete the keyword',
			addInterests: 'Add an interest',
			removeInterests: 'Delete the interest'
		},
		references: {
			name: {
				label: 'Name',
				placeholder: 'Jane Doe'
			},
			reference: {
				label: 'Reference',
				placeholder: 'John is a a good worker.'
			},
			addReferences: 'Add a reference',
			removeReferences: 'Delete the reference'
		},
		goToCVList: 'Go back to the CVs list',
		minDateMessage: 'The end date should be after the start date',
		maxDateMessage: 'The start date should be before the end date',
		dateFormat: 'MM/dd/yyyy',
		invalidDateMessage: 'Incorrect date format',
		currentLabel: 'Current',
		startProcessMessage: 'The processing started...',
		previousDeletionMessage: 'The previous file is being deleted...',
		startUploadMessage: 'The file is being uploaded...',
		uploadSucceedMessage: 'The upload succeed!',
		noFileErrorMessage: 'No file provided...',
		notImageErrorMessage: 'The provided file is not an image...',
		error: 'The action failed. Check the fields.'
	},
	cvList: {
		languageCode: 'Language code',
		language: 'Language',
		actions: 'Actions',
		create: 'Create',
		see: 'See',
		default: 'Default',
		update: 'Update',
		delete: 'Delete',
		setDefault: 'Set default',
		deleteDialog: {
			title: language => `Delete the CV ${language}`,
			content: language =>
				`Did you really want to delete the CV ${language}? This action is irreversible!`,
			cancel: 'Cancel',
			confirm: 'Confirm'
		},
		noElements: 'Aucun CV'
	},
	cvCreate: {
		languageCode: {
			label: 'Language code',
			placeholder: 'en'
		},
		labels: [
			'Details',
			'Working experience',
			'Associative experience',
			'Academic experience',
			'Projects',
			'Skills',
			'Languages',
			'Interests',
			'References'
		],
		nextButton: 'Next',
		languageCodeLabel: 'CV language',
		error:
			'The sending of the form failed. Check that the language code exist.',
		action: 'Create'
	},
	cvUpdate: {
		tabData: [
			{ key: 'basics', label: 'Details' },
			{ key: 'work', label: 'Working experience' },
			{ key: 'volunteer', label: 'Associative experience' },
			{ key: 'education', label: 'Academic experience' },
			{ key: 'projects', label: 'Projects' },
			{ key: 'skills', label: 'Skills' },
			{ key: 'languages', label: 'Languages' },
			{ key: 'interests', label: 'Interests' },
			{ key: 'references', label: 'References' }
		],
		changeTabDialog: {
			title: 'Did you saved your updates?',
			content:
				'Before changing tab, we advise you to save changes, otherwise they would be lost.',
			cancel: 'Go back to changes',
			continue: 'Continue'
		},
		action: 'Update'
	},
	terms: {
		labels: {
			editor: 'Editor',
			hosting: 'Hosting',
			cookies: 'Cookies',
			privacy: 'Privacy',
			responsibilities: 'Responsibilities',
			credits: 'Credits',
			jurisdiction: 'Jurisdiction'
		},
		content: {
			cookies: [
				'In order to improve the quality of the user experience of the internet user, we are needed to use cookies. These cookies store only website related data of the usage of the internet user, like his preferences, his connection credentials, etc... These would never be used for commercial purpose.',
				'By continuing your navigation, you accept without restriction the usage of theses cookies.'
			],
			privacy: [
				'For all questions related to the personal data, please refer to the website editor.',
				'With a "guest" type, this website will not store or use any data from the internet user.',
				'With a "user" type, this website will store an username, a mail address and a password which will be used to identify a specific internet user. It would be free to the internet user the create one or many CVs which will also be stored by this website.',
				'The data which identify directly the internet user, exit the password, will be accessible only by the website editor and by court decision to the persons empowered by this said decision.',
				'The given CVs by the internet users will be accessible to all others internet users of this website.',
				'The retrieve and storage of these data are required for the aforementioned purposes.',
				'The agreement of the internet user will be explicitly retrieve from the registration of the internet user, to allow the website to do the storage and data processing of the aforementioned data.',
				'All data will be stored on AWS servers in France, in United Kingdom and in Ireland.',
				'In application of the GDPR (General Data Protection Regulation), the internet user have a right of access, rectification, modification and deletion for all data concerning himself. To exercise this right, he can contact directly the website editor, or using the tools given to do the specific action.',
				'The internet user could also exercise his right to be forgotten by contacting directly the website editor and by expressing his desire to exercise this right explicitly.'
			],
			responsibilities: [
				'This website declines all responsibility for the data and content on the CVs provided by internet users. The internet user is responsible for the content he produces, the editor of this site is free to permanently ban an internet user who publishes inappropriate content on this website.'
			],
			credits: [
				'Thanks to:',
				'for most of the icons in this website',
				'for IT related icons',
				'for country flags icons'
			],
			jurisdiction: [
				'This website and all his content is under French laws. Also, in case of dispute, the French version of this page will prevails on all others versions.'
			]
		}
	},
	checkFieldErrorMessage: {
		minLength: length =>
			`The field must contains at least ${length} characters.`,
		exactLength: length =>
			`The field must contains exactly ${length} characters.`,
		regex: rgx => `The field must be on right format.`,
		charType: ({ lowercase, uppercase, number, symbols }) =>
			`The field must contains at leat${
				lowercase ? ' - 1 lowercase' : ''
			}${uppercase ? ' - 1 uppercase' : ''}${
				number ? ' - 1 number' : ''
			}${symbols ? ' - 1 symbols' : ''}.`,
		value: valueRef => `The field must match to ${valueRef}.`,
		date: () => `The date is not correct.`
	}
};

export default en;
