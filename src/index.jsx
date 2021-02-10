import React from 'react';
import ReactDOM from 'react-dom';

import store from './store';

import { Provider } from 'react-redux';

import App from './App';

// render the React app in the #root DOM element
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
