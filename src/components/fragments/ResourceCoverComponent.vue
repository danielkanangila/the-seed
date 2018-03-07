<template>
<div id="resource-cover-box" class="ui segments">
  <div class="ui segment no-padding-bottom">
    <h5 class="ui left floated header">
      Cover
    </h5>
    <input type="file" id="selectedCover" @change="onCoverSelected" style="display: none;" />
    <div class="ui right floated small basic icon buttons">
      <button class="ui button" onclick="document.getElementById('selectedCover').click();">
        <i class="upload icon"></i>
      </button>
      <button @click.prevent="onSave" class="ui button">
        <i class="save icon"></i>
      </button>
      <button @click.prevent="onDelete('waitingConfirmation')" class="ui button">
        <i class="trash icon"></i>
      </button>
    </div>
    <div class="clearfix"></div>
  </div>
  <div class="ui segment left aligned">
    <div class="ui card" style="width: 150px;">
      <div class="image">
        <div v-if="cover.isSaved" class="ui green ribbon label">Saved</div>
        <img :src="cover.url" style="width: 150px;">
      </div>
    </div>
    <div v-if="showLoader" class="ui active dimmer">
      <div class="ui text loader">{{message}}</div>
    </div>
  </div>
</div>
</template>
<script>
import * as ACTION from '@/store/action-type'
import { storeCover, storeCoverInfo, deleteCover } from '@/js/FirebaseHelper'
import VProgress from '@/components/fragments/ProgressComponent'

export default {
  name: 'ResourceCoverBox',
  data () {
    return {
      basePath: 'cover/',
      defaultCover: '/static/img/cover.jpg',
      showLoader: false,
      message: 'Loading'
    }
  },
  components: { VProgress },
  computed: {
    cover () {
      return this.$store.state.resourceInfo.cover
    }
  },
  created () {
      this.$bus.$on('feedbackToCoverComponent', this.onDelete)
  },
  methods: {
    onCoverSelected(e) {
      let instance = this;
      let files = e.target.files || e.dataTransfer.files;
      let reader = new FileReader();

      if (files[0].type !== 'image/jpeg') {
        this.setError(
          'Error:CoverUpload',
          'Wrong cover file type. Must be file type [*.jpeg].'
        )
        return
      }
      this.clearError(['Error:CoverUpload'])

      reader.onload = function (e) {
        instance.$store.dispatch(ACTION.ON_SET_RESOURCE_COVER, {filePath: e.target.result, status: false, name: ''})
      }
      reader.readAsDataURL(files[0])
    },
    onSave () {
      this.showLoader = true
      this.message = 'Storing...'
      let isbn = this.$store.getters.getResourceInfo.isbn

      if (!isbn) {
        this.setError(
          'Error:Storing File',
          'Can\'t store cover without book number identification.'
        )
        return
      }

      let storeRef = this.basePath + isbn + Date.now()
      storeCover(storeRef, this.cover.url, () => {}).then(response => {
        this.clearAllError()
        this.$store.dispatch(ACTION.ON_SET_RESOURCE_COVER, {
          filePath: response.url, 
          status: true, 
          name: response.name
        })
        storeCoverInfo({
          book_id: isbn,
          fullPath: response.name,
          downloadURL: response.url
        })
        this.showLoader = false
      }).catch(error => {
        this.setError(error.code, error.message)
        this.showLoader = false
      })
    },
    onDelete (action) {
      this.showLoader = true
      this.message = 'Deleting...'
      this.clearAllError()
      if (action === 'waitingConfirmation') {
        this.$bus.$emit('showModal', {
            title: 'Delete Cover',
            icon: 'trash',
            message: 'Are you sure to delete this cover? If you click YES, it will be impossible to recover it in the system.',
            redirect: 'feedbackToCoverComponent'
          })
        } else {
          if (action === 'yes') {
              if (!this.cover.isSaved) {
                this.setDefaultCover()
                this.showLoader = false
              } else {
                deleteCover(this.cover.name).then(() => {
                  this.setDefaultCover()
                  this.showLoader = false
                }).catch(error => {
                  this.setError(error.code, error.message)
                  this.showLoader = false
                })
              }
          } else {
            this.showLoader = false
          }
        }
    },
    setError(field, message) {
        this.$store.dispatch(ACTION.ON_RESOURCE_ERROR, {
            _field: field,
            _message: message
        })
    },
    clearError (fields) {
        fields.forEach(field => {
            this.$store.dispatch(ACTION.ON_REMOVE_RESOURCE_ERROR, {field: field})
        })
    },
    clearAllError() {
      this.$store.dispatch(ACTION.ON_CLEAR_ERROR)
    },
    setDefaultCover() {
      this.$store.dispatch(ACTION.ON_SET_RESOURCE_COVER, {
        filePath: this.defaultCover, 
        status: false, 
        name: ''
      })
    }
  }
}
</script>
