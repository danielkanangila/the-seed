<template>
<div id="resource-content-viewer">
  <div v-if="!showWithRaw" class="stretched row">
  <div class="sixteen wide tablet sixteen wide computer column">
    <div class="ui segment">
      <div v-if="_errors.has('mp')" class="ui red ribbon label">Error [MP]: {{ _errors.find('mp') }}</div>
      <div v-if="isUploaded || isSaved" class="ui text" v-html="files.raw_html"></div>
        <!--<viewer 
          v-if="isEdit" 
          :date="resource.origindate" 
          :title="resource.title"
          :isbn="resource.isbn"
          :contents="contents">
        </viewer>-->
      </div>
    </div>
  </div>
  <div v-if="showWithRaw" class="stretched row">
    <div class="sixteen wide tablet eight wide computer column">
      {{ rawData.xml }}
      <div class="ui segment">
        <div v-if="_errors.has('mp')" class="ui red ribbon label">Error [MP]: {{ _errors.find('mp') }}</div>
        <div v-if="isUploaded || isSaved" class="ui text" v-html="rawData.xml"></div>
        <!--<viewer 
          v-if="isEdit" 
          :date="resource.origindate" 
          :title="resource.title"
          :isbn="resource.isbn"
          :contents="contents"></viewer>-->
      </div>
    </div>
    <div class="sixteen wide tablet eight wide computer column">
      <div class="ui segment">
        <div style="font-size: 14px;" v-html="files.raw_html"></div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'ResourceContentViewer'
}
</script>

