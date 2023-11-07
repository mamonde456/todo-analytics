import { createLogger, createStore, Store } from "vuex";
import type { InjectionKey } from "vue";

// define your typings for the store state
export interface State {
  category: string;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export default createStore({
  state: {
    category: "제목",
  },
  mutations: {
    setCategory(state: State, category: string) {
      state.category = category;
    },
  },
  actions: {},
  modules: {},
});
