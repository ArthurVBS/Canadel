<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';
import { GETTER, MODULE } from '@/constants/VuexConstants';

const store = useStore();
const show = computed(() => store.getters[MODULE.LOADING + GETTER.LOADING.SHOW]);
</script>

<template>
  <v-dialog v-model="show" hide-overlay persistent width="auto">
    <v-progress-circular indeterminate color="black" :size="80" :width="5" />
  </v-dialog>
</template>
