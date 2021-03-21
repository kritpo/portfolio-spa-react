import { Auth, Storage } from 'aws-amplify';
import { PropTypes } from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	FormHelperText,
	Typography
} from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';

// setup fields types constants
export const IMAGE = 'image';

// setup the image regex constant
export const IMAGE_REGEX = /^{"identityId":.+,"key":.+}$/;

// configure the prop types validation
ImageField.propTypes = {
	form: PropTypes.objectOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				value: PropTypes.any,
				error: PropTypes.string.isRequired
			}),
			PropTypes.array
		])
	).isRequired,
	template: PropTypes.shape({
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		configParam: PropTypes.shape({
			startProcessMessage: PropTypes.string,
			previousDeletionMessage: PropTypes.string,
			startUploadMessage: PropTypes.string,
			uploadSucceedMessage: PropTypes.string,
			noFileErrorMessage: PropTypes.string,
			notImageErrorMessage: PropTypes.string
		})
	}).isRequired,
	handleForm: PropTypes.shape({
		onChange: PropTypes.func.isRequired,
		onError: PropTypes.func.isRequired
	}).isRequired,
	preName: PropTypes.string
};

function ImageField({
	form,
	template: {
		name,
		label,
		configParam: {
			startProcessMessage,
			previousDeletionMessage,
			startUploadMessage,
			uploadSucceedMessage,
			noFileErrorMessage,
			notImageErrorMessage
		} = {}
	},
	handleForm: { onChange, onError },
	preName
}) {
	// setup the mounting status checker hook
	let _isMounted = useRef(true);

	// auto unsubscribe
	useEffect(
		// config the willUnmount cleanup
		() => () => {
			_isMounted.current = false;
		},
		[]
	);

	// setup the progress hook
	const [progress, setProgress] = useState(-1);

	// setup the progress message hook
	const [progressMessage, setProgressMessage] = useState('');

	// setup local onChange
	const fileOnChange = useCallback(
		event => {
			// start progress status
			setProgress(0);

			// set the progress message to inform the start
			setProgressMessage(
				startProcessMessage !== undefined
					? startProcessMessage
					: 'The processing started...'
			);

			// set a error message to lock final sending
			// should never be shown
			onError(name)('sending...');

			// start a promise resolved when the check of image finished
			new Promise((resolve, reject) => {
				// check if the file does not exist
				if (!event.target.files[0]) {
					// reject with an error
					reject(
						new Error(
							noFileErrorMessage !== undefined
								? noFileErrorMessage
								: 'No file provided...'
						)
					);
				}

				// retrieve image
				var file = event.target.files[0];

				// check the file is describe as image
				if (/^image\/.+$/.test(file.type)) {
					// resolve with the file
					resolve(file);
				} else {
					// otherwise reject with an error
					reject(
						new Error(
							notImageErrorMessage !== undefined
								? notImageErrorMessage
								: 'The provided file is not an image...'
						)
					);
				}
			})
				.then(file => {
					// check if the component is still mounted
					if (_isMounted.current) {
						// check if a previous value exist for the file key
						if (IMAGE_REGEX.test(form[name].value)) {
							// retrieve image data
							const { key } = JSON.parse(form[name].value);

							// set the progress message to inform of the deletion
							setProgressMessage(
								previousDeletionMessage !== undefined
									? previousDeletionMessage
									: 'The previous file is being deleted...'
							);

							// remove the file from S3
							return Storage.remove(key, {
								level: 'protected'
							}).then(() => file);
						}

						return file;
					}
				})
				.then(file => {
					// check if the component is still mounted
					if (_isMounted.current) {
						// set the progress message to inform the uploading
						setProgressMessage(
							startUploadMessage !== undefined
								? startUploadMessage
								: 'The file is being uploaded...'
						);

						// put the image to S3
						return Storage.put(`${Date.now()}_${file.name}`, file, {
							level: 'protected',
							contentType: 'image/*',
							progressCallback({ loaded, total }) {
								// check if the component is still mounted
								if (_isMounted.current) {
									// update the progress status
									setProgress((loaded / total) * 100);
								}
							}
						});
					}
				})
				// retrieve the user id
				.then(({ key }) => {
					// check if the component is still mounted
					if (_isMounted.current) {
						return Auth.currentCredentials().then(
							({ identityId }) => ({
								identityId,
								key
							})
						);
					}
				})
				.then(result => {
					// check if the component is still mounted
					if (_isMounted.current) {
						// setup the final progress message
						setProgressMessage(
							uploadSucceedMessage !== undefined
								? uploadSucceedMessage
								: 'The upload succeed!'
						);

						// setup the progress message auto clear after 1 seconds
						setTimeout(() => {
							// check if the component is still mounted
							if (_isMounted.current) {
								// reset the progress message
								setProgressMessage('');
							}
						}, 1000);

						// update the field
						onChange(name)({
							target: { value: JSON.stringify(result) }
						});

						// unset the error message
						onError(name)('');
					}
				})
				.catch(({ message }) => {
					// check if the component is still mounted
					if (_isMounted.current) {
						// unset the progress message
						setProgressMessage('');

						// set a error message
						onError(name)(message);
					}
				})
				.finally(() => {
					// check if the component is still mounted
					if (_isMounted.current) {
						// set the progress status to default one
						setProgress(-1);
					}
				});
		},
		[
			form,
			name,
			noFileErrorMessage,
			notImageErrorMessage,
			onChange,
			onError,
			previousDeletionMessage,
			startProcessMessage,
			startUploadMessage,
			uploadSucceedMessage
		]
	);

	return (
		<FormControl
			error={form[name].error !== '' && progressMessage === ''}
			fullWidth
			required
		>
			<Box display="none">
				<input
					id={`${
						preName !== undefined ? `${preName}_` : ''
					}${name}_input`}
					aria-describedby={`${
						preName !== undefined ? `${preName}_` : ''
					}${name}_text`}
					type="file"
					accept="image/*"
					onChange={fileOnChange}
					disabled={progressMessage !== ''}
				/>
			</Box>
			<Box display="flex" mt={2}>
				<label
					htmlFor={`${
						preName !== undefined ? `${preName}_` : ''
					}${name}_input`}
				>
					<Button
						component="span"
						variant="contained"
						color="secondary"
						startIcon={<PhotoCamera />}
						disabled={progressMessage !== ''}
					>
						{label}
					</Button>
				</label>
				{progress >= 0 && (
					<Box display="inline-flex" position="relative" ml={2}>
						<CircularProgress
							variant="determinate"
							value={progress}
						/>
						<Box
							display="flex"
							position="absolute"
							top={0}
							left={0}
							bottom={0}
							right={0}
							alignItems="center"
							justifyContent="center"
						>
							<Typography
								variant="caption"
								component="div"
								color="textSecondary"
							>{`${Math.round(progress)}%`}</Typography>
						</Box>
					</Box>
				)}
			</Box>
			<FormHelperText
				id={`${preName !== undefined ? `${preName}_` : ''}${name}_text`}
			>
				{progressMessage !== '' ? progressMessage : form[name].error}
			</FormHelperText>
		</FormControl>
	);
}

export default ImageField;
