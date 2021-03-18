import React, { useEffect, useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { useLocation } from 'react-router-dom';

import { fetchResume } from '../actions';

import CVUpdate, { tabData } from '../components/CVUpdate';

// configure the states to pass as props to the component
const mapStateToProps = ({ resume, username }, ...props) => ({
	resume,
	username,
	...props
});

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	fetchResume
};

// configure the prop types validation
CVUpdateContainer.propTypes = {
	username: PropTypes.string.isRequired,
	fetchResume: PropTypes.func.isRequired
};

function CVUpdateContainer({ username, fetchResume, ...props }) {
	// retrieve the location hook
	const location = useLocation();

	// setup the resume fetching hook
	useEffect(() => {
		// retrieve queries parameters
		const query = new URLSearchParams(location.search);

		// retrieve the language code
		const languageCode = query.get('languageCode');

		// fetch the resume at the loading of the component
		fetchResume(
			false,
			username,
			languageCode !== null ? languageCode : undefined
		);
	}, [fetchResume, location.search, username]);

	// setup the update status hook
	const [update, setUpdate] = useState(false);

	// setup the current tab hook
	const [currentTab, setCurrentTab] = useState(tabData[0].key);

	// setup the next tab hook
	const [nextTab, setNextTab] = useState(null);

	// setup the dialog close handler
	const handleClose = useCallback(() => {
		setNextTab(null);
	}, []);

	// setup the update next tab handler
	const handleNextTabChange = useCallback(
		(event, newTab) => {
			// check if there is an update at the moment
			if (update) {
				// set the new tab to be the next one
				setNextTab(newTab);
			} else {
				// otherwise, change directly the tab
				setCurrentTab(newTab);
			}
		},
		[update]
	);

	// setup the update tab handler
	const handleTabChange = useCallback(() => {
		// set the current table to be the next one
		setCurrentTab(nextTab);

		// reset the update status
		setUpdate(false);

		// close the dialog if open
		handleClose();
	}, [handleClose, nextTab]);

	// setup the set form handler
	const setForm = useCallback(() => {
		// update the update status
		setUpdate(true);
	}, []);

	return (
		<CVUpdate
			currentTab={currentTab}
			nextTab={nextTab}
			handleNextTabChange={handleNextTabChange}
			handleTabChange={handleTabChange}
			handleClose={handleClose}
			setForm={setForm}
			{...props}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(CVUpdateContainer);
