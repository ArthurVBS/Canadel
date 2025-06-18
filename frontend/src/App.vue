<script setup lang="ts">
import HomePage from "@/views/HomePage.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Loading from "@/components/Loading.vue";
</script>

<template>
  <v-app>
    <Header />
    <v-main class="d-flex flex-column">
      <Loading />
      <HomePage />
    </v-main>
    <Footer />
  </v-app>
</template>
