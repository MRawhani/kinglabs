import api from '../../utils/api';

export const state = {};

export const getters = {};

export const mutations = {};

export const actions = {
	getFinancialSummary(context, filters) {
		return api.get(`/reports/financial/summary?${filtersToQuery(filters)}`).then((res) => {
			return res.data;
		});
	},
	getFinancialData(context, filters) {
		return api.get(`/reports/financial/data?${filtersToQuery(filters)}`).then((res) => {
			return res.data.data.flat();
		});
	},
};

function filtersToQuery(filters) {
	return `branches=${filters.branches}&from=${filters.from}&to=${filters.to}`;
}
