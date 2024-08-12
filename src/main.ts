import '../static/css/base.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');

// #####################################################################################################################
// INITIAL
// #####################################################################################################################
window.onload = (_) => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (isSafari) {
    alert(
      'You are using Safari. This website may not function as expected. ' +
        'Please consider using a different browser.'
    );
  }

  $('#modalSettingsModel').on('shown.bs.modal', function (_) {
    const url = localStorage.getItem('apiUrl');
    if (url) {
      $('#modelurl').val(url);
    }
  });
};