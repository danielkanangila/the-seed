import * as types from './mutation-type'

export const onRefreshState = function(context) {
    context.commit(types.REFRESH_STATE)
}

export const onXmlFileSelected = function (context, {files}) {
    context.commit(types.SET_RAW_DATA, {data: files})
}

export const onUpdateDataRange = function(context, {field, value}) {
    context.commit(types.UPDATE_DATA_RANGE, {
        [field]: value
    })
}

export const onSetResourceCover = function(context, {name, filePath, status}) {
    context.commit(types.SET_RESOURCE_COVER, {url: filePath, status: status, name: name})
}

export const onUpdateResourceCover = function(context, { field, value }) {
    context.commit(types.UPDATE_RESOURCE_COVER, {
        [field]: value
    })
}

export const onFactory = function(context) {
    context.commit(types.SET_RESOURCE_INFO)
}

export const onUpdateResourceInfo = function(context, {field, value}) {
    context.commit(types.UPDATE_RESOURCE_INFO, {
        [field]: value
    })
}

export const onFactoryContent = function(context) {
    context.commit(types.SET_RESOURCE_CONTENT)
}

export const onUpdateResourceContent = function(context, {_id, _content}) {
    context.commit(types.UPDATE_RESOURCE_CONTENT, {id: _content, content: _content})
}

export const onResourceError = function(context, {_field, _message}) {
    context.commit(types.RESOURCE_ERROR_HANDLER, {field: _field, message: _message})
}

export const onRemoveResourceError = function(context, {field}) {
    context.commit(types.REMOVE_RESOURCE_ERROR, {field: field})
}

export const onClearError = function(context) {
    context.commit(types.CLEAR_ERROR)
}