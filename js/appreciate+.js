var okButton

function okButtonClickEventListener() {
    okButton.addEventListener("click", event => {
        // Without an action, submitting the form via the default GET method causes a page to reload. 
        // so, prevent form submission
        event.preventDefault();
    })
} 
window.onload = () => {
    okButton = document.querySelector("html body section form button") 
    okButtonClickEventListener()
}
