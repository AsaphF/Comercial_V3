import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Firebase from './firebase';
import axios from 'axios';
import moment from 'moment';
import firebase from 'firebase/app';
import 'bootstrap';
import Toast from 'vue-toastification';
import VueScrollTo from 'vue-scrollto';
import VCalendar from 'v-calendar';
import VueCryptojs from 'vue-cryptojs';
import "vue-toastification/dist/index.css";
// import pagarme from 'pagarme/browser';
import VueApexCharts from 'vue3-apexcharts';

const app = createApp(App);
app.component('apexchart', VueApexCharts);

app.use(Toast, {
  transition: 'Vue-Toastification__fade',
  containerClassName: 'my-toast',
  // ... other options
});
app.use(VueCryptojs);
app.use(VueScrollTo);
app.use(Firebase);
app.use(VCalendar);

// app.config.globalProperties.$pagarme = pagarme;
app.config.globalProperties.$http = axios;
app.config.globalProperties.moment = moment;

firebase.apps[0].auth().onAuthStateChanged(user => {
  document.title = 'Simples Hub';
  app.config.globalProperties.$uid = user ? user.uid : null;

  if (!app._isMounted) {
    app.use(router).mount('#app');
  }
});
