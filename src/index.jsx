import React from 'react';
import ReactDOM from 'react-dom';

import store from './store';

import Amplify from 'aws-amplify';

import config from './aws-exports';

import { Provider } from 'react-redux';

import App from './App';

// configure Amplify
Amplify.configure(config);

// render the React app in the #root DOM element
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
