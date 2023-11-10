import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { key } from "./store/index";

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

app.use(store, key);
app.use(router);
app.use(VueApexCharts);
app.component("VueDatePicker", VueDatePicker);

app.mount("#app");
