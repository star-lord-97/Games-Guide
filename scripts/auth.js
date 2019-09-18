// Making someone an admin
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({email: adminEmail}).then(result => {
    adminForm.reset();
    console.log(result);
  });
});


// Listen for auth status changes
auth.onAuthStateChanged(user => {
  if(user) {
    user.getIdTokenResult().then(idTokenResult => {
      user.master = idTokenResult.claims.master;
      setupUI(user);
    })
    db.collection('guides').onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
    }, err => {
      console.log(err.message);
    });
  } else {
    setupUI();
    setupGuides([]);
  }
})


// Create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('guides').add({
    title: createForm['title'].value,
    content: createForm['content'].value
  }).then(() => {
    createForm.reset();
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
  }).catch(err => {
    console.log(err.message);
  });
});


// Sign a new user up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    db.collection('users').doc(cred.user.uid).set({
      bio: signupForm['signup-bio'].value
    }).then(() => {
    signupForm.querySelector('.error').innerHTML = '';
    signupForm.reset();
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    });
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});


// Logout a logged in user
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});


// Login a signed up user
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  auth.signInWithEmailAndPassword(email, password).then(() => {
    let modal = document.querySelector('#modal-login');
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
    M.Modal.getInstance(modal).close();
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });
});