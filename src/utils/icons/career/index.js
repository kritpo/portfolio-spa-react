// store all details about icons
const icons = {
	Education: {
		name: 'Education',
		loadIcon: () => import('./Education')
	},
	Internship: {
		name: 'Internship',
		loadIcon: () => import('./Internship')
	},
	Volunteer: {
		name: 'Volunteer',
		loadIcon: () => import('./Volunteer')
	},
	Work: {
		name: 'Work',
		loadIcon: () => import('./Work')
	}
};

export default icons;
