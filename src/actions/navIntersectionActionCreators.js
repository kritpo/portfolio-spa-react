import * as ActionTypes from './types';

/**
 * redux action: set the nav intersection observer dependencies
 * @param {object} payload new intersection utilities
 */
export const updateNavIntersection = payload => ({
	type: ActionTypes.UPDATE_NAV_INTERSECTION,
	payload
});
