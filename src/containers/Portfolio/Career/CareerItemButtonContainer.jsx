import React, { useState, useCallback, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import CareerItemButton, {
	NO_CATEGORY
} from '../../../components/Portfolio/Career/CareerItemButton';

/**
 * setup the category splitter of courses
 * @param {[string]} courses the list of couses name
 * @returns the courses array splitted in categories
 */
const coursesCategorySplitter = courses => {
	// initialize the category container
	const courseWithCategory = {};

	// loop all courses to split them into their category
	courses.forEach((course, index) => {
		// retrieve the course category
		const regResult = /^\[(.+?)\]/.exec(course);
		const category = regResult !== null ? regResult[1] : NO_CATEGORY;

		// check if the category does not exist
		if (courseWithCategory[category] === undefined) {
			// initialize a container
			courseWithCategory[category] = [];
		}

		// add the course to the category
		courseWithCategory[category].push({
			index,
			course: course.replace(/^\[.+?\]/, '')
		});
	});

	return courseWithCategory;
};

/**
 * setup the buttons generator
 * @param {array} categories the list of categories
 * @param {string} category the current categories
 * @returns the categories buttons array
 */
const generateButtons = (categories, category) => {
	// initialize the list of categories buttons
	const courseButtons = [];

	// loop all categories
	categories.forEach(name => {
		courseButtons.push({ name, active: category === name });
	});

	return courseButtons;
};

// configure the prop types validation
CareerItemButtonContainer.propTypes = {
	courses: PropTypes.arrayOf(PropTypes.string)
};

function CareerItemButtonContainer({ courses, ...props }) {
	// setup the dialog state hook
	const [open, setOpen] = useState(false);

	// setup the courses in category hook
	const [coursesInCategory, setCoursesInCategory] = useState({});

	// setup the courses hook
	const [category, setCategory] = useState({
		courses: [],
		buttons: []
	});

	// setup dialog event handlers
	const dialogToggle = useCallback(() => {
		// check if courses are specified
		if (courses !== undefined) {
			setOpen(!open);
		}
	}, [courses, open]);

	// setup the category updater
	const updateCategory = useCallback(
		(cat, courses) => () => {
			// update the courses state
			setCategory({
				courses:
					courses === undefined
						? coursesInCategory[cat]
						: courses[cat],
				buttons: generateButtons(
					Object.keys(
						courses === undefined ? coursesInCategory : courses
					),
					cat
				)
			});
		},
		[coursesInCategory]
	);

	// setup the courses in categories
	useEffect(() => {
		// check if the courses is not defined
		if (courses === undefined) {
			return;
		}

		//retrieves the courses in categories
		const categories = coursesCategorySplitter(courses);

		// update the courses in category state
		setCoursesInCategory(categories);

		// retrieve the first category
		const cat = Object.keys(categories)[0];

		// update the category
		updateCategory(cat, categories)();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [courses]);

	return (
		<CareerItemButton
			isEducation={courses !== undefined}
			category={category}
			updateCategory={updateCategory}
			open={open}
			dialogToggle={dialogToggle}
			{...props}
		/>
	);
}

export default CareerItemButtonContainer;
