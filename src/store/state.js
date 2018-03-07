import ErrorHandler from '@/js/ErrorHandler.js'

export default {
    rawData: {
        xml: undefined,
        metadata: undefined,
        range: {
            start: undefined,
            end: undefined,
        }
    },
    resourceInfo: {
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
    },
    resourceContents: [],
    factory: null
}