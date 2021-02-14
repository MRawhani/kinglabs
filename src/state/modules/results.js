import api from '../../utils/api';

export const state = {};

export const getters = {};

export const mutations = {};

export const actions = {
	saveResult(context, newResult) {
		return api.post('/testResults', newResult).then((res) => {
			const { data } = res.data;
			return data;
		});
	},
	getResult(context, id) {
		return api.get(`/testResults/${id}`).then((res) => {
			const { data } = res.data;
			return data;
		});
	},
	editResult(context, { resultData, resultId }) {
		return api.put(`/testResults/${resultId}`, resultData).then((res) => {
			const { data } = res.data;
			return data;
		});
	},
	editDelivered(context, { delivered, resultId }) {
		return api.put(`/testResults/${resultId}/deliver`, { delivered }).then((res) => {
			const { data } = res.data;
			return data;
		});
	},
};
