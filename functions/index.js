const functions = require("firebase-functions");

const admin = require('firebase-admin')
admin.initializeApp()


exports.newUserSignup = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        date_joined: admin.firestore.FieldValue.serverTimestamp(),
        next_meet: admin.firestore.FieldValue.serverTimestamp(),
        country: null,
        interested_sectors:[],
        sector:null
    })
})

exports.scheduleMeets = functions.https.onRequest((req, res) => {
    return console.log("Success!")
  });

// exports.scheduleMeets = functions.pubsub
//     .schedule('every 2 minutes').onRun(context => {
//         console.log("Function has run")
        
//      });
