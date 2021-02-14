import Vue from 'vue';
import api from '../../utils/api';

export const state = {
	agents: [],
};

export const getters = {};

export const mutations = {
	SET_AGENTS(state, agentsList) {
		agentsList.forEach((agent, i) => {
			Vue.set(state.agents, i, agent);
		});
	},
	ADD_AGENT(state, newAgent) {
		state.agents.push(newAgent);
	},
	DELETE_AGENT(state, agentId) {
		state.agents = state.agents.filter((agent) => agent.id !== agentId);
	},
	EDIT_AGENT(state, agentData) {
		state.agents.filter((agent, i) => {
			if (agent.id === agentData.id) {
				Vue.set(state.agents, i, agentData);
			}
		});
	},
};

export const actions = {
	getAgentsList({ commit }) {
		return api.get('/agents').then((response) => {
			const { data } = response.data;
			commit('SET_AGENTS', data);
			return data;
		});
	},
	saveAgent({ commit }, newAgent) {
		console.log(newAgent);
		return api.post('/agents', newAgent).then((res) => {
			const { data } = res.data;
			commit('ADD_AGENT', data);
			return data;
		});
	},
	deleteAgent({ commit }, agentId) {
		return api.delete(`/agents/${agentId}`).then((res) => {
			const { data } = res.data;
			commit('DELETE_AGENT', agentId);
			return data;
		});
	},
	editAgent({ commit }, { agentData, agentId }) {
		return api.put(`/agents/${agentId}`, agentData).then((res) => {
			const { data } = res.data;
			commit('EDIT_AGENT', data);
			return data;
		});
	},
};
