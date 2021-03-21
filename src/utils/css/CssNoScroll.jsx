import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

// define the style of the component
const styles = {
	// enable / disable scrolling in the body
	'@global': {
		body: {
			overflow: ({ scroll }) => (scroll ? 'auto' : 'hidden')
		}
	}
};

// configure default props
CssNoScroll.defaultProps = {
	scroll: false
};

// configure the prop types validation
CssNoScroll.propTypes = {
	scroll: PropTypes.bool.isRequired
};

function CssNoScroll() {
	return null;
}

export default withStyles(styles)(CssNoScroll);
