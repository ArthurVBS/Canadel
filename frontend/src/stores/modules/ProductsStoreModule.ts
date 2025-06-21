import { context } from '@/stores/store';
import { ACTION, GETTER, MUTATION } from '@/constants/VuexConstants';
import { Product } from '@/types/Product';

export interface state {
  products: Product[];
}

export const initialState = {
  products: [],
} as state;

/**
 * Vuex products store module.
 */
const productsStoreModule = {
  namespaced: true,
  state: (): state => initialState,
  mutations: {
    /**
     * Adds or updates a product.
     * @param state - The state to be mutated.
     * @param product - The product to be added or updated.
     */
    [MUTATION.PRODUCTS.ADD_OR_UPDATE_PRODUCT]: (state: state, product: Product): void => {
      const alreadyExists = state.products.some((currentProduct) => {
        return currentProduct.id === product.id;
      });

      if (!alreadyExists) {
        state.products.push(product);
      } else {
        state.products = state.products.map((currentProduct) => {
          return currentProduct.id === product.id ? product : currentProduct;
        });
      }
    },

    /**
     * Sets the products to initial state.
     * @param state - The state to be mutated.
     */
    [MUTATION.PRODUCTS.CLEAR]: (state: state): void => {
      state.products = [];
    },

    /**
     * Sets the products data.
     * @param state - The state to be mutated.
     * @param products - The products to be set.
     */
    [MUTATION.PRODUCTS.SET_PRODUCTS]: (state: state, products: Product[]): void => {
      state.products = products;
    },

    /**
     * Removes a product.
     * @param state - The state to be mutated.
     * @param productId - The product id to be removed.
     */
    [MUTATION.PRODUCTS.REMOVE_PRODUCT]: (state: state, productId: number): void => {
      state.products = state.products.filter((currentProduct) => currentProduct.id !== productId);
    },
  },
  actions: {
    /**
     * Calls the mutation to add or update a product.
     * @param context - The context to be commited.
     * @param product - The product to be added or updated.
     */
    [ACTION.PRODUCTS.ADD_OR_UPDATE_PRODUCT]: (context: context, product: Product): void => {
      context.commit(MUTATION.PRODUCTS.ADD_OR_UPDATE_PRODUCT, product);
    },

    /**
     * Calls the mutation to clear.
     * @param context - The context to be commited.
     */
    [ACTION.PRODUCTS.CLEAR]: (context: context): void => {
      context.commit(MUTATION.PRODUCTS.CLEAR);
    },

    /**
     * Calls the mutation to set products.
     * @param context - The context to be commited.
     * @param products - The products to be set.
     */
    [ACTION.PRODUCTS.SET_PRODUCTS]: (context: context, products: Product[]): void => {
      context.commit(MUTATION.PRODUCTS.SET_PRODUCTS, products);
    },

    /**
     * Calls the mutation to remove a product.
     * @param context - The context to be commited.
     * @param productId - The product id to remove the product.
     */
    [ACTION.PRODUCTS.REMOVE_PRODUCT]: (context: context, productId: number): void => {
      context.commit(MUTATION.PRODUCTS.REMOVE_PRODUCT, productId);
    },
  },
  getters: {
    /**
     * Gets the product state.
     * @param state - The state to be accessed.
     * @param productName - The product name to be searched.
     * @returns - The product state.
     */
    [GETTER.PRODUCTS.PRODUCT]: (state: state, productName: string) => {
      return state.products.find((currentProduct) => currentProduct.name === productName);
    },

    /**
     * Gets the products state.
     * @param state - The state to be accessed.
     * @returns - The products state.
     */
    [GETTER.PRODUCTS.PRODUCTS]: (state: state) => {
      return state.products;
    },
  },
};

export default productsStoreModule;
