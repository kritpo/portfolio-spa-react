import { PropTypes } from 'prop-types';
import React, { Fragment } from 'react';

import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Grid,
	Typography
} from '@material-ui/core';

/**
 * convert course content details to React component
 * @param {array} courseContent the list of courses data
 * @returns the components array
 */
const coursesList = courses =>
	courses.map((course, index) => (
		<Typography variant="body1" key={index}>
			{course}
		</Typography>
	));

/**
 * convert course buttons to React component
 * @param {array} courseButtons the list of courses buttons data
 * @returns the components array
 */
const buttonsList = (buttons, updateCategory) =>
	buttons.map(({ name, active }) => (
		<Grid item key={name}>
			<Button
				variant="contained"
				color="secondary"
				disabled={active}
				onClick={updateCategory(name)}
			>
				{name}
			</Button>
		</Grid>
	));

/**
 * check if one and only one of link or courses props was specified
 * @param {[object]} props list of props
 * @param {string} propName name of the checked prop
 * @param {string} componentName name of the component
 */
const customValidator = ({ link, isEducation }, propName, componentName) => {
	// check if at least one props was specified
	if (link === undefined && !isEducation) {
		return new Error(
			`One of props \`link\` or \`courses\` was not specified in \`${componentName}\`.`
		);
	}

	// check if at most one props was specified
	if (link !== undefined && isEducation) {
		return new Error(
			`More than one of props \`link\` or \`courses\` was specified in \`${componentName}\`.`
		);
	}
};

// configure the prop types validation
CareerItemButton.propTypes = {
	children: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	link: PropTypes.string,
	isEducation: PropTypes.bool.isRequired,
	customValidator,
	category: PropTypes.shape({
		courses: PropTypes.arrayOf(PropTypes.string).isRequired,
		buttons: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				active: PropTypes.bool.isRequired
			})
		).isRequired
	}).isRequired,
	updateCategory: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	dialogToggle: PropTypes.func.isRequired
};

function CareerItemButton({
	children,
	id,
	link,
	isEducation,
	category: { courses, buttons },
	updateCategory,
	open,
	dialogToggle
}) {
	return (
		<Fragment>
			<Button
				size="large"
				href={link ?? ''}
				target="_blank"
				onClick={isEducation ? dialogToggle : undefined}
			>
				{children}
			</Button>
			{isEducation && (
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
						<Grid container spacing={2} justify="center">
							{buttonsList(buttons, updateCategory)}
						</Grid>
						<Box mt={2}>{coursesList(courses)}</Box>
					</DialogContent>
				</Dialog>
			)}
		</Fragment>
	);
}

export default CareerItemButton;
