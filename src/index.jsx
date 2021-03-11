import React from 'react';
import ReactDOM from 'react-dom';

import store from './store';

import Amplify from 'aws-amplify';

import config from './aws-exports';

import { Provider } from 'react-redux';

import { CookiesProvider } from 'react-cookie';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import App from './App';

// configure Amplify
Amplify.configure({
	Auth: {
		region: config['aws_cognito_region'],
		userPoolId: config['aws_user_pools_id'],
		userPoolWebClientId: config['aws_user_pools_web_client_id']
	},
	API: {
		endpoints: [
			{
				name: 'PortfolioAPIServerless',
				endpoint: process.env.REACT_APP_API_DOMAIN_NAME
			}
		]
	}
});

// render the React app in the #root DOM element
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<CookiesProvider>
				<GoogleReCaptchaProvider
					reCaptchaKey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY}
					language="fr"
					scriptProps={{
						defer: true,
						appendTo: 'body'
					}}
				>
					<App />
				</GoogleReCaptchaProvider>
			</CookiesProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
