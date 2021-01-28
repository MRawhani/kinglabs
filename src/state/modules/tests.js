import Vue from 'vue';
import api from '../../utils/api';

export const state = {
	tests: [],
};

export const getters = {};

export const mutations = {
	SET_TESTS(state, testsList) {
		testsList.forEach((test, i) => {
			Vue.set(state.tests, i, test);
		});
	},
	ADD_TEST(state, newTest) {
		state.tests.push(newTest);
	},
	DELETE_TEST(state, testId) {
		state.tests = state.tests.filter((test) => test.id !== testId);
	},
	EDIT_TEST(state, testData) {
		state.tests.filter((test, i) => {
			if (test.id === testData.id) {
				Vue.set(state.tests, i, testData);
			}
		});
	},
};

export const actions = {
	getTestsList({ commit }) {
		return api.get('/tests').then((response) => {
			const { data } = response.data;
			commit('SET_TESTS', data);
			return data;
		});
	},
	saveTest({ commit }, newTest) {
		return api.post('/tests', newTest).then((res) => {
			const { data } = res.data;
			commit('ADD_TEST', data);
			return data;
		});
	},
	deleteTest({ commit }, testId) {
		return api.delete(`/tests/${testId}`).then((res) => {
			const { data } = res.data;
			commit('DELETE_TEST', testId);
			return data;
		});
	},
	editTest({ commit }, { testData, testId }) {
		return api.put(`/tests/${testId}`, testData).then((res) => {
			const { data } = res.data;
			commit('EDIT_TEST', data);
			return data;
		});
	},
};
