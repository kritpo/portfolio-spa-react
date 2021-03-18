import React, { useCallback, useState } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { deleteResume } from '../../actions';

import LanguageItem from '../../components/CVList/LanguageItem';

// configure the actions to pass as props to the component
const mapDispatchToProps = {
	deleteResume
};

// configure the prop types validation
LanguageItemContainer.propTypes = {
	languageCode: PropTypes.string.isRequired,
	deleteResume: PropTypes.func.isRequired
};

function LanguageItemContainer({ languageCode, deleteResume, ...props }) {
	// setup the delete pending status
	const [deletePending, setDeletePending] = useState(false);

	// setup the dialog close handle
	const handleClose = useCallback(() => {
		setDeletePending(false);
	}, []);

	// setup the delete callback
	const onDeletePending = useCallback(() => {
		setDeletePending(true);
	}, []);

	// setup the delete handler
	const onDelete = useCallback(() => {
		// delete the resume
		deleteResume(languageCode);

		// close the dialog
		handleClose();
	}, [deleteResume, handleClose, languageCode]);

	return (
		<LanguageItem
			languageCode={languageCode}
			deletePending={deletePending}
			handleClose={handleClose}
			onDeletePending={onDeletePending}
			onDelete={onDelete}
			{...props}
		/>
	);
}

export default connect(null, mapDispatchToProps)(LanguageItemContainer);
