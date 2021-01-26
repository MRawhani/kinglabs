import Vue from 'vue';
import api from '../../utils/api';

export const state = {
	users: [],
};

export const getters = {};

export const mutations = {
	SET_USERS(state, usersList) {
		usersList.forEach((user, i) => {
			Vue.set(state.users, i, user);
		});
	},
	ADD_USER(state, newUser) {
		state.users.push(newUser);
	},
	DELETE_USER(state, userId) {
		state.users = state.users.filter((user) => user.id !== userId);
	},
	EDIT_USER(state, userData) {
		state.users.filter((user, i) => {
			if (user.id === userData.id) {
				Vue.set(state.users, i, userData);
			}
		});
	},
	SUSPEND_USER(state, userId) {
		const userIndex = state.users.findIndex((user) => user.id === userId);
		const user = state.users[userIndex];
		user.suspended = 1;
		Vue.set(state.users, userIndex, user);
	},
	ACTIVATE_USER(state, userId) {
		const userIndex = state.users.findIndex((user) => user.id === userId);
		const user = state.users[userIndex];
		user.suspended = 0;
		Vue.set(state.users, userIndex, user);
	},
};

export const actions = {
	getUsersList({ commit }) {
		return api.get('/users').then((response) => {
			const data = response.data;
			commit('SET_USERS', data);
			return data;
		});
	},
	saveUser({ commit }, newUser) {
		return api.post('/users/', newUser).then((res) => {
			const data = res.data;
			commit('ADD_USER', data);
			return data;
		});
	},
	deleteUser({ commit }, userId) {
		return api.delete(`/users/${userId}`).then((res) => {
			const data = res.data;
			commit('DELETE_USER', userId);
			return data;
		});
	},
	editUser({ commit }, { userData, userId }) {
		return api.put(`/users/${userId}`, userData).then((res) => {
			const data = res.data;
			commit('EDIT_USER', data);
			return data;
		});
	},
	suspendUser({ commit }, userId) {
		return api.put(`/users/${userId}/suspend`).then((res) => {
			commit('SUSPEND_USER', userId);
			return res.data;
		});
	},
	activateUser({ commit }, userId) {
		return api.put(`/users/${userId}/activate`).then((res) => {
			commit('ACTIVATE_USER', userId);
			return res.data;
		});
	},
};
