<script setup lang="ts">
import {Product} from "@/types/Product";

defineProps<{ product: Product }>();

const deleteProduct = () => {
  console.log('Delete')
}

const editProduct = () => {
  console.log('Edit')
}

const seeDetails = () => {
  console.log('Details')
}

</script>

<template>
  <v-card elevation="2" class="d-flex align-center justify-space-between card">
    <v-card-title class="flex-grow-1 pa-4 text-truncate" style="max-width: 70%">{{ product.name }}</v-card-title>
    <v-card-actions class="flex-grow-1 d-flex justify-end pa-2">
      <v-btn
        icon="mdi-eye"
        title="See more details"
        @click="seeDetails"
      />
      <v-btn
        icon="mdi-pencil"
        title="Edit product"
        @click="editProduct"
      />
      <v-btn
        icon="mdi-delete"
        title="Delete product"
        @click="deleteProduct"
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped>
  .card {
    background: rgba(255, 255, 255, 0.5);
  }

  .text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
