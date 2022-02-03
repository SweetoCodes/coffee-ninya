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
        if (docs[i].uid == originalUserDoc.uid){
            console.log("same")
            continue
        }
        else{
            const x = "bookMeeting(docs[i].uid, originalUserDoc.uid)"
            break
        }
      }
}

function updateUserNextMeet(uid, timestamp) {
  console.log(uid, timestamp);
}

function findValidUsers(users) {
  const validUsers = [];
  users.forEach((user) => {
    if (
      (user.interested_sectors == []) |
      (user.interested_sectors == null) |
      (user.sector == null) |
      (user.country == null)
    ) {
    //   updateUserNextMeet(user.uid, timestamp);
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
  let currentIndex = array.length, randomIndex;

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
