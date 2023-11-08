import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { key } from "./store/index";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const app = createApp(App);

app.use(store, key);
app.use(router);
app.component("VueDatePicker", VueDatePicker);

app.mount("#app");
