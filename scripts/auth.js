// // Sign a new user up

// Create signup form reference
const signupForm = document.querySelector('#signup-form');

// Listen to the submit event
signupForm.addEventListener('submit', (e) => {

  // Preventing the default action
  e.preventDefault();

  // Saving the values of the email and password in variables
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // Creating a new user using the auth reference we created
  auth.createUserWithEmailAndPassword(email, password).then(() => {

    // Creating a modal reference
    const modal = document.querySelector('#modal-signup');

    // Clearing the form
    signupForm.reset();

    // Using materialize JS to close the modal after signup
    M.Modal.getInstance(modal).close();
  })
})