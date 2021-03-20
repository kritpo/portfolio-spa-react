import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import { darkMode, language, mainResume, mainResumeLanguages, navIntersection, resume, resumeLanguages, username, webpSupport } from './reducers';

// configure the root reducer by combining all reducers
const rootReducer = combineReducers({
	resume,
	resumeLanguages,
	mainResume,
	mainResumeLanguages,
	navIntersection,
	darkMode,
	webpSupport,
	username,
	language
});

// create a redux store
export default createStore(
	rootReducer,

	composeWithDevTools(applyMiddleware(thunk))
);
