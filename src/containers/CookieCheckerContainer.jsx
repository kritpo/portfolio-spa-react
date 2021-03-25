import React, { useCallback, useState } from 'react';
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
	const [open, setOpen] = useState(cookies.agreement !== 'agree');

	// setup the agree callback
	const handleAgree = useCallback(() => {
		// set the agreement cookie
		setCookies('agreement', 'agree', {
			path: '/',
			sameSite: true
		});

		// close the dialog
		setOpen(false);
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
