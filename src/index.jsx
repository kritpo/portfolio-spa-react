import React from 'react';
import ReactDOM from 'react-dom';

import store from './store';

import Amplify from 'aws-amplify';

import config from './aws-exports';

import { Provider } from 'react-redux';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import App from './App';

// configure Amplify
Amplify.configure(config);

// render the React app in the #root DOM element
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<GoogleReCaptchaProvider
				reCaptchaKey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY}
			>
				<App />
			</GoogleReCaptchaProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
