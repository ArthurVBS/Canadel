import { Commit, Dispatch } from 'vuex';
import Vuex from 'vuex';
import { ACTION } from '@/constants/VuexConstants';
import loadingStoreModule from '@/stores/modules/LoadingStoreModule';
import notificationStoreModule from '@/stores/modules/NotificationStoreModule';
import productsStoreModule from '@/stores/modules/ProductsStoreModule';

interface context {
  commit: Commit;
  dispatch: Dispatch;
}

const store = new Vuex.Store({
  modules: {
    loading: loadingStoreModule,
    notification: notificationStoreModule,
    product: productsStoreModule,
  },
  actions: {
    clearAll(context: context) {
      context.dispatch(ACTION.LOADING.HIDE);
      context.dispatch(ACTION.NOTIFICATION.HIDE);
      context.dispatch(ACTION.PRODUCTS.CLEAR);
    },
  },
});

export default store;
export type { context };
