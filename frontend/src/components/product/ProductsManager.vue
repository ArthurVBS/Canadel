<script setup lang="ts">
import {createEmptyProduct, Product} from "@/types/Product";
import {onMounted, ref, watch} from "vue";
import ProductService from "@/services/ProductService";
import {useStore} from "vuex";
import {ACTION, GETTER, MODULE} from "@/constants/VuexConstants";
import ProductCard from "@/components/product/ProductCard.vue";

const store = useStore();
const products = ref<Product[]>(store.getters[MODULE.PRODUCTS + GETTER.PRODUCTS.PRODUCTS]);
const newProduct = ref<Product>(createEmptyProduct());

/**
 * Adds a product.
 */
const addProduct = () => {
  store.dispatch(MODULE.LOADING + ACTION.LOADING.SHOW);

  const successCallback = (data: Product) => {
    store.dispatch(MODULE.PRODUCTS + ACTION.PRODUCTS.ADD_OR_UPDATE_PRODUCT, data)
    products.value = store.getters[MODULE.PRODUCTS + GETTER.PRODUCTS.PRODUCTS];
  }

  const errorCallback = (error: string) => {
    store.dispatch(MODULE.NOTIFICATION + ACTION.NOTIFICATION.SHOW_ERROR, error)
  }

  const finallyCallback = () => {
    store.dispatch(MODULE.LOADING + ACTION.LOADING.HIDE);
    fetchAllProducts();
  }

  ProductService.addProduct(newProduct.value, successCallback, errorCallback, finallyCallback);
}

/**
 * Fetches all products.
 */
const fetchAllProducts = () => {
  store.dispatch(MODULE.LOADING + ACTION.LOADING.SHOW);

  const successCallback = (data: Product[]) => {
    store.dispatch(MODULE.PRODUCTS + ACTION.PRODUCTS.SET_PRODUCTS, data)
    products.value = store.getters[MODULE.PRODUCTS + GETTER.PRODUCTS.PRODUCTS];
  }

  const errorCallback = (error: string) => {
    store.dispatch(MODULE.NOTIFICATION + ACTION.NOTIFICATION.SHOW_ERROR, error)
  }

  const finallyCallback = () => {
    store.dispatch(MODULE.LOADING + ACTION.LOADING.HIDE);
  }

  ProductService.getProducts(successCallback, errorCallback, finallyCallback);
}

onMounted(() => {
  fetchAllProducts();
})
</script>

<template>
  <v-container fluid class="pa-0 mt-2 mb-4">
    <v-card elevation="2" class="d-flex align-center justify-space-between mx-2 card">
      <v-card-title class="text-h4 flex-grow-1">My Products</v-card-title>
      <v-card-actions class="flex-grow-1 d-flex justify-end pa-2">
        <v-btn
          icon="mdi-plus"
          title="Add a product"
          @click="addProduct"
        />
        <v-btn
          icon="mdi-sync"
          title="Fetch all products"
          @click="fetchAllProducts"
        />
      </v-card-actions>
    </v-card>
  </v-container>

  <v-container v-if="products.length !== 0" fluid class="pa-0 mt-8">
    <div class="d-flex align-center justify-center">
      <span class="text-h6">No product added</span>
    </div>
  </v-container>
  <v-container v-else fluid class="d-flex pa-0">
    <ProductCard v-for="product in products" :product="product" class="mx-2 w-50" />
  </v-container>
</template>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.5);
}
</style>
