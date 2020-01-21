const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const BASE_DOCUMENT = 'company/tala';

exports.incrementNumberOfTestsForServiceOnCreate = functions.firestore
.document(`${BASE_DOCUMENT}/completedreports/{id}`)
.onCreate((snap, context) => {
  return incrementNumberOfTestsForService(context.params.id, snap.data(), null);
});

exports.incrementNumberOfTestsForServiceOnUpdate = functions.firestore
.document(`${BASE_DOCUMENT}/completedreports/{id}`)
.onUpdate((change, context) => {
  return incrementNumberOfTestsForService(context.params.id, change.after.data(), change.before.data());
});



function incrementNumberOfTestsForService(id, newReport, oldReport) {
  return db.collection(`${BASE_DOCUMENT}/reportstats`).doc(newReport.service).get()
  .then(doc => {
    if (!doc.exists) {
      //create report stats for that service if it doesnt exist
      console.log(`Service entry doesnt exist. Creating entry for ${newReport.service}`);
      db.collection(`${BASE_DOCUMENT}/reportstats`).doc(newReport.service).set(
          {
            numberOfTests: newReport.numberOfTests,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          }
      ).then(
          console.log(`Created entry for ${newReport.service}`)
      )
    } else {
      //update report stats for service
      console.log('Service entry exists: updating report stats..');
      updateReportStats(doc.data(), oldReport, newReport)
    }
  })
  .catch(err => {
    console.log('incrementNumberOfTestsForService FAILED: ', err)
  });
}

function updateReportStats(reportStats, oldReport, newReport) {
  const oldNumberOfTests = parseInt(oldReport.numberOfTests);
  const newNumberOfTests = parseInt(newReport.numberOfTests);
  const numberOfTestsToIncrementBy = newNumberOfTests - oldNumberOfTests;

  //todo this assumes that the service has not been updated. Remove ability to update the service coz why would you do this anyway?
  return db.collection(`${BASE_DOCUMENT}/reportstats`).doc(newReport.service)
  .update({
    numberOfTests: reportStats.numberOfTests + numberOfTestsToIncrementBy,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  })
  .then(doc => {
    console.log('successfully updated Number Of Tests For Service', doc)})
  .catch(err => {
    console.log('failed to update number Of Tests For service FAILED: ', err)
  });
}
