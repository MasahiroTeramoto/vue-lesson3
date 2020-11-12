import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tasks: [],
    nextTaskId: 1,
    statusFilter: 'すべて'
  },
  getters: {
    filteredTaskList: state => {
      if (state.statusFilter === 'すべて') {
        return state.tasks;
      } else {
        return state.tasks.filter(task => task.status === state.statusFilter);
      }
    }
  },
  mutations: {
    addTask(state, comment) {
      state.tasks.push({
        id: state.nextTaskId,
        comment,
        status: '作業中'
      });
      state.nextTaskId++;
    },
    deleteTask(state, { id }) {
      const index = state.tasks.findIndex(task => task.id === id);
      state.tasks.splice(index, 1);
    },
    changeTaskStatus(state, { id }) {
      const index = state.tasks.findIndex(task => task.id === id);
      const taskStatus = state.tasks[index].status;

      if (taskStatus === '作業中') {
        state.tasks[index].status = '完了';
      } else if (taskStatus === '完了') {
        state.tasks[index].status = '作業中';
      }
    },
    changeStatusFilter(state, status) {
      state.statusFilter = status;
    }
  }
});

export default store;
