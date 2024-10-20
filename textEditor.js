// Function to apply formatting commands
function formatText(command) {
    document.execCommand(command, false, null);
}
var linkORnot=1


// Function to close the link input modal
function closeLinkInput() {
    document.getElementById('linkInputModal').style.display = 'none';
    document.getElementById('linkUrl').value = '';
    document.getElementById('linkText').value = '';
}

function closeInput(){
    const url = document.getElementById('linkUrl').value;
    if (linkORnot) {
        if (url) {
            document.execCommand('createLink', false, url);
        }
    }
    else{
        if (url) {
            var imgTag = `<img src="${url}" alt="Image" style="max-width: 100%; height: auto;">`;
            document.execCommand('insertHTML', false, imgTag);
        }
    }
    document.getElementById("linkinput").style.display="none"
}
// Function to insert a link
function insertLink() {
    console.log(__dirname)
    linkORnot=1
    document.getElementById("linkinput").style.display="block"
    
}

// Function to insert an image
function insertImage() {
    linkORnot=0
    document.getElementById("linkinput").style.display="block"
    // //const url = prompt("Enter the image URL:");
    // if (url) {
    //     const imgTag = `<img src="${url}" alt="Image" style="max-width: 100%; height: auto;">`;
    //     document.execCommand('insertHTML', false, imgTag);
    // }
}

// Function to change font size
function changeFontSize(size) {
    if (size !== "0") {
        document.execCommand('fontSize', false, size);
    }
}

// Function to align text
function alignText(alignment) {
    document.execCommand(alignment, false, null);
}
