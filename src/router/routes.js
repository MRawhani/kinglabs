import store from '../state/store';

export default [
	{
		path: '/',
		name: 'home',
		component: () => lazyLoadView(import('../pages/Home')),
		meta: {
			authRequired: true,
		},
	},
	{
		path: '/users',
		name: 'users',
		component: () => lazyLoadView(import('../pages/Users')),
		meta: {
			authRequired: true,
		},
	},
	{
		path: '/branches',
		name: 'branches',
		component: () => lazyLoadView(import('../pages/Branches')),
		meta: {
			authRequired: true,
		},
	},
	{
		path: '/login',
		name: 'login',
		component: () => lazyLoadView(import('../pages/Login')),
		meta: {
			authRequired: false,
			beforeResolve(to, from, next) {
				// If the user is already logged in
				store.getters['global/auth/isLoggedIn'] ? next({ name: 'home' }) : next();
			},
		},
	},
	{
		path: '/logout',
		name: 'logout',
		meta: {
			authRequired: true,
			beforeResolve(to, from, next) {
				store.dispatch('global/auth/logOut');
				next({ name: 'login', query: { redirectFrom: from.fullPath } });
			},
		},
	},
	{
		path: '/access-denied',
		name: 'accessDenied',
		component: () => lazyLoadView(import('../pages/AccessDenied')),
		props: true,
	},
	{
		path: '/404',
		name: '404',
		component: () => lazyLoadView(import('../pages/NotFound')),
		props: true,
	},
	// Redirect any unmatched routes to the 404 page.
	{
		path: '*',
		redirect: '404',
	},
];

function lazyLoadView(AsyncView) {
	const AsyncHandler = () => ({
		component: AsyncView,
		// A component to use while the component is loading.
		loading: require('../components/base/loading.vue').default,
		// Delay before showing the loading component.
		// Default: 200 (milliseconds)
		delay: 300,
		// A fallback component in case the timeout is exceeded
		// when loading the component.
		error: require('../components/base/timeout.vue').default,
		// Time before giving up trying to load the component.
		// Default: Infinity (milliseconds).
		timeout: 10000,
	});

	return Promise.resolve({
		functional: true,
		render(h, { data, children }) {
			return h(AsyncHandler, data, children);
		},
	});
}
