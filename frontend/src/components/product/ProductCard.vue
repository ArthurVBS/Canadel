<script setup lang="ts">
import { Product } from '@/types/Product';
import { ref, watch } from 'vue';
import { formatDate } from '@/utils/DateUtils';
import { ACTION, MODULE } from '@/constants/VuexConstants';
import ProductService from '@/services/ProductService';
import { useStore } from 'vuex';
import { NOTIFICATION_MESSAGES } from '@/constants/NotificationConstants';

const props = defineProps<{ product: Product; fetchAllProducts: Function }>();
const store = useStore();
const isDetailsCardOpen = ref<boolean>(false);
const editedProduct = ref<Product>(Object.assign({}, props.product));

type modes = 'delete' | 'edit' | 'view';
const mode = ref<modes>('view');

// Services

/**
 * Deletes a product.
 */
const deleteProduct = () => {
  store.dispatch(MODULE.LOADING + ACTION.LOADING.SHOW);

  const successCallback = (data: Product) => {
    store.dispatch(MODULE.PRODUCTS + ACTION.PRODUCTS.REMOVE_PRODUCT, data.id);
    store.dispatch(
      MODULE.NOTIFICATION + ACTION.NOTIFICATION.SHOW_SUCCESS,
      NOTIFICATION_MESSAGES.SUCCESS.PRODUCT_DELETED
    );
    props.fetchAllProducts();
  };

  const errorCallback = (error: string) => {
    store.dispatch(MODULE.NOTIFICATION + ACTION.NOTIFICATION.SHOW_ERROR, error);
  };

  const finallyCallback = () => {
    store.dispatch(MODULE.LOADING + ACTION.LOADING.HIDE);
  };

  ProductService.deleteProduct(props.product.id, successCallback, errorCallback, finallyCallback);
};

/**
 * Updates a product.
 */
const updateProduct = () => {
  store.dispatch(MODULE.LOADING + ACTION.LOADING.SHOW);

  const successCallback = (data: Product) => {
    store.dispatch(MODULE.PRODUCTS + ACTION.PRODUCTS.ADD_OR_UPDATE_PRODUCT, data);
    store.dispatch(
      MODULE.NOTIFICATION + ACTION.NOTIFICATION.SHOW_SUCCESS,
      NOTIFICATION_MESSAGES.SUCCESS.PRODUCT_UPDATED
    );
    props.fetchAllProducts();
    hideDetailsCard();
    setViewMode();
  };

  const errorCallback = (error: string) => {
    store.dispatch(MODULE.NOTIFICATION + ACTION.NOTIFICATION.SHOW_ERROR, error);
  };

  const finallyCallback = () => {
    store.dispatch(MODULE.LOADING + ACTION.LOADING.HIDE);
  };

  if (isEditedProductValid()) {
    ProductService.updateProduct(
      editedProduct.value,
      successCallback,
      errorCallback,
      finallyCallback
    );
  } else {
    const message = `${NOTIFICATION_MESSAGES.WARNING.EDITED_PRODUCT_DATA} ${NOTIFICATION_MESSAGES.WARNING.PLEASE_REVIEW_YOUR_INFORMATION}`;
    store.dispatch(MODULE.NOTIFICATION + ACTION.NOTIFICATION.SHOW_WARNING, message);
    finallyCallback();
  }
};

/**
 * Checks if the new product is valid.
 * @returns - True if it is, false otherwise.
 */
const isEditedProductValid = () =>
  !(!editedProduct.value.name || !editedProduct.value.price) &&
  !(
    editedProduct.value.description === props.product.description &&
    editedProduct.value.name === props.product.name &&
    editedProduct.value.price === props.product.price
  );

// Modes

/**
 * Checks if it deletes mode.
 * @returns - True if it is deleting mode, false otherwise.
 */
const isDeleteMode = () => mode.value === 'delete';

/**
 * Checks if it edits mode.
 * @returns - True if it is editing mode, false otherwise.
 */
const isEditMode = () => mode.value === 'edit';

/**
 * Checks if it views mode.
 * @returns - True if it is viewing mode, false otherwise.
 */
const isViewMode = () => mode.value === 'view';

/**
 * Sets deletes mode.
 */
const setDeleteMode = () => {
  mode.value = 'delete';
};

/**
 * Sets edits mode.
 */
const setEditMode = () => {
  mode.value = 'edit';
};

/**
 * Sets views mode.
 */
