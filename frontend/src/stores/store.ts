import {Commit, Dispatch} from "vuex";
import Vuex from 'vuex'
import {ACTION, MODULE} from "@/constants/VuexConstants";
import loadingStoreModule from "@/stores/modules/LoadingStoreModule";

interface context {
  commit: Commit
  dispatch: Dispatch,
}

const store = new Vuex.Store({
  modules: {
    loading: loadingStoreModule
  },
  actions: {
    clearAll(context: context) {
      context.dispatch(ACTION.LOADING.HIDE)
    }
  }
})

export default store;
export type { context }
