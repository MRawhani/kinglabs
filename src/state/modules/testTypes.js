import Vue from 'vue';
import api from '../../utils/api';

export const state = {
	types: [],
};

export const getters = {};

export const mutations = {
	SET_TYPES(state, typesList) {
		typesList.forEach((type, i) => {
			Vue.set(state.types, i, type);
		});
	},
	ADD_TYPE(state, newType) {
		state.types.push(newType);
	},
	DELETE_TYPE(state, typeId) {
		state.types = state.types.filter((type) => type.id !== typeId);
	},
	EDIT_TYPE(state, typeData) {
		state.types.filter((type, i) => {
			if (type.id === typeData.id) {
				Vue.set(state.types, i, typeData);
			}
		});
	},
};

export const actions = {
	getTestTypesList({ commit }) {
		return api.get('/testTypes').then((response) => {
			const { data } = response.data;
			commit('SET_TYPES', data);
			return data;
		});
	},
	saveType({ commit }, newType) {
		return api.post('/testTypes', newType).then((res) => {
			const { data } = res.data;
			commit('ADD_TYPE', data);
			return data;
		});
	},
	deleteType({ commit }, typeId) {
		return api.delete(`/testTypes/${typeId}`).then((res) => {
			const { data } = res.data;
			commit('DELETE_TYPE', typeId);
			return data;
		});
	},
	editType({ commit }, { typeData, typeId }) {
		return api.put(`/testTypes/${typeId}`, typeData).then((res) => {
			const { data } = res.data;
			commit('EDIT_TYPE', data);
			return data;
		});
	},
};
