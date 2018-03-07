<template>
  <div id="modal-component" class="ui basic modal">
    <h1 class="ui icon header">
        <i class="icon" :class="icon"></i>
        {{ title }}
    </h1>
    <div class="content">
        <p style="color: #fff;font-weight: 900;font-size:14px;">{{ message }}</p>
    </div>
    <div class="actions">
        <button class="ui red basic cancel inverted button" @click.prevent="action('no')">
            <i class="remove icon"></i>
            No
        </button>
        <button class="ui green ok inverted button" @click.prevent="action('yes')">
            <i class="checkmark icon"></i>
            Yes
        </button>
    </div>
</div>
</template>
<script>
import $ from 'jquery'

export default {
  name: 'ModalComponent',
  data () {
      return {
          title: '',
          icon: '',
          message: '',
          redirect: ''
      }
  },
  created () {
      this.$bus.$on('showModal', data => {
          this.title = data.title
          this.icon = data.icon
          this.message = data.message
          this.redirect = data.redirect
          $('.ui.basic.modal').modal('show')
      })
  },
  methods: {
    action (response) {
        this.$bus.$emit(this.redirect, response)
    }
  }
}
</script>
