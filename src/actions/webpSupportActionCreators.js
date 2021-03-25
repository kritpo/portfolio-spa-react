import { SET_WEBP_SUPPORT } from './types';

/**
 * check the webp image format support
 */
export const checkWebpSupport = () => dispatch => {
	// check if the create image bitmap is supported
	if (!createImageBitmap) {
		// set the webp support state to false
		return dispatch(setWebpSupport(false));
	}

	// setup a sample basic webp image
	const webpData =
		'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAgA0JaQAA3AA/vuUAAA=';

	// fetch the sample webp image
	return (
		fetch(webpData)
			// retrieve data in blob image format
			.then(response => response.blob())
			// create image
			.then(blob => createImageBitmap(blob))
			// set the webp support state to true
			.then(() => {
				dispatch(setWebpSupport(true));
			})
			// set the webp support state to false, as an error occurs
			.catch(() => {
				dispatch(setWebpSupport(false));
			})
	);
};

/**
 * redux action: check if the browser support the webp image format
 * @param {boolean} payload if the webp image format is supported
 * @returns the action
 */
export const setWebpSupport = payload => ({
	type: SET_WEBP_SUPPORT,
	payload
});