const setViewMode = () => {
  mode.value = 'view';
  editedProduct.value = Object.assign({}, props.product);
};

// Details Toggle

/**
 * Hides details card.
 */
const hideDetailsCard = () => {
  isDetailsCardOpen.value = false;
};

/**
 * Shows details card.
 */
const showDetailsCard = () => {
  isDetailsCardOpen.value = true;
};

// General
watch(props, () => {
  setViewMode();
  hideDetailsCard();
});
</script>

<template>
  <v-card elevation="2" class="card">
    <!-- Product Card Header -->
    <div class="d-flex align-center justify-space-between">
      <!-- Product Card Name -->
      <v-text-field
        v-if="isEditMode()"
        v-model="editedProduct.name"
        class="w-50 pa-2"
        hint="Required"
        persistent-hint
        label="Name *"
      />
      <v-card-title v-else class="flex-grow-1 pa-4 text-truncate" style="max-width: 60%">{{
        product.name
      }}</v-card-title>
      <div class="d-flex align-center justify-end flex-grow-1">
        <!-- Product Card Price -->
        <v-number-input
          v-if="isEditMode()"
          v-model="editedProduct.price"
          class="w-100"
          control-variant="stacked"
          hint="Required"
          persistent-hint
          label="Price *"
          inset
          :precision="2"
          :min="0"
          :step="0.1"
        />
        <v-card-subtitle v-else class="text-center px-0"
          >CAD${{ product.price.toFixed(2) }}</v-card-subtitle
        >

        <!-- Product Card More Details -->
        <v-card-actions class="d-flex justify-end pa-0 pa-sm-2">
          <v-btn
            v-if="isDetailsCardOpen"
            icon="mdi-chevron-up"
            title="Hides product details"
            @click="hideDetailsCard"
          />
          <v-btn
            v-else
            icon="mdi-chevron-down"
            title="Shows product details"
            @click="showDetailsCard"
          />
        </v-card-actions>
      </div>
    </div>

    <!-- Product Card Body -->
    <v-expand-transition>
      <div v-if="isDetailsCardOpen">
        <v-divider thickness="2" />

        <div class="d-flex align-center justify-space-between">
          <!-- Product Card Details -->
          <div class="d-flex align-center justify-center flex-grow-1 flex-column flex-sm-row">
            <v-card-subtitle class="text-center">Id: {{ product.id }}</v-card-subtitle>
            <v-card-subtitle class="text-center"
              >Created At: {{ formatDate(product.createdAt) }}</v-card-subtitle
            >
          </div>
          <v-divider thickness="2" vertical />

          <!-- Product Card Actions -->
          <div>
            <v-scroll-x-transition>
              <div v-if="isDeleteMode()" class="d-flex flex-column align-center justify-center">
                <v-card-subtitle class="text-subtitle-2 mt-4">Are you sure?</v-card-subtitle>
                <v-card-actions>
                  <v-btn icon="mdi-check" title="Confirm" @click="deleteProduct" />
                  <v-btn icon="mdi-close" title="Cancel" @click="setViewMode" />
                </v-card-actions>
              </div>
            </v-scroll-x-transition>

            <v-scroll-x-transition>
              <div v-if="isEditMode()" class="d-flex flex-column align-center justify-center">
                <v-card-subtitle class="text-subtitle-2 mt-4">Apply Changes?</v-card-subtitle>
                <v-card-actions>
                  <v-btn icon="mdi-check" title="Confirm" @click="updateProduct" />
                  <v-btn icon="mdi-close" title="Cancel" @click="setViewMode" />
                </v-card-actions>
              </div>
            </v-scroll-x-transition>

            <v-scroll-x-reverse-transition>
              <div v-if="isViewMode()" class="d-flex flex-column align-center justify-center">
                <v-card-actions>
                  <v-btn icon="mdi-pencil" title="Edit product" @click="setEditMode" />
                  <v-btn icon="mdi-delete" title="Delete product" @click="setDeleteMode" />
                </v-card-actions>
              </div>
            </v-scroll-x-reverse-transition>
          </div>
        </div>
        <v-divider thickness="2" />

        <!-- Product Card Description -->
        <v-text-field
          v-if="isEditMode()"
          v-model="editedProduct.description"
          class="pa-2"
          hide-details
          label="Description"
        />
        <v-card-text v-else class="text-justify">
          {{ product.description ? product.description : 'No Description...' }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.5);
}
</style>
