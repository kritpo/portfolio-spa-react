import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import {
	resume,
	resumeLanguages,
	mainResume,
	mainResumeLanguages,
	navIntersection,
	darkMode,
	webpSupport,
	username
} from './reducers';

// configure the root reducer by combining all reducers
const rootReducer = combineReducers({
	resume,
	resumeLanguages,
	mainResume,
	mainResumeLanguages,
	navIntersection,
	darkMode,
	webpSupport,
	username
});

// create a redux store
export default createStore(
	rootReducer,

	composeWithDevTools(applyMiddleware(thunk))
);
