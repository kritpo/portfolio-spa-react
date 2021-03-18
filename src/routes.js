import impLoader from './utils/impLoader';

// load all components
const HomeContainer = impLoader(() => import('./containers/HomeContainer'));
const PortfolioContainer = impLoader(() =>
	import('./containers/PortfolioContainer')
);
const Terms = impLoader(() => import('./components/Terms'));
const SignIn = impLoader(() => import('./containers/SignInContainer'));
const SignUp = impLoader(() => import('./containers/SignUpContainer'));
const SUConf = impLoader(() => import('./containers/SignUpConfirmContainer'));
const User = impLoader(() => import('./containers/UserContainer'));
const CVCreate = impLoader(() => import('./containers/CVCreateContainer'));
const CVUpdate = impLoader(() => import('./containers/CVUpdateContainer'));

// setup route constants
export const HOME = '/';
export const CV = '/cv/:username';
export const TERMS = '/mentions';
export const SIGN_IN = '/connexion';
export const SIGN_UP = '/inscription';
export const SIGN_UP_CONFIRM = '/inscription/confirmation';
export const CVS = '/utilisateur';
export const CV_CREATE = '/utilisateur/creer';
export const CV_UPDATE = '/utilisateur/modifier';

// store all details about routes
const routes = [
	{ path: HOME, exact: true, component: HomeContainer },
	{ path: CV, exact: true, component: PortfolioContainer },
	{ path: TERMS, exact: true, component: Terms },
	{ path: SIGN_IN, exact: true, component: SignIn, logged: false },
	{ path: SIGN_UP, exact: true, component: SignUp, logged: false },
	{ path: SIGN_UP_CONFIRM, exact: true, component: SUConf, logged: false },
	{ path: CVS, exact: true, component: User, logged: true },
	{ path: CV_CREATE, exact: true, component: CVCreate, logged: true },
	{ path: CV_UPDATE, exact: true, component: CVUpdate, logged: true }
];

export default routes;
