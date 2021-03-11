import impLoader from './utils/impLoader';

// load all components
const HomeContainer = impLoader(() => import('./containers/HomeContainer'));
const Terms = impLoader(() => import('./components/Terms'));
const SignIn = impLoader(() => import('./containers/SignInContainer'));
const SignUp = impLoader(() => import('./containers/SignUpContainer'));
const SignUpConf = impLoader(() =>
	import('./containers/SignUpConfirmContainer')
);

// setup route constants
export const HOME = '/';
export const TERMS = '/mentions';
export const SIGN_IN = '/connexion';
export const SIGN_UP = '/inscription';
export const SIGN_UP_CONFIRM = '/inscription/confirmation';

// store all details about routes
const routes = [
	{ path: HOME, exact: true, component: HomeContainer },
	{ path: TERMS, exact: true, component: Terms },
	{ path: SIGN_IN, exact: true, component: SignIn, logged: false },
	{ path: SIGN_UP, exact: true, component: SignUp, logged: false },
	{ path: SIGN_UP_CONFIRM, exact: true, component: SignUpConf, logged: false }
];

export default routes;
