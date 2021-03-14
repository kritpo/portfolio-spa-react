import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import {
	Box,
	Typography,
	Button,
	FormControl,
	FormHelperText
} from '@material-ui/core';

import Loading from './Loading';
import Fields from './Fields';

// configure the prop types validation
Form.propTypes = {
	fields: PropTypes.array.isRequired,
	form: PropTypes.object.isRequired,
	handleForm: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	action: PropTypes.string.isRequired,
	error: PropTypes.string.isRequired,
	isSending: PropTypes.bool.isRequired
};

function Form({
	children,
	fields,
	form,
	handleForm,
	handleSubmit,
	action,
	error,
	isSending
}) {
	// setup the form auto submit callback
	const autoSubmit = useCallback(
		({ key }) => {
			// check if the form is active and the entered key is `Enter`
			if (!isSending && key === 'Enter') {
				// submit the form
				handleSubmit();
			}
		},
		[isSending, handleSubmit]
	);

	return (
		<Box
			display="flex"
			flexDirection="column"
			width="75%"
			minWidth="250px"
			maxWidth="400px"
			clone
		>
			<form noValidate autoComplete="off">
				<Fields
					fields={fields}
					form={form}
					handleForm={handleForm}
					autoSubmit={autoSubmit}
				/>
				<FormControl error={error !== ''}>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						disabled={isSending}
					>
						{action}
					</Button>
					<FormHelperText>{error}</FormHelperText>
				</FormControl>
				<Box mt={2} textAlign="center">
					{isSending && (
						<Box mb={2}>
							<Loading size="32px" />
							<Typography variant="body1">
								Envoi en cours...
							</Typography>
						</Box>
					)}
					{children}
				</Box>
			</form>
		</Box>
	);
}

export default Form;
