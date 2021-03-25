import impLoader from './utils/impLoader';

// load all components
const Home = impLoader(() => import('./containers/HomeContainer'));
const Portfolio = impLoader(() => import('./containers/PortfolioContainer'));
const Terms = impLoader(() => import('./containers/TermsContainer'));
const SignIn = impLoader(() => import('./containers/SignInContainer'));
const SignUp = impLoader(() => import('./containers/SignUpContainer'));
const SUConf = impLoader(() => import('./containers/SignUpConfirmContainer'));
const CVList = impLoader(() => import('./containers/CVListContainer'));
const CVCreate = impLoader(() => import('./containers/CVCreateContainer'));
const CVUpdate = impLoader(() => import('./containers/CVUpdateContainer'));

// setup route constants
export const HOME = '/';
export const PORTFOLIO = '/cv/:username';
export const TERMS = '/terms';
export const SIGN_IN = '/sign-in';
export const SIGN_UP = '/sign-up';
export const SIGN_UP_CONFIRM = '/sign-up/confirm';
export const CV_LIST = '/cv-list';
export const CV_CREATE = '/cv-list/create';
export const CV_UPDATE = '/cv-list/update';

// store all details about routes
const routes = [
	{ path: HOME, exact: true, component: Home },
	{ path: PORTFOLIO, exact: true, component: Portfolio },
	{ path: TERMS, exact: true, component: Terms },
	{ path: SIGN_IN, exact: true, component: SignIn, logged: false },
	{ path: SIGN_UP, exact: true, component: SignUp, logged: false },
	{ path: SIGN_UP_CONFIRM, exact: true, component: SUConf, logged: false },
	{ path: CV_LIST, exact: true, component: CVList, logged: true },
	{ path: CV_CREATE, exact: true, component: CVCreate, logged: true },
	{ path: CV_UPDATE, exact: true, component: CVUpdate, logged: true }
];

export default routes;
