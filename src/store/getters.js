import state from "./state";

export const getRawData = state => {
    return state.rawData
}

export const getResourceInfo = state => {
    return state.resourceInfo
}

export const getResourceContents = state => {
    return state.resourceContents
}

export const getErrors =  state => {
    return state.errors
}

export const getFactory = state => {
    return (state.factory !== null) ? state.factory : undefined
}