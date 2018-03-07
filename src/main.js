import Vue from 'vue'
import App from './App.js'
import router from './router'
import firebase from 'firebase'
import Toaster from 'cxlt-vue2-toastr'
import '../node_modules/cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
import Config from './js/Config'
import store from './store'

Vue.config.productionTip = false

Vue.use(Toaster, Config.toastrConfigs)
firebase.initializeApp(Config.firebase);

let app;

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      store,
      router,
      template: '<App/>',
      components: { App },
    })
  }
})


