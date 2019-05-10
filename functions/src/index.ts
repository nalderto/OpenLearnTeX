import * as functions from 'firebase-functions';
//const cors = require('cors')({origin:  true});
var admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onCall((req, res) => {
  const submission = req.data.replace(/\s/g, "");

  const lessonNumber = req.lessonNumber;
  var passed = false;
  return db.collection('lessons').doc(`lesson${lessonNumber}`).get().then((doc: any) => {
      const solution = doc.data().solution.replace(/\s/g, "");
      console.log("Solution: ", solution);
      console.log("Submission: ", submission);
      //passed = solution.localeCompare(submission);
      passed = (solution == submission);
      return {result: passed}
    });
});
