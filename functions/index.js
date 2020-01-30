const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const BASE_DOCUMENT = 'company/tala';
const DELETED = "Deleted";

exports.incrementNumberOfTestsForServiceOnCreate = functions.firestore
.document(`${BASE_DOCUMENT}/reports/{id}`)
.onCreate((snap, context) => {
  return incrementNumberOfTestsOnCreate(context.params.id, snap.data());
});

//todo see how to use onWrite inorder to combine this logic

exports.incrementNumberOfTestsForServiceOnUpdate = functions.firestore
.document(`${BASE_DOCUMENT}/reports/{id}`)
.onUpdate((change, context) => {
  return incrementNumberOfTestsOnUpdate(context.params.id, change.before.data(), change.after.data());
});


function incrementNumberOfTestsOnCreate(id, report) {
  return db.collection(`${BASE_DOCUMENT}/servicestats`).doc(report.service).get()
  .then(doc => {
    if (!doc.exists) {
      //create report stats for that service if it doesnt exist
      console.log(`Service entry doesnt exist. Creating entry for ${report.service}`);
      db.collection(`${BASE_DOCUMENT}/serviceStats`).doc(report.service).set(
          {
            numberOfTests: report.numberOfTests,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          }
      ).then(
          console.log(`Created entry for ${report.service}`)
      )
    } else {
      //update report stats for service
      console.log('Service entry exists: updating report stats..');
      updateserviceStatsOnCreate(doc.data(), report)
    }
  })
  .catch(err => {
    console.log('incrementNumberOfTestsOnCreate FAILED: ', err)
  });
}

function updateserviceStatsOnCreate(serviceStats, report) {
  const newserviceStatsNumberOfTests = parseInt(serviceStats.numberOfTests) + parseInt(report.numberOfTests);

  return db.collection(`${BASE_DOCUMENT}/serviceStats`).doc(report.service)
  .update({
    numberOfTests: newserviceStatsNumberOfTests,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  })
  .then(doc => {
    console.log('updateserviceStatsOnCreate success', doc)})
  .catch(err => {
    console.log('updateserviceStatsOnCreate error: ', err)
  });
}

function incrementNumberOfTestsOnUpdate(id, newReport, oldReport) {
  return db.collection(`${BASE_DOCUMENT}/serviceStats`).doc(newReport.service).get()
  .then(doc => {
    updateserviceStatsOnUpdate(doc.data(), oldReport, newReport)
  })
  .catch(err => {
    console.log('incrementNumberOfTestsOnUpdate error: ', err)
  });
}

//todo firestore bug! the data before and after are somehow switched - should be the line below
// function updateserviceStatsOnUpdate(serviceStats, oldReport, newReport) {
  function updateserviceStatsOnUpdate(serviceStats, newReport, oldReport) {
  const oldNumberOfTests = parseInt(oldReport.numberOfTests);
  console.log('oldNumberOfTests:', oldNumberOfTests);

const newNumberOfTests = parseInt(newReport.numberOfTests);
  console.log('newNumberOfTests:', newNumberOfTests);

  const numberOfTestsToIncrementBy = newNumberOfTests - oldNumberOfTests;
  console.log('numberOfTestsToIncrementBy:', numberOfTestsToIncrementBy);

  const newserviceStatsNumberOfTests = parseInt(serviceStats.numberOfTests) + numberOfTestsToIncrementBy;
  console.log('newserviceStatsNumberOfTests:', newserviceStatsNumberOfTests);

  //todo this assumes that the service has not been updated. Remove ability to update the service coz why would you do this anyway?
  return db.collection(`${BASE_DOCUMENT}/serviceStats`).doc(newReport.service)
  .update({
    numberOfTests: newserviceStatsNumberOfTests,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  })
  .then(doc => {
    console.log('updateserviceStatsOnUpdate success', doc)})
  .catch(err => {
    console.log('updateserviceStatsOnUpdate error: ', err)
  });
}

exports.deleteReportWhenStatusIsUpdatedToDeleted = functions.firestore
.document(`${BASE_DOCUMENT}/reports/{id}`)
.onUpdate((change, context) => {
  if(change.after.data().status === DELETED){
    return change.after.ref.delete();
  }
});