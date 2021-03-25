import Amplify, { Auth } from 'aws-amplify';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Provider } from 'react-redux';

import App from './App';
import config from './aws-exports';
import store from './store';

// configure Amplify
Amplify.configure({
	Auth: {
		identityPoolId: config['aws_cognito_identity_pool_id'],
		region: config['aws_cognito_region'],
		userPoolId: config['aws_user_pools_id'],
		userPoolWebClientId: config['aws_user_pools_web_client_id']
	},
	API: {
		endpoints: [
			{
				name: 'PortfolioAPIServerless',
				endpoint: process.env.REACT_APP_API_DOMAIN_NAME,
				custom_header: async () => {
					// retrieve the user token
					const jwtToken = await Auth.currentSession()
						.then(session => session.getIdToken().getJwtToken())
						.catch(() => null);

					return {
						Authorization:
							jwtToken !== null ? `Bearer ${jwtToken}` : undefined
					};
				}
			}
		]
	},
	Storage: {
		AWSS3: {
			bucket: config['aws_user_files_s3_bucket'],
			region: config['aws_user_files_s3_bucket_region']
		}
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
