import Vue from "vue";
import Vuex from "vuex";

import Api from "../services/zenaton";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    workflow_instances: []
  },
  mutations: {
    addWorkflowInstance(state, instance) {
      state.workflow_instances = [...state.workflow_instances, instance];
    }
  },
  actions: {
    async dispatchWorkflow({ commit }, { name, input }) {
      console.log("dispatchWorkflow", name, input);

      const id = await Api.dispatch(name, input);

      commit("addWorkflowInstance", { name, id });
    },
    async sendEvent(context, { event, workflowId }) {
      console.log("sendEvent", workflowId, event);

      await Api.sendEvent(workflowId, event.name, event.data);
    }
  },
  modules: {}
});
