
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const BASE_DOCUMENT = 'company/tala';

exports.incrementNumberOfTestsForService = functions.firestore
.document(`${BASE_DOCUMENT}/completedreports/{id}`)
.onCreate((snap, context) => {
  return incrementNumberOfTestsForService(context.params.id, snap.data());
});

function incrementNumberOfTestsForService(id, report) {
  return db.collection(`${BASE_DOCUMENT}/reportstats`).doc(report.service).get()
  .then(doc => {
    if (!doc.exists) {
      //create report stats for that service if it doesnt exist
      console.log(`Service entry doesnt exist. Creating entry for ${report.service}`);
      db.collection(`${BASE_DOCUMENT}/reportstats`).doc(report.service).set(
          {numberOfTests: report.numberOfTests}
      ).then(
          console.log(`Created entry for ${report.service}`)
      )
    } else {
      //get current report stats for service
      console.log('Service entry exists: getting report starts for doc')
    }
  })
  .catch(err => {
    console.log('incrementNumberOfTestsForService FAILED: ', err)
  });

  // //get current report stats for service
  // db.doc(`company/tala/reportstats/${report.service}`)
  // .get()
  //
  // //update report stats
  // const numberOfTests = report.prevNumberOfTests;
  // const service = report.service;
  // const time = db.FieldValue.serverTimestamp();
  //
  // return db.doc(`company/tala/reportstats/${service}`)
  // .update()
  // .then(doc => console.log('updateNumberOfTestsForService', doc))
}