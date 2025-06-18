import { createApp } from 'vue'
import App from '@/App.vue'
import vuetify from "@/plugins/vuetify";
import store from "@/stores/store";

const app = createApp(App)
app.use(vuetify)
app.use(store)
app.mount('#app')
