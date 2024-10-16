import { createStore } from 'vuex';

import coachesModules from './modules/coaches/index.js';
import requestsModules from './modules/requests/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    coaches: coachesModules,
    requests: requestsModules,
    auth: authModule,
  },
  // state() {
  //   return {
  //     userId: 'c3',
  //   };
  // },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
