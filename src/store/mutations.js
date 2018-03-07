import * as types from './mutation-type'
import Factory from '@/js/ResourceFactory.js'
import ErrorHandler from '@/js/ErrorHandler.js'

export default {
    [types.REFRESH_STATE] (state) {
        state.rawData = {
            text: undefined,
            metadata: undefined,
            range: {
                start: -1,
                end: -1
            }
        }
        state.resourceInfo = {
            isbn: undefined,
            originalDate: undefined,
            originalTitle: undefined,
            title: undefined,
            city: undefined,
            lang: 'EN',
            description: undefined,
            cover: {
                name: undefined,
                url: '/static/img/cover.jpg',
                isSaved: false
            },
            isOnEdit: false,
            isSaved: false,
            isXmlFileUploaded: false,
            isReclaimed: false,
            isShownWithRaw: false,
            errors: new ErrorHandler()
        }
        state.resourceContent = []
    },
    [types.SET_RAW_DATA] (state, { data }) {
        state.rawData.xml = data.xml
        state.rawData.metadata = data.metadata
        state.factory = new Factory(state.rawData)
        state.resourceInfo.isXmlFileUploaded = true
    },
    [types.UPDATE_DATA_RANGE] (state, range) {
        Object.assign(state.rawData.range, range)
    },
    [types.SET_RESOURCE_COVER] (state, { url, status, name }) {
        if (url) {
            state.resourceInfo.cover.url = url
            state.resourceInfo.cover.isSaved = status
            state.resourceInfo.cover.name = name
        }
    },
    [types.UPDATE_RESOURCE_COVER] (state, cover) {
        Object.assign(state.resourceInfo.cover, cover)
    },
    [types.SET_RESOURCE_INFO] (state) {
        state.factory.parse_content()
        state.resourceInfo.isbn = state.factory.extract_isbn_from_filename()
        state.resourceInfo.originalDate = state.factory.extract_origin_date_from_isbn(state.resourceInfo.isbn)
        state.resourceInfo.originalTitle = state.factory.extract_origin_title_from_filename()
        state.resourceInfo.lang = state.factory.extract_resource_lang()
        state.resourceInfo.title = state.factory.title
    },
    [types.UPDATE_RESOURCE_INFO] (state, info) {
        Object.assign(state.resourceInfo, info)
    },
    [types.SET_RESOURCE_CONTENT] (state) {
        if (state.factory && state.factory.contents.length > 0) {
            state.resourceContents = state.factory.contents
            state.resourceInfo.isReclaimed = true
        }
    },
    [types.UPDATE_RESOURCE_CONTENT] (state, { id, content }) {
        if (state.resourceContent[id]) {
            state.resourceContent[id].paragraph_number = content.paragraph_number
            state.resourceContent[id].paragraph_content = content.paragraph_content
        } else {
            state.resourceContent[id] = content
        }
    },
    [types.RESOURCE_ERROR_HANDLER] (state, {field, message}) {
        if (!state.resourceInfo.errors.has(field)) {
            state.resourceInfo.errors.items.push({
                name: field,
                message: message
            })
        }
    },
    [types.REMOVE_RESOURCE_ERROR] (state, {field}) {
        state.resourceInfo.errors.remove(field)
    },
    [types.CLEAR_ERROR] (state) {
        state.resourceInfo.errors.clear()
    }
}