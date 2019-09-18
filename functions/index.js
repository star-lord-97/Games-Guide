const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // Abandon non admin users from making someone an admin
  if(!context.auth.token.master) {
    return {error: 'only admins can add other admins, sucker'};
  };

  // Making a user an admin
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      master: true
    });
  }).then(() => {
    return {
      message: `Success ${data.email} has been made an admin`
    };
  }).catch(err => {
    return err;
  });
});