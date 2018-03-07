import firebase from 'firebase'

/**
 * 
 * @param {* Full firabse store path (child reference + file name)} storePath 
 * @param {* base64 format data url} data 
 * @param {* ProgressBar callback function} callback 
 */
export const storeCover = function(storePath, data, callback) {
    let storageRef = firebase.storage().ref()

    return new Promise(
        function(resolve, rejected) {
            let uploadTask  = storageRef.child(storePath).putString(data, 'data_url')
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
                function (snapshot) {
                    let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                    callback(progress)

                }, function (error) {
                    rejected({
                        code: error.code,
                        message: error.message
                    })
                }, function() {
                    resolve({
                        name: uploadTask.snapshot.metadata.fullPath,
                        url: uploadTask.snapshot.downloadURL
                    })
            })
        }
    )
}

/**
 * 
 * @param {* File reference} fileRef 
 */
export const deleteCover = function(fileRef) {
    let deleteRef = firebase.storage().ref().child(fileRef)

    return new Promise(
        function(resolve, rejected) {
            deleteRef.delete().then(snapshot => {
                resolve(snapshot)
            }).catch(error => {
                rejected(error)
            })
        }
    )
}

export const storeCoverInfo = function(data) {
    //const storeCoverRef = firebase.database().ref().child('covers')

    firebase.database().ref('covers/', Date.now()).set({
        book_id: data.isbn,
        fullPath: data.fullPath,
        downloadURL: data.downloadURL
    })
}