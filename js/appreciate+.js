var okButton

// function okButtonClickEventListener() {
//     okButton.addEventListener("click", event => {
//         // Without an action, submitting the form via the default GET method causes a page to reload. 
//         // so, prevent form submission
//         event.preventDefault();
//     })
// } 

function signUpButtonClickEventListener() {
    okButton.addEventListener("click", event => {
        // Without an action, submitting the form via the default GET method causes a page to reload. 
        // so, prevent form submission
        console.log("Signup button clicked")
        event.preventDefault();
    })
} 



window.onload = () => {
    okButton = document.querySelector(".footer-div-signup-button") 
    signUpButtonClickEventListener()

    // if input is empty: show error
    // else 
    //   randomly show "user name taken"
    // else
    //    navigate to signed in page
}

