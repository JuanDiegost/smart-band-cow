const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.myFunctionName = functions.firestore
  .document('datos/{i d}')
  .onCreate((snap) => {
    const newValue = snap.data();

    // access a particular field as you would any JS property
    const { date } = newValue;
    const { value } = newValue;

    console.log(`DAte ${date} Value ${value}`);
    const payload = {
      notification: {
        title: 'News news',
        body: 'ES',
      },
    };

    return admin.messaging().sendToTopic('News', payload)
      .then((response) => {
        console.log('Notification sent successfully:', response);
      })
      .catch((error) => {
        console.log('Notification sent failed:', error);
      });
  });
