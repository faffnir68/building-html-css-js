let dropArea = document.getElementById('drop-area')

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation();
}

;['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
})
;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unHighlight, false)
})

function highlight(e) {
    dropArea.classList.add('highlight')
}
function unHighlight(e) {
    dropArea.classList.remove('highlight')
}

dropArea.addEventListener('drop', handleDrop, false)
function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files
console.log(files)
    handleFiles(files)
}

function handleFiles(files) {
    files = [...files]
    console.log(files)
    initializeProgress(files.length)
    files.forEach(uploadFile)
    files.forEach(previewFile)
}

function uploadFile(file) {
    let url = '127.0.0.1:5500'
    let formData = new FormData()
    formData.append('file', file)
    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(()=> {
        progressDone
    })
    .catch((error)=> {console.log(error)})
}

function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
        let img = document.createElement('img')
        img.src = reader.result
        document,getElementById('gallery').appendChild(img)
    }
}

let filesDone = 0
let filesToDo = 0
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numFiles) {
    progressBar.value = 0
    filesDone = 0
    filesToDo = numFiles
}

function progressDone() {
    filesDone++
    progressBar.value = filesDone / filesToDo * 100
}

