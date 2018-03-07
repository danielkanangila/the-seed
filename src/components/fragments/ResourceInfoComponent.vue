<template>
<div id="resource-info-box" class="ui segments">
    <div class="ui segment no-padding-bottom">
          <h5 class="ui left floated header">
            Resource Details
          </h5>
        <input type="file" id="selectedXmlFile" style="display: none;" @change="onXmlSelected" />
        <div class="ui right floated small basic icon buttons">
            <button class="ui button" onclick="document.getElementById('selectedXmlFile').click();">
              <i class="upload icon"></i>
            </button>
            <button @click.prevent="onEdit" class="ui button">
              <i class="edit icon"></i>
            </button>
            <button @click.prevent="updateRescourceInfo('isShownWithRaw', !resourceInfo.isShownWithRaw)" class="ui button">
              <i class="icon" :class="{'unhide': !resourceInfo.isShownWithRaw, 'hide': resourceInfo.isShownWithRaw}"></i>
            </button>
            <button @click.prevent="onSave" class="ui button">
              <i class="save icon"></i>
            </button>
            <button @click.prevent="onDelete('waitingConfirmation')" class="ui button">
              <i class="trash icon"></i>
            </button>
        </div>
        <div class="clearfix"></div>
        <div v-if="!resourceInfo.errors.isEmpty()" class="ui ignored negative message">
            <ul class="ui bulleted list">
                <li class="item" v-for="(error, i) in resourceInfo.errors.items" :key="i">{{error.name}}: {{ error.message }}</li>
            </ul>
        </div>
    </div>
    <div class="ui segment left aligned">
        <div class="ui labeled fluid input">
            <div class="ui label">Title</div>
            <input :value="resourceInfo.title" @input="updateRescourceInfo('title', $event.target.value)" type="text" name="title" placeholder="Title">
        </div>
        <div class="ui form grid">
        <div class="four column row">
            <div class="field computer column">
                <label>Date</label>
                <input :value="resourceInfo.originalDate" @input="updateRescourceInfo('originalDate', $event.target.value)" type="date" name="originalDate">
            </div>
            <div class="field computer column">
                <label>City</label>
                <input :value="resourceInfo.city" @input="updateRescourceInfo('city', $event.target.value)" type="text" name="city" placeholder="City">
            </div>
            <div class="field computer column">
                <label>RS</label>
                <input :value="range.start" @input="updateDataRange('start', $event.target.value)" type="number" name="range_start" placeholder="Start">
            </div>
            <div class="field computer column">
                <label>RE</label>
                <input :value="range.end" @input="updateDataRange('end', $event.target.value)" type="number" name="range_end" placeholder="End">
            </div>
        </div>
        </div>
        <div class="ui form">
            <div class="field">
                <label>Description</label>
                <textarea :value="resourceInfo.description" @input="updateRescourceInfo('description', $event.target.value)" style="overflow: hidden;"></textarea>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import * as ACTION from "@/store/action-type"
import Utils from '@/js/Utils.js'

export default {
  name: "ResourceInfoBox",
  data () {
    return {
        showProgress: true
    }
  },
  computed: {
    ...mapGetters({
        resourceInfo: 'getResourceInfo'
    }),
    range () {
        return this.$store.getters.getRawData.range
    }
  },
  created () {
      this.$bus.$on('feedbackToInfoComponent', this.onDelete)
  },
  methods: {
    updateRescourceInfo (_field, _value) {
        this.$store.dispatch(ACTION.ON_UPDATE_RESOURCE_INFO, {
            field: _field,
            value: _value
        })
    },
    updateDataRange (_field, _value) {
        this.$store.dispatch(ACTION.ON_UPDATE_DATA_RANGE, {
            field: _field,
            value: _value
        })
    },
    onXmlSelected(e) {
        let instance = this
        let files = e.target.files || e.dataTransfer.files
        let reader = new FileReader()

        if (files[0].type !== 'text/xml') {
            this.setError(
                'Error:FileUpload',
                'Wrong file type, please select one XML file.'
            )
            return
        }

        this.$store.dispatch(ACTION.ON_REFRESH_STATE)

        reader.readAsText(files[0])
        reader.onload = function () {
            instance.$store.dispatch(ACTION.ON_XML_FILE_SELECTED, {
                files: {
                    metadata: files,
                    xml: this.result
                }
            })
        }
    },
    onSave() {
        this.isEdit = false;
        this.isSaved = true;
    },
    onEdit() {
        if (Utils.hasData(this)) {
            this.clearError(['Error:Data'])

            if (this.$store.getters.getFactory) {
                this.clearError(['Error:Factory'])

                if (this.resourceInfo.errors.isEmpty()) {
                    this.clearError(['Error:Editing'])

                    this.$store.dispatch(ACTION.ON_FACTORY)
                    this.$store.dispatch(ACTION.ON_FACTORY_CONTENT)

                    let sketchy = this.$store
                                    .getters
                                    .getFactory
                                    .isSketchy(this.$store.getters.getResourceContents)

                    if (sketchy != undefined) {
                        this.setError('Error:MissingParagraph', sketchy)
                    }

                } else {
                    this.setError('Error:Editing', 'please correct the errors above before continue.')
                    return
                }
            } else {
                this.setError('Error:Factory', 'Factory is not initialized.')
                return
            }
        } else {
            this.setError('Error:Data', 'The file uploaded contain wrong data or no file uploaded and be sure to correctely set the range of data.')
            return
        }
    },
    onDelete(action) {
        if (action === 'waitingConfirmation') {
            this.$bus.$emit('showModal', {
                title: 'Delete Resource',
                icon: 'trash',
                message: 'Are you sure to delete this resource? If you click YES, it will be impossible to recover it.',
                redirect: 'feedbackToInfoComponent'
            })
        } else {
            if (action === 'yes') {
                if (!this.resourceInfo.isSaved) {
                    this.$store.dispatch(ACTION.ON_REFRESH_STATE)
                }
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
    }
  }
}
</script>
