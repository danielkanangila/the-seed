import Vue from 'vue'
import Component from 'vue-class-component'
import { viewerTemplate } from '@/templates'
import '@/assets/css/viewer.css'
import wysiwyg from "vue-wysiwyg";

Vue.use(wysiwyg, {
  hideModules: {
    hyperlink: true,
    image: true,
    table: true,
    removeFormat: true
  }
});

@Component({
  template: viewerTemplate,
  props: ["title", "date", "isbn", "contents"]
})

class BrochureViewer extends Vue {
  isEdit = {
    status: false,
    id: 0
  }

  onEditable(id) {
    this.isEdit.status = true;
    this.isEdit.id = id;
  }

  onBlured() {
    this.isEdit.id = -1
    console.log(this.isEdit)
  }

  newContent(pp_num, pp_content) {
    return {
      paragraph_number: pp_num + 1,
      paragraph_content: pp_content
    }
  }
}

export default BrochureViewer


