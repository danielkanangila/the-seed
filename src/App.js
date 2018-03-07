import Vue from 'vue'
import Component from 'vue-class-component'
import { appTemplate } from './templates'
import "./assets/css/app.css"

@Component({
  template: appTemplate
})
class App extends Vue {

}

export default App

