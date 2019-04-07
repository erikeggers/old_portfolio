/*
 * events.js
 *
*/

//CTA Image Change

//CTA image
var ctaImage = document.querySelector("#cta");

if (ctaImage) {
    //Mouse Over
    ctaImage.addEventListener('mouseover', function() {
        ctaImage.style.backgroundImage = 'url(images/backpack.jpg)';
    }, false);

    //Mouse Out
    ctaImage.addEventListener('mouseout', function() {
        ctaImage.style.backgroundImage = 'url(images/banner.jpg)';
    }, false);
}

//Validate Contact form input
function validate(e) {
    //Grab element
    var el = e.target;
    var nameFeedback = document.querySelector("#nameFeedback");
    var emailFeedback = document.querySelector("#emailFeedback");
    var msgFeedback = document.querySelector("#msgFeedback");

    //Determine which element
    if (el.value.length < 1 && el.id == "name") {
        nameFeedback.innerHTML = "Please enter your name!";
    } else if (el.value.length < 8 && el.id == "email") {
        emailFeedback.innerHTML = "Please enter your email!";
    } else if (el.value.length < 10 && el.id == "message") {
        msgFeedback.innerHTML = "Please enter a message longer than 10 characters!";
    } else {
        nameFeedback.innerHTML = "";
        emailFeedback.innerHTML = "";
        msgFeedback.innerHTML = "";
    }
}

//Grab input
var nameInput = document.querySelector("#name");
var emailInput = document.querySelector("#email");
var msgInput = document.querySelector("#message");

// Add even listeners

if (nameInput || emailInput || msgInput) {
    nameInput.addEventListener('blur', validate, false);
    emailInput.addEventListener('blur', validate, false);
    msgInput.addEventListener('blur', validate, false);
}