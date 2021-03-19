import React, { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import { connect } from 'react-redux';

import { useCookies } from 'react-cookie';

import PreferenceMenu from '../../components/Nav/PreferenceMenu';

// configure the states to pass as props to the component
const mapStateToProps = ({ darkMode }, ...props) => ({
	darkMode,
	...props
});

// configure the prop types validation
PreferenceMenuContainer.propTypes = {
	darkMode: PropTypes.bool.isRequired
};

function PreferenceMenuContainer({ darkMode, ...props }) {
	// setup the cookies hook
	const [, setCookies] = useCookies(['darkMode']);

	// setup the dark mode toggler
	const darkModeToggle = useCallback(() => {
		setCookies('darkMode', darkMode ? 'false' : 'true', {
			path: '/',
			sameSite: true
		});
	}, [darkMode, setCookies]);

	return (
		<PreferenceMenu
			darkMode={darkMode}
			darkModeToggle={darkModeToggle}
			{...props}
		/>
	);
}

export default connect(mapStateToProps)(PreferenceMenuContainer);
