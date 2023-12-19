var dialog, okButton
function showPopup() {
    dialog.showModal()
}
function okButtonClickEventListener() {
    okButton.addEventListener("click", event => {
        console.log("click")
        // Without an action, submitting the form via the default GET method causes a page to reload. 
        // so, prevent form submission
        event.preventDefault();
        dialog.close()
    })
} 
window.onload = () => {
    dialog = document.getElementById("helpDialog")
    okButton = document.querySelector("html body section form button") 
    showPopup()
    okButtonClickEventListener()
}
