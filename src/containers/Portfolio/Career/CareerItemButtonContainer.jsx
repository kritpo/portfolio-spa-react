import { PropTypes } from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import CareerItemButton from '../../../components/Portfolio/Career/CareerItemButton';

// configure the prop types validation
CareerItemButtonContainer.propTypes = {
	courses: PropTypes.arrayOf(
		PropTypes.shape({
			category: PropTypes.string.isRequired
		})
	)
};

function CareerItemButtonContainer({ courses, ...props }) {
	// setup the dialog state hook
	const [open, setOpen] = useState(false);

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
		cat => () => {
			// update the courses state
			setCategory({
				courses: courses.find(({ category }) => category === cat)
					.courses,
				buttons: courses.map(({ category: name }) => ({
					name,
					active: cat === name
				}))
			});
		},
		[courses]
	);

	// setup the courses in categories
	useEffect(() => {
		// check if the courses is not defined
		if (courses === undefined) {
			return;
		}

		// retrieve the first category
		const cat = courses[0].category;

		// update the category
		updateCategory(cat)();
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
