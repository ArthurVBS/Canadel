import { context } from '@/stores/store';
import { ACTION, GETTER, MUTATION } from '@/constants/VuexConstants';

export interface state {
  show: boolean;
}

export const initialState = {
  show: false,
} as state;

/**
 * Vuex loading store module.
 */
const loadingStoreModule = {
  namespaced: true,
  state: (): state => initialState,
  mutations: {
    /**
     * Sets the loading to false.
     * @param state - The state to be mutated.
     */
    [MUTATION.LOADING.SET_SHOW_FALSE]: (state: state): void => {
      state.show = false;
    },

    /**
     * Sets the loading to true.
     * @param state - The state to be mutated.
     */
    [MUTATION.LOADING.SET_SHOW_TRUE]: (state: state): void => {
      state.show = true;
    },
  },
  actions: {
    /**
     * Calls the mutation to hide.
     * @param context - The context to be commited.
     */
    [ACTION.LOADING.HIDE]: (context: context): void => {
      context.commit(MUTATION.LOADING.SET_SHOW_FALSE);
    },

    /**
     * Calls the mutation to show.
     * @param context - The context to be commited.
     */
    [ACTION.LOADING.SHOW]: (context: context): void => {
      context.commit(MUTATION.LOADING.SET_SHOW_TRUE);
    },
  },
  getters: {
    /**
     * Gets the show state.
     * @param state - The state to be accessed.
     * @returns - The show state.
     */
    [GETTER.LOADING.SHOW]: (state: state) => {
      return state.show;
    },
  },
};

export default loadingStoreModule;
