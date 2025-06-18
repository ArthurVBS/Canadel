<script setup lang="ts">
import logo from '@/assets/logo.png'
import user from '@/assets/user.png'
</script>

<template>
  <v-container fluid class="d-flex justify-space-between align-center pa-0">
    <!-- Left -->
    <div class="d-flex align-center justify-center pa-2">
      <div>
        <v-img :src="logo" width="64" height="64"/>
      </div>
      <span class="text-h4 ml-4">Product Manager</span>
    </div>

    <!-- Right -->
    <div class="d-flex align-center justify-center pa-2">
      <span class="mr-4">EN | FR</span>
      <v-avatar :image="user" />
    </div>
  </v-container>
  <v-divider class="border-opacity-100" />
</template>
