import Vue from 'vue';
import api from '../../utils/api';

export const state = {
	branches: [],
};

export const getters = {};

export const mutations = {
	SET_BRANCHES(state, branchesList) {
		branchesList.forEach((branch, i) => {
			Vue.set(state.branches, i, branch);
		});
	},
	ADD_BRANCH(state, newBranch) {
		state.branches.push(newBranch);
	},
	DELETE_BRANCH(state, branchId) {
		state.branches = state.branches.filter((branch) => branch.id !== branchId);
	},
	EDIT_BRANCH(state, branchData) {
		state.branches.filter((branch, i) => {
			if (branch.id === branchData.id) {
				Vue.set(state.branches, i, branchData);
			}
		});
	},
};

export const actions = {
	getBranchesList({ commit }) {
		return api.get('/branches').then((response) => {
			const { data } = response.data;
			commit('SET_BRANCHES', data);
			return data;
		});
	},
	saveBranch({ commit }, newBranch) {
		return api.post('/branches', newBranch).then((res) => {
			const { data } = res.data;
			commit('ADD_BRANCH', data);
			return data;
		});
	},
	deleteBranch({ commit }, branchId) {
		return api.delete(`/branches/${branchId}`).then((res) => {
			const { data } = res.data;
			commit('DELETE_BRANCH', branchId);
			return data;
		});
	},
	editBranch({ commit }, { branchData, branchId }) {
		return api.put(`/branches/${branchId}`, branchData).then((res) => {
			const { data } = res.data;
			commit('EDIT_BRANCH', data);
			return data;
		});
	},
};
