const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");
const googleCredentials = require("./credentials.json");

admin.initializeApp();

exports.newUserSignup = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    uid: user.uid,
    date_joined: admin.firestore.FieldValue.serverTimestamp(),
    next_meet: admin.firestore.FieldValue.serverTimestamp(),
    country: null,
    interested_sectors: [],
    sector: null,
  });
});

exports.scheduleMeets = functions.https.onRequest((req, res) => {
  const meet = getUsersWithoutScheduledMeets().then((usersWithoutMeets) => {
    if (usersWithoutMeets.length != 0) {
      findMeets(usersWithoutMeets);
    }
  });
  return null;
});

// exports.scheduleMeets = functions.pubsub
//     .schedule('every 2 minutes').onRun(context => {
//         console.log("Function has run")

//      });

async function getUsersWithoutScheduledMeets() {
  const users = admin
    .firestore()
    .collection("users")
    .where("next_meet", "<", admin.firestore.Timestamp.now());
  const snapshot = await users.get();
  return snapshot.docs.map((doc) => doc.data());
}

function findMeets(users) {
  var validUsers = findValidUsers(users);

  validUsers.forEach((user) => {
    const x = findMatch(
      user.sector,
      user.country,
      user.interested_sectors
    ).then((docs) => {
      if (x != []) {
        identifyOptimalMatch(docs, user);
      }
    });
  });
}

function identifyOptimalMatch(docs, originalUserDoc) {
  for (let i = 0; i < docs.length; i++) {
    if (docs[i].uid == originalUserDoc.uid) {
      console.log("same");
      continue;
    } else {
      bookMeeting(docs[i], originalUserDoc);
      break;
    }
  }
}

function bookMeeting(user1, user2) {
  const date = new Date();
  date.setHours(168, 0, 0, 0);
  const plus1WeekTimestamp = admin.firestore.Timestamp.fromDate(date);
  const sharedInterests = user1.interests.filter((value) =>
    user2.interests.includes(value)
  );

  const q = admin
    .firestore()
    .collection("meets")
    .doc()
    .set({
      created_at: admin.firestore.Timestamp.now(),
      date_scheduled: plus1WeekTimestamp,
      interests_in_common: sharedInterests,
      participants: [
        {
          description: user1.description,
          name: user1.first_name,
          sector: user1.sector,
          uid: user1.uid,
        },
        {
          description: user2.description,
          name: user2.first_name,
          sector: user2.sector,
          uid: user2.uid,
        },
      ],
      uids: [user1.uid, user2.uid],
    })
    .then(() => {
      updateUserNextMeet(user1.uid, plus1WeekTimestamp);
      updateUserNextMeet(user2.uid, plus1WeekTimestamp);
    });

  const eventData = {
    eventName:
      "Coffee Meet between " + user1.first_name + " and " + user2.first_name,
    description:
      "This is your weekly scheduled Coffee Meet. Add a google meet link and organise a time that suits both of you!",
    startTime: date,
    timeZone: "EST",
    user1Email: user1.email,
    user2Email: user2.email,
  };
  const oAuth2Client = new OAuth2(
    googleCredentials.web.client_id,
    googleCredentials.web.client_secret,
    googleCredentials.web.redirect_uris[0]
  );

  oAuth2Client.setCredentials({
    refresh_token: googleCredentials.refresh_token,
  });

  addEvent(eventData, oAuth2Client)
    .then((data) => {
      response.status(200).send(data);
      return;
    })
    .catch((err) => {
      console.error("Error adding event: " + err.message);
      response.status(500).send(ERROR_RESPONSE);
      return;
    });
}

function updateUserNextMeet(uid, timestamp) {
  const q = admin.firestore().collection("users").doc(uid).set(
    {
      next_meet: timestamp,
    },
    { merge: true }
  );
}

function findValidUsers(users) {
  const date = new Date();
  date.setHours(24, 0, 0, 0);
  const plus24Timestamp = admin.firestore.Timestamp.fromDate(date);

  const validUsers = [];
  users.forEach((user) => {
    if (
      (user.interested_sectors == []) |
      (user.interested_sectors == null) |
      (user.sector == null) |
      (user.country == null)
    ) {
      updateUserNextMeet(user.uid, plus24Timestamp);
    } else {
      validUsers.push(user);
    }
  });
  return validUsers;
}

async function findMatch(sector, country, interested_sectors) {
  const interestedSectorSample = shuffle(interested_sectors).slice(0, 10);
  const users = admin
    .firestore()
    .collection("users")
    .where("next_meet", "<", admin.firestore.Timestamp.now())
    .where("interested_sectors", "array-contains", sector)
    .where("country", "=", country)
    .where("sector", "in", interestedSectorSample)
    .orderBy("next_meet", "desc")
    .limit(2);
  const snapshot = await users.get();
  return snapshot.docs.map((doc) => doc.data());
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function addEvent(event, auth) {
  return new Promise(function (resolve, reject) {
    calendar.events.insert({
      auth: auth,
      calendarId: "primary",
      resource: {
        summary: event.eventName,
        description: event.description,
        start: {
          dateTime: event.startTime,
          timeZone: event.timeZone,
        },
        endTimeUnspecified: true,
        attendees: [{ email: event.user1Email }, { email: event.user2Email }],
        guestsCanModify: true,
        guestsCanSeeOtherGuests: true,
      },
    });
  });
}

const ERROR_RESPONSE = {
  status: "500",
  message: "There was an error adding an event to your Google calendar",
};
