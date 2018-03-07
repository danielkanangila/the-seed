import Vue from "vue"
import Component from 'vue-class-component'
import autosize from "autosize"
import template from './cloneTemplate.html'
import config from "@/js/Config.js"
import Viewer from '@/components/inc/BrochureViewer.js'
import Factory from "@/js/ResourceFactory.js"

Vue.directive("autosize", {
  bind(el, value) {
    Vue.nextTick(function() {
      autosize(el);
    });
  }
});

@Component({
  template,
  components: { Viewer }
})
class CloneComponent extends Vue {

  files = {
    raw_html: "",
    metadata: "",
    range: {
      start: 0,
      end: 0
    }
  };
  header_title = "Clone Brochure";
  isEdit = false;
  isSaved = false;
  isUploaded = false;
  resource = {
    isbn: '',
    origintitle: '',
    origindate: '',
    title: '',
    type: '',
    description: '',
    city: '',
    lang: ''
  };
  contents = [];
  
  onXmlSelected(e) {
    let instance = this;
    let files = e.target.files || e.dataTransfer.files;
    let reader = new FileReader();

    this.files.metadata = files;

    reader.readAsText(files[0]);
    reader.onload = function() {
      instance.$data.files.raw_html = this.result;
      instance.$data.isUploaded = true;
      instance.$data.files.p_n = 0
      instance.$data.contents = []
    };
  }
  onSave() {
    this.isEdit = false;
    this.isSaved = true;
  }
  onSaveDetail() {

  }
  onDelete() {}
  updateDescription (newContent)  {
    this.raw_html = newContent;
  }
}

export default CloneComponent
