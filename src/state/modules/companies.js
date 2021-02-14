import Vue from 'vue';
import api from '../../utils/api';

export const state = {
	companies: [],
};

export const getters = {};

export const mutations = {
	SET_COMPANIES(state, companiesList) {
		companiesList.forEach((company, i) => {
			Vue.set(state.companies, i, company);
		});
	},
	ADD_COMPANY(state, newCompany) {
		state.companies.push(newCompany);
	},
	DELETE_COMPANY(state, companyId) {
		state.companies = state.companies.filter((company) => company.id !== companyId);
	},
	EDIT_COMPANY(state, companyData) {
		state.companies.filter((company, i) => {
			if (company.id === companyData.id) {
				Vue.set(state.companies, i, companyData);
			}
		});
	},
};

export const actions = {
	getCompaniesList({ commit }) {
		return api.get('/companies').then((response) => {
			const { data } = response.data;
			commit('SET_COMPANIES', data);
			return data;
		});
	},
	saveCompany({ commit }, newCompany) {
		return api.post('/companies', newCompany).then((res) => {
			const { data } = res.data;
			commit('ADD_COMPANY', data);
			return data;
		});
	},
	deleteCompany({ commit }, companyId) {
		return api.delete(`/companies/${companyId}`).then((res) => {
			const { data } = res.data;
			commit('DELETE_COMPANY', companyId);
			return data;
		});
	},
	getCompany(context, companyId) {
		return api.get(`/companies/${companyId}`).then((res) => {
			return res.data.data;
		});
	},
	editCompany({ commit }, { companyData, companyId }) {
		return api.put(`/companies/${companyId}`, companyData).then((res) => {
			const { data } = res.data;
			commit('EDIT_COMPANY', data);
			return data;
		});
	},
};
