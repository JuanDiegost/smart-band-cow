
const admin = require('firebase-admin');

const serviceAccount = require('./smart-cow.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://smart-cow-d6c6f.firebaseio.com',
});

const db = admin.firestore();

function getValue() {
  return Math.random();
}

setInterval(() => {
  console.log('nuevo dato');
  const docRef = db.collection('datos').doc(Date.now().toString());
  docRef.set({
    date: Date.now(),
    value: getValue(),
  });
}, 5000);
