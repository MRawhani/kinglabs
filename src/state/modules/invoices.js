import Vue from 'vue';
import api from '../../utils/api';
import { dataTableQuery } from '../../utils/helpers';

export const state = {
	items: [],
};

export const getters = {
	active(state, rootState, getters, rootGetters) {
		const oldItems = state.items.filter((item) => item.state !== 1);
		const newItems = state.items
			.filter((item) => item.state === 1)
			.map((item) => {
				return {
					id: item.id,
					invoice_id: item.id,
					branch: rootGetters['currentBranch'].name,
					delivery_at: item.delivery_date,
					remain: item.remain,
					state: item.state,
					name: item.agents[0].name,
					test: item.agents[0].testName,
				};
			});

		return [...oldItems, ...newItems];
	},
};

export const mutations = {
	SET_INVOICES(state, invoicesList) {
		state.items = [];

		invoicesList.forEach((invoice, i) => {
			Vue.set(state.items, i, invoice);
		});
	},
	ADD_INVOICE(state, invoice) {
		if (invoice.id) state.items.push(invoice);
		else {
			const id = Math.max(...state.items.map((item) => item.id)) + 1;
			state.items.push({
				id,
				...invoice,
				state: 1,
			});
		}
	},
	EDIT_INVOICE(state, invoiceId) {
		const current = state.items.find((invoice) => invoice.id === invoiceId);
		current.remain = 0;

		state.items.filter((invoice, i) => {
			if (invoice.id === invoiceId) {
				Vue.set(state.items, i, current);
			}
		});
	},
};

export const actions = {
	getInvoicesList({ commit }, options) {
		return api.get(`/invoices?${dataTableQuery(options)}`).then((response) => {
			const { data } = response.data;
			commit('SET_INVOICES', data);
			return data;
		});
	},
	saveInvoice({ commit }, newInvoice) {
		commit('ADD_INVOICE', newInvoice);

		// return api.post('/invoices', newInvoice).then((res) => {
		// 	return res.data;
		// });
	},
	editRemain({ commit }, invoiceId) {
		commit('EDIT_INVOICE', invoiceId);

		// return api.put(`/invoices/${invoiceId}/remain`).then((res) => {
		// 	const { data } = res.data;
		// 	return data;
		// });
	},

	async sync({ state, dispatch }) {
		const requests = [];
		const createdResults = [];
		const items = state.items;

		const newInvoices = items.filter((invoice) => invoice.state === 1);
		const editedInvoices = items.filter((invoice) => invoice.state === 2);

		newInvoices.forEach(async (invoice) => {
			requests.push(api.post('/invoices', invoice));
		});

		const results = await Promise.all(requests);
		results.forEach(({ data }, i) => {
			createdResults.push({
				old: newInvoices[i].id,
				new: data.data.id,
			});
		});

		requests.length = 0;

		editedInvoices.forEach((invoice) => {
			requests.push(api.put(`/invoices/${invoice.id}/remain`));
		});

		await Promise.all(requests);
		await dispatch('results/_sync', createdResults, { root: true });
	},
};
