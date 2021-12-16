const functions = require("firebase-functions");

const admin = require('firebase-admin')
admin.initializeApp()

exports.newUserSignup = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        date_joined: admin.firestore.FieldValue.serverTimestamp()
    })
})
