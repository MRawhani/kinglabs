import Vue from 'vue';
import api from '../../utils/api';

export const state = {
	invoices: [],
};

export const getters = {};

export const mutations = {
	SET_INVOICES(state, invoicesList) {
		invoicesList.forEach((invoice, i) => {
			Vue.set(state.invoices, i, invoice);
		});
	},
	ADD_INVOICE(state, newInvoice) {
		state.invoices.push(newInvoice);
	},
	DELETE_INVOICE(state, invoiceId) {
		state.invoices = state.invoices.filter((invoice) => invoice.id !== invoiceId);
	},
	EDIT_INVOICE(state, invoiceData) {
		state.invoices.filter((invoice, i) => {
			if (invoice.id === invoiceData.id) {
				Vue.set(state.invoices, i, invoiceData);
			}
		});
	},
};

export const actions = {
	getInvoicesList({ commit }) {
		return api.get('/invoices').then((response) => {
			const { data } = response.data;
			commit('SET_INVOICES', data);
			return data;
		});
	},
	saveInvoice({ commit }, newInvoice) {
		return api.post('/invoices', newInvoice).then((res) => {
			const { data } = res.data;
			commit('ADD_INVOICE', data);
			return data;
		});
	},
	deleteInvoice({ commit }, invoiceId) {
		return api.delete(`/invoices/${invoiceId}`).then((res) => {
			const { data } = res.data;
			commit('DELETE_INVOICE', invoiceId);
			return data;
		});
	},
	editInvoice({ commit }, { invoiceData, invoiceId }) {
		return api.put(`/invoices/${invoiceId}`, invoiceData).then((res) => {
			const { data } = res.data;
			commit('EDIT_INVOICE', data);
			return data;
		});
	},
	editRemain(context, invoiceId) {
		return api.put(`/invoices/${invoiceId}/remain`).then((res) => {
			const { data } = res.data;
			return data;
		});
	},
};
