<script setup lang="ts">
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";
import Loading from "@/components/common/Loading.vue";
import Notification from "@/components/common/Notification.vue";
import ProductsManager from "@/components/product/ProductsManager.vue";
</script>

<template>
  <v-app>
    <Header />
    <v-main class="wallpaper">
      <Loading />
      <Notification />
      <v-container class="card">
        <ProductsManager />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<style scoped>
  .card {
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: saturate(180%) blur(8px);
    border-radius: 8px;
    height: 100%;
  }

  .wallpaper {
    background: url("assets/wallpaper.jpg");
    background-size: cover;
    padding: 16px;
  }
</style>
