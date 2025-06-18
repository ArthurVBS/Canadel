<script setup lang="ts">
import {Product} from "@/types/Product";
import {ref} from "vue";
import ProductService from "@/services/ProductService";
import {useStore} from "vuex";
import {ACTION, MODULE} from "@/constants/VuexConstants";

const store = useStore();
const products = ref<Product[]>([]);

const fetchAllProduct = () => {
  store.dispatch(MODULE.LOADING + ACTION.LOADING.SHOW);

  const successCallback = (data: Product[]) => {
    products.value = data
  }

  const errorCallback = (error: any) => {
    console.log(error)
  }

  const finallyCallback = () => {
    store.dispatch(MODULE.LOADING + ACTION.LOADING.HIDE);
  }

  ProductService.getProducts(successCallback, errorCallback, finallyCallback);
}

</script>

<template>
  <v-container>
    <span v-if="products.length === 0"> No product added </span>
    <v-btn @click="fetchAllProduct" text="Get All Products" variant="tonal" color="green" />
  </v-container>
</template>
