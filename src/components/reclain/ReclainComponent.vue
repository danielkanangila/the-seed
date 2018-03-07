<template>
<div id="reclain-brochure" class="ui equal width left aligned padded grid stackable">
  <div class="stretched row">
    <!-- detail-box -->
    <div class="sixteen wide tablet twelve wide computer column">
      <resource-info-box />
    </div>
    <!-- /detail-box -->
    <!-- cover-box -->
    <div class="sixteen wide tablet four wide computer column">
      <resource-cover-box />
    </div>
    <!-- /cover-box -->
  </div>
  <!-- /first-row -->
  <!-- content-box -->
  
  <!-- /content-box -->
  <modal-component />
</div>
</template>
<script>
import Vue from 'vue'
import ResourceInfoBox from '@/components/fragments/ResourceInfoComponent.vue'
import ResourceCoverBox from '@/components/fragments/ResourceCoverComponent.vue'
import ModalComponent from '@/components/fragments/ModalComponent'

export default {
  name: 'ReclainBrochure',
  components: {
    ResourceInfoBox,
    ResourceCoverBox,
    ModalComponent
  },
  beforeMount () {
    Vue.prototype.$bus = new Vue()
  },
  methods: {
    callModal (data) {

    }
  }
}
</script>

