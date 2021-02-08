import React, { useState, useMemo, Fragment } from 'react';
import { PropTypes } from 'prop-types';

import {
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	Button,
	Typography
} from '@material-ui/core';

// setup no category course constant
export const NO_CATEGORY = 'NO_CATEGORY';

/**
 * setup the category splitter in component of courses
 * @param {[string]} courses
 */
const coursesCategorySplitter = courses => {
	// check if the courses is defined
	if (courses === undefined) {
		return null;
	}

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
		courseWithCategory[category].push(
			<Typography variant="body1" key={index}>
				{course.replace(/^\[.+?\]/, '')}
			</Typography>
		);
	});

	return courseWithCategory;
};

/**
 * check if one and only one of link or courses props was specified
 * @param {[object]} props list of props
 * @param {string} propName name of the checked prop
 * @param {string} componentName name of the component
 */
const customValidator = (props, propName, componentName) => {
	// check if at least one props was specified
	if (props.link === undefined && props.courses === undefined) {
		return new Error(
			`One of props \`link\` or \`courses\` was not specified in \`${componentName}\`.`
		);
	}

	// check if at most one props was specified
	if (props.link !== undefined && props.courses !== undefined) {
		return new Error(
			`More than one of props \`link\` or \`courses\` was specified in \`${componentName}\`.`
		);
	}
};

// configure the prop types validation
CareerItemButton.propTypes = {
	children: PropTypes.string.isRequired,
	link: PropTypes.string,
	courses: PropTypes.arrayOf(PropTypes.string),
	customValidator,
	id: PropTypes.number.isRequired
};

function CareerItemButton({ children, link, courses, id }) {
	// setup the dialog state hook
	const [open, setOpen] = useState(false);

	// setup the course category hook
	const [courseCategory, setCourseCategory] = useState('');

	// retrieve the list of courses splitted by categories
	const coursesInCategory = useMemo(() => {
		// check if the courses is not specified
		if (courses === undefined) return null;

		// save the list of courses
		const coursesInCategory = coursesCategorySplitter(courses);

		// setup to the first category
		setCourseCategory(Object.keys(coursesInCategory)[0] ?? '');

		return coursesInCategory;
	}, [courses]);

	// retrieve the course list
	const courseContent =
		coursesInCategory !== null ? coursesInCategory[courseCategory] : null;

	// retrieve the list of courses categories buttons
	const courseButtons = useMemo(() => {
		// initialize the list of categories buttons
		const courseButtons = [];

		// loop all categories
		for (const category in coursesInCategory) {
			// setup course category updater
			const updateCategory = () => {
				setCourseCategory(category);
			};

			// add the category button
			courseButtons.push(
				<Box m={2} clone key={category}>
					<Button
						variant="contained"
						color="secondary"
						disabled={courseCategory === category}
						onClick={updateCategory}
					>
						{category === NO_CATEGORY ? 'Défaut' : category}
					</Button>
				</Box>
			);
		}

		return courseButtons;
	}, [coursesInCategory, courseCategory]);

	// setup dialog event handlers
	const dialogToggle = () => {
		// check if courses are specified
		if (courses !== undefined) {
			setOpen(!open);
		}
	};

	return (
		<Fragment>
			<Button
				size="large"
				href={link ?? ''}
				target="_blank"
				onClick={courses !== undefined ? dialogToggle : undefined}
			>
				{children}
			</Button>
			{courses !== undefined && (
				<Dialog
					aria-labelledby={`${'scroll-dialog-title'}-${id}`}
					aria-describedby={`${'scroll-dialog-description'}-${id}`}
					scroll="body"
					open={open}
					onClose={dialogToggle}
				>
					<DialogTitle id={`${'scroll-dialog-title'}-${id}`}>
						Liste des cours
					</DialogTitle>
					<DialogContent id={`${'scroll-dialog-description'}-${id}`}>
						{courseButtons}
						{courseContent}
					</DialogContent>
				</Dialog>
			)}
		</Fragment>
	);
}

export default CareerItemButton;
