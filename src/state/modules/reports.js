import api from '../../utils/api';

export const state = {};

export const getters = {};

export const mutations = {};

export const actions = {
	getFinancialSummary() {
		return api.get('/reports/financial/summary').then((res) => {
			return res.data;
		});
	},
	getFinancialData() {
		return api.get('/reports/financial/data').then((res) => {
			return res.data.data.flat();
		});
	},
};
