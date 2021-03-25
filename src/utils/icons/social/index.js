// store all details about icons
const icons = {
	Bitbucket: {
		name: 'Bitbucket',
		loadIcon: () => import('./Bitbucket')
	},
	Docker: {
		name: 'Docker',
		loadIcon: () => import('./Docker')
	},
	Facebook: {
		name: 'Facebook',
		loadIcon: () => import('./Facebook')
	},
	GitHub: {
		name: 'GitHub',
		loadIcon: () => import('./GitHub')
	},
	GitLab: {
		name: 'GitLab',
		loadIcon: () => import('./GitLab')
	},
	Instagram: {
		name: 'Instagram',
		loadIcon: () => import('./Instagram')
	},
	LinkedIn: {
		name: 'LinkedIn',
		loadIcon: () => import('./LinkedIn')
	},
	NPM: {
		name: 'NPM',
		loadIcon: () => import('./NPM')
	},
	Twitter: {
		name: 'Twitter',
		loadIcon: () => import('./Twitter')
	},
	Youtube: {
		name: 'Youtube',
		loadIcon: () => import('./Youtube')
	}
};

export default icons;
