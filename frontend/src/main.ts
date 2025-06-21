import { createApp } from 'vue';
import vuetify from '@/plugins/vuetify';
import store from '@/stores/store';
import App from '@/App.vue';

/**
 * Creates a vue app.
 * @returns - The created vue app.
 */
export function createVueApp() {
  const app = createApp(App);
  app.use(vuetify);
  app.use(store);

  app.mount('#app');
  return app;
}

createVueApp();
