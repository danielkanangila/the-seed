import Vue from 'vue'
import Component from 'vue-class-component'
import template from './adminTemplate.html'
import auth from '@/js/Auth.js'
import Stagb from '@/assets/js/stagb.js'

import '@/assets/css/admin.css'

@Component({
  template
})
class AdminComponent extends Vue {
  isauthorizeduser = false;

  mounted() {
    let stagb = new Stagb()
    stagb.init()

    global.store = this.$store
  }

  logout () {
    auth.logout(this);
  }
  help () {

  }
}

export default AdminComponent

