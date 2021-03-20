// store all details about icons
const icons = {
	Book: {
		name: 'Book',
		loadIcon: () => import('./Book')
	},
	Computer: {
		name: 'Computer',
		loadIcon: () => import('./Computer')
	},
	Robot: {
		name: 'Robot',
		loadIcon: () => import('./Robot')
	}
};

export default icons;
