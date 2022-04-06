import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router, axios);

const options = {
  timeout: 2500,
  position: "top-left",
};

app.use(Toast, options);

app.mount("#app");
