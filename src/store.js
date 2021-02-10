import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import * as Reducers from './reducers';

// configure the root reducer by combining all reducers
const rootReducer = combineReducers({
	resume: Reducers.resume,
	navIntersection: Reducers.navIntersection
});

// create a redux store
export default createStore(
	rootReducer,

	composeWithDevTools(applyMiddleware(thunk))
);
