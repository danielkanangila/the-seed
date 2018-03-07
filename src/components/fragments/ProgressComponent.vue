<template>
  <div v-if="shown" id="v-progress" class="ui top attached green progress" ref="progress">
      <div class="bar"></div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "v-progress",
  props: {
    shown: Boolean,
    progress: Number
  },
  mounted() {
    this.updateProgress();
  },
  methods: {
    updateProgress() {
      let $progress = $(this.$refs.progress);
      $progress.progress({
        percent: this.progress
      })
    }
  },
  watch: {
    progress(newVal) {
      this.updateProgress()
      if (newVal === 100) {
          $(this.$refs.progress).progress('reset')
      }
    }
  }
};
</script>

