import * as ActionTypes from './types';

/**
 * redux action: set the nav intersection observer dependencies
 * @param {object} payload new intersection utilities
 */
export const updateNavIntersection = ({ ref, inView, entry }) => ({
	type: ActionTypes.UPDATE_NAV_INTERSECTION,
	payload: { ref, inView, entry }
});
