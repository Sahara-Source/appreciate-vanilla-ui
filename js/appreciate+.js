var signupButton,
    yourIdInput,
    yourIdInputBadCharactersLabel,
    yourIdInputTooShortLabel,
    yourIdInputTakenLabel,
    yourIdInputInvalidLabelIcon

// letters, numbers and periods 
const validIdRegex = new RegExp(/^([a-zA-Z]|[\d]|[.]){1,25}$/, "i");


function yourIdInputKeyPressListener() {
    yourIdInput.addEventListener("keyup", event => {
        // Without an action, submitting the form via the default GET method causes a page to reload. 
        // so, prevent form submission
        event.preventDefault();
        var elems = [yourIdInputBadCharactersLabel, yourIdInputTooShortLabel, yourIdInputTakenLabel, yourIdInputInvalidLabelIcon]
        hideAllWarnings(elems)
        enableSubmitButton()
        borderOutlineValid()
        if (isBadCharacters(yourIdInput.value)) {
            showInputInvalid([yourIdInputBadCharactersLabel, yourIdInputInvalidLabelIcon])
        } else if (isTooShort(yourIdInput.value)) {
            showInputInvalid([yourIdInputTooShortLabel, yourIdInputInvalidLabelIcon])
        } else {
            checkAvailability(yourIdInput.value)
        }
    })
}

function signUpButtonClickEventListener() {
    signupButton.addEventListener("click", event => {
        // Without an action, submitting the form via the default GET method causes a page to reload. 
        // so, prevent form submission
        event.preventDefault();
        console.log("Signup button clicked")
        // submit new username and navigate to signed in page
    })
}

window.onload = () => {
    yourIdInput = document.querySelector("#yourid-input")
    yourIdInputBadCharactersLabel = document.querySelector('#input-prompt-username-bad-characters')
    yourIdInputTooShortLabel = document.querySelector('#input-prompt-username-too-short')
    yourIdInputTakenLabel = document.querySelector('#input-prompt-username-taken')
    yourIdInputInvalidLabelIcon = document.querySelector('.create-account-input-invalid-icon')
    signupButton = document.querySelector('#submit')

    signUpButtonClickEventListener()
    yourIdInputKeyPressListener()
}

function isBadCharacters(yourId) {
    return !validIdRegex.test(yourId)
}

function isTooShort(yourId) {
    return yourId.length < 4 || yourId.length > 25
}

async function checkAvailability(inputValue) {
    const request = new Request("http://localhost:8080/check-availability", {
        method: "POST",
        body: `{"slug": "${inputValue}"}`
    })
    try {
        const response = await fetch(request);
        if (response.ok) {
            const data = await response.json();
            console.log(`${inputValue} is available`)
            console.log(data);
        } else {
            console.log(`${inputValue} is taken`)
            showInputInvalid([yourIdInputTakenLabel, yourIdInputInvalidLabelIcon])
        }
    } catch (error) {
        console.error(error);
    }
}

function showInputInvalid(elems) {
    elems.forEach(element => {
        element.classList.remove('hidden')
    })
    disableSubmitButton()
    borderOutlineInvalid()
}

function hideAllWarnings(elems) {
    elems.forEach(element => {
        element.classList.add('hidden')
    })
}

function disableSubmitButton() {
    signupButton.setAttribute('disabled', '')
}

function enableSubmitButton() {
    signupButton.removeAttribute('disabled')
}

function borderOutlineInvalid() {
    yourIdInput.classList.add('border-error')
}

function borderOutlineValid() {
    yourIdInput.classList.remove('border-error')
}