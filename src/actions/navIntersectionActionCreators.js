import { UPDATE_NAV_INTERSECTION } from './types';

/**
 * redux action: set the nav intersection observer dependencies
 * @param {object} payload new intersection utilities
 * @returns the action
 */
export const updateNavIntersection = ({ ref, inView, entry }) => ({
	type: UPDATE_NAV_INTERSECTION,
	payload: { ref, inView, entry }
});
