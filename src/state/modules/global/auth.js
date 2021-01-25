import api from '../../../utils/api';
import { getState, saveState } from '../../../utils/local-stoage-utils';

export const state = {
	currentUser: getState('currentUser') || null,
};

export const getters = {
	// is the user currently logged in or not.
	isLoggedIn(state) {
		return !!state.currentUser;
	},
};

export const mutations = {
	SET_CURRENT_USER(state, newUser) {
		state.currentUser = newUser;
		saveState('currentUser', newUser);
		setAuthHeaders(state);
	},

	CLEAR_CURRENT_USER(state) {
		state.currentUser = null;
		localStorage.removeItem('currentUser');
		setAuthHeaders(state);
	},
};

export const actions = {
	// This is automatically run in `src/state/store.js` when the app starts
	init({ state }) {
		setAuthHeaders(state);
	},

	async logIn({ commit }, { email, password } = {}) {
		// call the login api
		const { data } = await api.post('/users/login', {
			email,
			password,
		});
		if (!data.suspended) {
			commit('SET_CURRENT_USER', data);
		}

		return data;
	},

	// Logs out the current user.
	logOut({ commit }) {
		commit('CLEAR_CURRENT_USER');
	},
};

// set the auth headers in axios requests
function setAuthHeaders(state) {
	api.defaults.headers.common.Authorization = state.currentUser ? state.currentUser.token : '';
}
