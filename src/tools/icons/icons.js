// define icon type constants
export const SOCIAL = 'SOCIAL';
export const CAREER = 'career';
export const TECHNOLOGY = 'TECHNOLOGY';
export const HOBBY = 'HOBBY';

// store all details about icons
const icons = [
	{
		loadIcon: () => import('./social/Bitbucket'),
		type: SOCIAL,
		keyword: ['bitbucket', 'bit bucket']
	},
	{
		loadIcon: () => import('./social/Docker'),
		type: SOCIAL,
		keyword: ['dockerhub', 'docker hub', 'docker']
	},
	{
		loadIcon: () => import('./social/Facebook'),
		type: SOCIAL,
		keyword: ['facebook']
	},
	{
		loadIcon: () => import('./social/GitHub'),
		type: SOCIAL,
		keyword: ['github', 'git hub']
	},
	{
		loadIcon: () => import('./social/GitLab'),
		type: SOCIAL,
		keyword: ['gitlab', 'git lab']
	},
	{
		loadIcon: () => import('./social/Instagram'),
		type: SOCIAL,
		keyword: ['intagram']
	},
	{
		loadIcon: () => import('./social/LinkedIn'),
		type: SOCIAL,
		keyword: ['linkedin']
	},
	{
		loadIcon: () => import('./social/NPM'),
		type: SOCIAL,
		keyword: ['npm']
	},
	{
		loadIcon: () => import('./social/Twitter'),
		type: SOCIAL,
		keyword: ['twitter']
	},
	{
		loadIcon: () => import('./social/Youtube'),
		type: SOCIAL,
		keyword: ['youtube']
	},

	{
		loadIcon: () => import('./career/Education'),
		type: CAREER,
		keyword: ['education']
	},
	{
		loadIcon: () => import('./career/Internship'),
		type: CAREER,
		keyword: ['internship']
	},
	{
		loadIcon: () => import('./career/Volunteer'),
		type: CAREER,
		keyword: ['volunteer']
	},
	{
		loadIcon: () => import('./career/Work'),
		type: CAREER,
		keyword: ['work']
	},

	{
		loadIcon: () => import('./technology/AmazonWebServices'),
		type: TECHNOLOGY,
		keyword: ['amazonwebservices', 'amazon web services', 'aws']
	},
	{
		loadIcon: () => import('./technology/Android'),
		type: TECHNOLOGY,
		keyword: ['android']
	},
	{
		loadIcon: () => import('./technology/Angular'),
		type: TECHNOLOGY,
		keyword: ['angular']
	},
	{
		loadIcon: () => import('./technology/Bootstrap'),
		type: TECHNOLOGY,
		keyword: ['bootstrap']
	},
	{
		loadIcon: () => import('./technology/CSS'),
		type: TECHNOLOGY,
		keyword: ['css']
	},
	{
		loadIcon: () => import('./technology/Docker'),
		type: TECHNOLOGY,
		keyword: ['docker']
	},
	{
		loadIcon: () => import('./technology/ExpressJS'),
		type: TECHNOLOGY,
		keyword: ['expressjs', 'express js', 'express']
	},
	{
		loadIcon: () => import('./technology/Git'),
		type: TECHNOLOGY,
		keyword: ['git']
	},
	{
		loadIcon: () => import('./technology/HTML'),
		type: TECHNOLOGY,
		keyword: ['html']
	},
	{
		loadIcon: () => import('./technology/Java'),
		type: TECHNOLOGY,
		keyword: ['java', 'jee']
	},
	{
		loadIcon: () => import('./technology/Javascript'),
		type: TECHNOLOGY,
		keyword: ['javascript', 'js']
	},
	{
		loadIcon: () => import('./technology/MaterialUI'),
		type: TECHNOLOGY,
		keyword: ['materialui', 'material ui']
	},
	{
		loadIcon: () => import('./technology/NodeJS'),
		type: TECHNOLOGY,
		keyword: ['nodejs', 'node js', 'node']
	},
	{
		loadIcon: () => import('./technology/PHP'),
		type: TECHNOLOGY,
		keyword: ['php']
	},
	{
		loadIcon: () => import('./technology/React'),
		type: TECHNOLOGY,
		keyword: ['react']
	},
	{
		loadIcon: () => import('./technology/Redux'),
		type: TECHNOLOGY,
		keyword: ['redux']
	},
	{
		loadIcon: () => import('./technology/Symfony'),
		type: TECHNOLOGY,
		keyword: ['symfony']
	},
	{
		loadIcon: () => import('./technology/TypeScript'),
		type: TECHNOLOGY,
		keyword: ['typescript', 'ts']
	},
	{
		loadIcon: () => import('./technology/VueJS'),
		type: TECHNOLOGY,
		keyword: ['vuejs', 'vue js', 'vue']
	},

	{
		loadIcon: () => import('./hobby/Book'),
		type: HOBBY,
		keyword: ['livre', 'culture']
	},
	{
		loadIcon: () => import('./hobby/Computer'),
		type: HOBBY,
		keyword: ['ordinateur', 'informatique']
	},
	{
		loadIcon: () => import('./hobby/Robot'),
		type: HOBBY,
		keyword: ['robot', 'robotique']
	}
];

export default icons;
