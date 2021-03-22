import React, { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';

import CookieChecker from '../components/CookieChecker';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

function CookieCheckerContainer({ ...props }) {
	// setup the cookies
	const [cookies, setCookies] = useCookies(['agreement']);

	// setup the dialog status hook
	const [open, setOpen] = useState(true);

	// check if the cookie agreement is already accorded
	useEffect(() => {
		// check if the cookie agreement is defined
		if (cookies.agreement === 'agree') {
			// update the dialog status
			setOpen(false);
		}
	}, [cookies.agreement]);

	// setup the agree callback
	const handleAgree = useCallback(() => {
		// set the agreement cookie
		setCookies('agreement', 'agree', {
			path: '/',
			sameSite: true
		});
	}, [setCookies]);

	// setup the disagree callback
	const handleDisagree = useCallback(() => {
		// redirect the user
		window.location = 'https://www.google.fr/';
	}, []);

	return (
		<CookieChecker
			open={open}
			handleAgree={handleAgree}
			handleDisagree={handleDisagree}
			{...props}
		/>
	);
}

export default connect(mapStateToProps)(CookieCheckerContainer);
