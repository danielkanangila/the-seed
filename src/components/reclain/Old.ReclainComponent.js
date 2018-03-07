import Vue from "vue";
import Component from 'vue-class-component'
import autosize from "autosize"
import config from "@/js/Config.js"
import Viewer from '@/components/inc/BrochureViewer.js'
import Factory from "@/js/ResourceFactory.js"
import Errors from '@/js/Errors.js'
import _ from 'lodash'
import template from './reclainTemplate.html'

Vue.directive("autosize", {
  bind(el, value) {
    Vue.nextTick(function () {
      autosize(el);
    });
  }
});

@Component({
  template,
  components: {
    Viewer
  }
})
class ReclainComponent extends Vue {

  files = {
    raw_html: "",
    metadata: "",
    range: {
      start: 0,
      end: 0
    }
  }
  cover = {
    url: '/static/img/cover.jpg',
    isSaved: false
  }
  header_title = "Create Brochure"
  isEdit = false
  isSaved = false
  isUploaded = false
  showWithRaw = false
  resource = {
    isbn: '',
    origintitle: '',
    origindate: '',
    title: '',
    type: '',
    description: '',
    city: '',
    lang: ''
  }
  contents = []
  _errors = null
  factory = null

  beforeMount() {
    this._errors = Errors
  }
  withRaw () {
    this.showWithRaw = !this.showWithRaw
  }
  onXmlSelected(e) {
    let instance = this;
    let files = e.target.files || e.dataTransfer.files;
    let reader = new FileReader();

    this.files.metadata = files;

    reader.readAsText(files[0]);
    reader.onload = function () {
      instance.$data.files.raw_html = this.result;
      instance.$data.isUploaded = true;
      instance.$data.contents = []
      instance.$data.factory = new Factory(instance.$data.files)
    };
  }

  onCoverSelected(e) {
    console.log(this.cover)
    let instance = this;
    let files = e.target.files || e.dataTransfer.files;
    let reader = new FileReader();

    reader.onload = function (e) {
      instance.$data.cover.url = e.target.result
    }
    reader.readAsDataURL(files[0])
  }

  onSave() {
    this.isEdit = false;
    this.isSaved = true;
  }
  onEdit() {
    if (this.files.range.start > 0 && this.files.range.end > 0) {

      this.factory.parse_content()
      this.resource.isbn = this.factory.extract_isbn_from_filename();
      this.resource.origintitle = this.factory.extract_origin_title_from_filename();
      this.resource.origindate = this.factory.extract_origin_date_from_isbn(this.resource.isbn);
      this.resource.lang = this.factory.extract_resource_lang();
      this.resource.type = this.files.metadata[0].type;
      this.resource.title = this.factory.title;
      this.contents = this.factory.contents

      this.isUploaded = this.isSaved = false
      this.isEdit = true

      let sketchy = this.factory.isSketchy(this.contents)

      if (sketchy != undefined) {
        this._errors.fields.push({
          name: 'mp',
          message: sketchy
        })
      } else {
        this.files.raw_html = ""
      }

    } else {
      console.log('Enter paragraphs total number')
    }
  }
  onSaveDetail() {

  }
  onDelete() {}
  updateDescription(newContent) {
    this.raw_html = newContent;
  }
}

export default ReclainComponent
