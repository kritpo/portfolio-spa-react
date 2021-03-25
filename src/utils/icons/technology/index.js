// store all details about icons
const icons = {
	'Amazon Web Services': {
		name: 'Amazon Web Services',
		loadIcon: () => import('./AmazonWebServices')
	},
	Android: {
		name: 'Android',
		loadIcon: () => import('./Android')
	},
	Angular: {
		name: 'Angular',
		loadIcon: () => import('./Angular')
	},
	Bootstrap: {
		name: 'Bootstrap',
		loadIcon: () => import('./Bootstrap')
	},
	CSS: {
		name: 'CSS',
		loadIcon: () => import('./CSS')
	},
	Docker: {
		name: 'Docker',
		loadIcon: () => import('./Docker')
	},
	ExpressJS: {
		name: 'ExpressJS',
		loadIcon: () => import('./ExpressJS')
	},
	Git: {
		name: 'Git',
		loadIcon: () => import('./Git')
	},
	HTML: {
		name: 'HTML',
		loadIcon: () => import('./HTML')
	},
	Java: {
		name: 'Java',
		loadIcon: () => import('./Java')
	},
	Javascript: {
		name: 'Javascript',
		loadIcon: () => import('./Javascript')
	},
	MaterialUI: {
		name: 'MaterialUI',
		loadIcon: () => import('./MaterialUI')
	},
	NodeJS: {
		name: 'NodeJS',
		loadIcon: () => import('./NodeJS')
	},
	PHP: {
		name: 'PHP',
		loadIcon: () => import('./PHP')
	},
	React: {
		name: 'React',
		loadIcon: () => import('./React')
	},
	Redux: {
		name: 'Redux',
		loadIcon: () => import('./Redux')
	},
	Symfony: {
		name: 'Symfony',
		loadIcon: () => import('./Symfony')
	},
	TypeScript: {
		name: 'TypeScript',
		loadIcon: () => import('./TypeScript')
	},
	VueJS: {
		name: 'VueJS',
		loadIcon: () => import('./VueJS')
	}
};

export default icons;
