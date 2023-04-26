const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.uploadScore = functions.https.onCall((data, context) => {
    const ref = admin.database().ref('scores/' + data.deviceId);
    
    ref.set(data).then(() => {
      return 'Data set successfully.';
    }).catch(error => {
      return error;
    });
});
