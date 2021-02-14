import api from '../../utils/api';

export const state = {};

export const getters = {};

export const mutations = {};

export const actions = {
	getUserPermissions(context, userId) {
		return api.get(`/permissions/${userId}`).then((res) => {
			return res.data;
		});
	},
	saveUserPermissions(context, data) {
		return api.post('/permissions', data).then((res) => {
			return res.data;
		});
	},
	editUserPermissions(context, data) {
		return api.put(`/permissions`, data).then((res) => {
			return res.data;
		});
	},
};
