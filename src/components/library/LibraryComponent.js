import Vue from 'vue'
import Component from 'vue-class-component'
import template from './libraryTemplate.html'

@Component({
  template
})
class LibraryComponent extends Vue {
  
  description = 'Hello';
  html_data = '';

  updateDescription (newContent) {
    this.html_data = newContent;
  } 
}

export default LibraryComponent