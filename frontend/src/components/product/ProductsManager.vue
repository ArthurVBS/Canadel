<script setup lang="ts">
import {createEmptyProduct, Product} from "@/types/Product";
import {onMounted, ref} from "vue";
import ProductService from "@/services/ProductService";
import {useStore} from "vuex";
import {ACTION, GETTER, MODULE} from "@/constants/VuexConstants";
import ProductCard from "@/components/product/ProductCard.vue";
import {NOTIFICATION_MESSAGES} from "@/constants/NotificationConstants";

const store = useStore();
const isAddCardOpen = ref<boolean>(false);
const products = ref<Product[]>(store.getters[MODULE.PRODUCTS + GETTER.PRODUCTS.PRODUCTS]);
const newProduct = ref<Product>(createEmptyProduct());

// Services

/**
 * Adds a product.
 */
const addProduct = () => {
  store.dispatch(MODULE.LOADING + ACTION.LOADING.SHOW);

  const successCallback = (data: Product) => {
    store.dispatch(MODULE.PRODUCTS + ACTION.PRODUCTS.ADD_OR_UPDATE_PRODUCT, data)
    store.dispatch(MODULE.NOTIFICATION + ACTION.NOTIFICATION.SHOW_SUCCESS, NOTIFICATION_MESSAGES.SUCCESS.PRODUCT_ADDED);
    products.value = store.getters[MODULE.PRODUCTS + GETTER.PRODUCTS.PRODUCTS];
    newProduct.value = createEmptyProduct();
    isAddCardOpen.value = false;
  }

  const errorCallback = (error: string) => {
    store.dispatch(MODULE.NOTIFICATION + ACTION.NOTIFICATION.SHOW_ERROR, error)
  }

  const finallyCallback = () => {
    store.dispatch(MODULE.LOADING + ACTION.LOADING.HIDE);
    fetchAllProducts();
  }

  if (isNewProductValid()) {
    ProductService.addProduct(newProduct.value, successCallback, errorCallback, finallyCallback)
  } else {
    const message = `${NOTIFICATION_MESSAGES.WARNING.NEW_PRODUCT_DATA} ${NOTIFICATION_MESSAGES.WARNING.PLEASE_REVIEW_YOUR_INFORMATION}`
    store.dispatch(MODULE.NOTIFICATION + ACTION.NOTIFICATION.SHOW_WARNING, message);
    finallyCallback();
  }
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
};

/**
 * Checks if the new product is valid.
 * @returns - True if it is, false otherwise.
 */
const isNewProductValid = () => !(!newProduct.value.description || !newProduct.value.name || !newProduct.value.price);

// Add Card Toggle

/**
 * Hides add card.
 */
const hideAddCard = () => {
  isAddCardOpen.value = false;
}

/**
 * Shows add card.
 */
const showAddCard = () => {
  isAddCardOpen.value = true;
}

// General

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
          v-if="isAddCardOpen"
          icon="mdi-minus"
          title="Hides add product card"
          @click="hideAddCard"
        />
        <v-btn
          v-else
          icon="mdi-plus"
          title="Shows add product card"
          @click="showAddCard"
        />
        <v-btn
          icon="mdi-sync"
          title="Fetch all products"
          @click="fetchAllProducts"
        />
      </v-card-actions>
    </v-card>
  </v-container>

  <v-expand-transition>
    <v-container v-show="isAddCardOpen" fluid class="pa-0 mb-4">
      <v-card elevation="2" class="d-flex flex-column align-center justify-space-between mx-2 py-2 card">
        <div class="w-100 pa-2">
          <span class="text-h5 ml-3">New Product</span>
        </div>

        <div class="d-flex justify-center align-center w-100 pa-2">
          <v-text-field
            v-model="newProduct.name"
            class="mx-2 w-100"
            hide-details
            label="Name"
          />
          <v-number-input
            v-model="newProduct.price"
            class="mx-2 w-100"
            control-variant="stacked"
            hide-details
            label="Price"
            inset
            :precision="2"
            :min="0"
            :step="0.10"
          />
        </div>

        <div class="d-flex justify-center align-center w-100 pa-2">
          <v-text-field
            v-model="newProduct.description"
            class="mx-2 w-100"
            hide-details
            label="Description"
          />
          <v-btn
            class="mx-2"
            color="black"
            icon="mdi-plus"
            title="Add a product"
            variant="tonal"
            @click="addProduct"
          />
        </div>
      </v-card>
    </v-container>
  </v-expand-transition>

  <v-container v-if="products.length === 0" fluid class="pa-0 mt-8">
    <div class="d-flex align-center justify-center">
      <span class="text-h6">No product added</span>
    </div>
  </v-container>

  <v-container v-else fluid class="pa-1">
    <v-row dense>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        md="6"
        class="px-2 mb-2"
      >
        <ProductCard :product="product" :fetch-all-products="fetchAllProducts" class="w-100" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.5);
}
</style>
