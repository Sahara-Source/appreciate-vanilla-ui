var signupButton, yourIdInput

// letters, numbers and periods 
const validIdRegex = new RegExp(/^([a-zA-Z]|[\d]|[.]){1,25}$/, "i");


function yourIdInputKeyPressListener() {
    yourIdInput.addEventListener("keyup", event => {
        // Without an action, submitting the form via the default GET method causes a page to reload. 
        // so, prevent form submission
        event.preventDefault();
        var yourIdInputInvalidLabel = document.querySelector('#input-prompt-username-invalid')
        var yourIdInputInvalidLabelIcon = document.querySelector('.create-account-input-invalid')
        if(!isValidInput(yourIdInput.value)) {
            removeHidden([yourIdInputInvalidLabel, yourIdInputInvalidLabelIcon])
        } else {
            hide([yourIdInputInvalidLabel, yourIdInputInvalidLabelIcon])
        }
        if(isTaken(yourIdInput.value)) {
            console.log("is taken!")
        }
    })
} 
    
function signUpButtonClickEventListener() {
    signupButton.addEventListener("click", event => {
        // Without an action, submitting the form via the default GET method causes a page to reload. 
        // so, prevent form submission
        event.preventDefault();
        console.log("Signup button clicked")
    })
} 

window.onload = () => {
    signupButton = document.querySelector(".footer-div-signup-button")
    yourIdInput = document.querySelector("#yourid-input")
    signUpButtonClickEventListener()
    yourIdInputKeyPressListener()

    // if input is empty: show error
    // else 
    //   randomly show "user name taken"
    // else
    //    navigate to signed in page
}

function isValidInput(yourId) {
    return validIdRegex.test(yourId)
}

function isTaken(inputValue) {
    const request = new Request("http://localhost:8080/check-availability", {
        method: "POST",
        body: `{"slug": ${inputValue}}`
    })
    fetch(request)
        // .then((response) => {
        //     if (response.status === 200) {
        //     return response.json();
        //     } else {
        //     throw new Error("Something went wrong on API server!");
        //     }
        // })
        // .then((response) => {
        //     console.debug(response);
        // })
        // .catch((error) => {
        //     console.error(error);
        // })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
}

function removeHidden(elems) {
    elems.forEach(element => {
      element.classList.remove('hidden')  
    })
}

function hide(elems) {
    elems.forEach(element => {
        element.classList.add('hidden')
    })
}
