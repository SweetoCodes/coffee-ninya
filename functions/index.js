const functions = require("firebase-functions");

const admin = require('firebase-admin')
admin.initializeApp()

exports.newUserSignup = functions.auth.user().onCreate(user => {
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        date_joined: admin.firestore.FieldValue.serverTimestamp()
    })
})

// Scheduling calendar invites weekly between two individuals that meet each others requirements.
// Function runs every x minutes, batching in larger time intervals (i.e. once per week on a Sunday) results in hitting the Google Calendar API Rate Limits (https://developers.google.com/calendar/api/guides/create-events).
// Uses a firebase CRON trigger to do so (i.e. https://fireship.io/lessons/cloud-functions-scheduled-time-trigger/)

// Request all users from user collection that do not have a meeting scheduled where looking_for_coffee_meets = true.
// Iterate through list of documents, for each document grab looking_for_sectors. 
// First query documents in remainder of list for similar timezone and selected sector, then query database for matches.
// For the first match check against "meets" collection to see whether they've met before, if not, schedule an event between the two attatched emails,
// using the google calendar API (emails, date/tine and both user descriptions to be included).
// Create new document in firestore (collection:meets) with meeting time, participant emails and participant UIDs
// Move to the next document.

// exports.everyFiveMinuteJob = functions.pubsub
//     .schedule('every 5 minutes').onRun(context => {
//         
//      });

//
