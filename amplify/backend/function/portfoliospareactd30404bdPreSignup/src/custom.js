require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = (event, context, callback) => {
	// check if the client metadata is not defined
	if (event.request.clientMetadata === undefined) {
		callback(
			new Error('Google ReCaptcha Check: Missing validation data'),
			event
		);
	}

	// setup request
	const request = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		body: `secret=${encodeURIComponent(
			process.env.GOOGLE_RECAPTCHA_SECRET
		)}&response=${encodeURIComponent(
			event.request.clientMetadata.recaptchaToken
		)}`
	};

	// check the token
	fetch('https://www.google.com/recaptcha/api/siteverify', request)
		.then(response => {
			// check if no error occurred
			if (response.ok) {
				// return the response to continue
				return response;
			} else {
				// otherwise raise an exception with HTTP error
				throw new Error(
					'Error ' + response.status + ': ' + response.statusText
				);
			}
		})
		// parse the response as JSON
		.then(response => response.json())
		.then(({ success }) => {
			// check if the token check succeed
			if (success) {
				callback(null, event);
			} else {
				throw new Error('Google ReCaptcha Check: Verification failed');
			}
		})
		.catch(error => {
			callback(error, event);
		});
};
