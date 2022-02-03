const functions = require("firebase-functions");
const admin = require("firebase-admin");

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
        bookMeeting(docs[i], originalUserDoc)
      break;
    }
  }
}

function bookMeeting(user1, user2) {
    const date = new Date();
    date.setHours(168, 0, 0, 0);
    const plus1WeekTimestamp = admin.firestore.Timestamp.fromDate(date);

    const q = admin.firestore().collection("meets").doc().set({
        created_at: admin.firestore.Timestamp.now(),
        date_scheduled: plus1WeekTimestamp,
        interests_in_common: user.uid,
        participants: [{
            description:user1.description,
            name:user1.name,
            sector:user1.sector,
            uid:user1.uid,
        },{
            description:user2.description,
            name:user2.name,
            sector:user2.sector,
            uid:user2.uid,
        }],
        uids: [user1.uid, user2.uid],
      });
  }

function updateUserNextMeet(uid, timestamp) {
  const q = admin.firestore().collection("users").doc(uid).set({
    next_meet: timestamp,
  }, { merge: true });
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
