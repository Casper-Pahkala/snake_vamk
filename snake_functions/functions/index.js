const functions = require("firebase-functions");
const admin = require("firebase-admin");


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.getScores = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


exports.uploadScore = functions.https.onRequest((request, response) => {
    //User constants
    

    const db = getDatabase();
    
    // const userRef = db.ref('users/' + data.uid);

    // return userRef.set({

    //     firstName: firstName,
    //     lastName, lastName,
    //     timestamp: admin.database.ServerValue.TIMESTAMP,
    // });
});
