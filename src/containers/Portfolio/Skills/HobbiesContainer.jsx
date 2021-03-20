import React from 'react';
import { connect } from 'react-redux';

import Hobbies from '../../../components/Portfolio/Skills/Hobbies';

// configure the states to pass as props to the component
const mapStateToProps = ({ language }, ...props) => ({
	language,
	...props
});

function HobbiesContainer({ ...props }) {
	return <Hobbies {...props} />;
}

export default connect(mapStateToProps)(HobbiesContainer);
