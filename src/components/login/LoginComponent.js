import Vue from 'vue'
import Component from 'vue-class-component'
import Auth from '@/js/Auth.js'
import VeeValidate from 'vee-validate'
import '@/assets/js/mui.js'
import template from './loginTemplate.html'

import "@/assets/css/login.css"

Vue.use(VeeValidate)

@Component({
  template
})
class LoginComponent extends Vue {

  auth = {
    user: null,
    email: '',
    password: '',
    message: '',
    hasErrors: false
  };
  step = 1;
  btnTitle = 'Next';
  isProcess = false;

  login() {
    switch (this.step) {
      case 1:
        Auth.check_email(this)
        break;
      case 2:
        Auth.confirm(this)
        break;
      default:
        break;
    }
  }
}

export default LoginComponent
