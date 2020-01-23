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
  return db.collection(`${BASE_DOCUMENT}/reportstats`).doc(report.service).get()
  .then(doc => {
    if (!doc.exists) {
      //create report stats for that service if it doesnt exist
      console.log(`Service entry doesnt exist. Creating entry for ${report.service}`);
      db.collection(`${BASE_DOCUMENT}/reportstats`).doc(report.service).set(
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
      updateReportStatsOnCreate(doc.data(), report)
    }
  })
  .catch(err => {
    console.log('incrementNumberOfTestsOnCreate FAILED: ', err)
  });
}

function updateReportStatsOnCreate(reportStats, report) {
  const newReportStatsNumberOfTests = parseInt(reportStats.numberOfTests) + parseInt(report.numberOfTests);

  return db.collection(`${BASE_DOCUMENT}/reportstats`).doc(report.service)
  .update({
    numberOfTests: newReportStatsNumberOfTests,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  })
  .then(doc => {
    console.log('updateReportStatsOnCreate success', doc)})
  .catch(err => {
    console.log('updateReportStatsOnCreate error: ', err)
  });
}

function incrementNumberOfTestsOnUpdate(id, newReport, oldReport) {
  return db.collection(`${BASE_DOCUMENT}/reportstats`).doc(newReport.service).get()
  .then(doc => {
    updateReportStatsOnUpdate(doc.data(), oldReport, newReport)
  })
  .catch(err => {
    console.log('incrementNumberOfTestsOnUpdate error: ', err)
  });
}

//todo firestore bug! the data before and after are somehow switched - should be the line below
// function updateReportStatsOnUpdate(reportStats, oldReport, newReport) {
  function updateReportStatsOnUpdate(reportStats, newReport, oldReport) {
  const oldNumberOfTests = parseInt(oldReport.numberOfTests);
  console.log('oldNumberOfTests:', oldNumberOfTests);

const newNumberOfTests = parseInt(newReport.numberOfTests);
  console.log('newNumberOfTests:', newNumberOfTests);

  const numberOfTestsToIncrementBy = newNumberOfTests - oldNumberOfTests;
  console.log('numberOfTestsToIncrementBy:', numberOfTestsToIncrementBy);

  const newReportStatsNumberOfTests = parseInt(reportStats.numberOfTests) + numberOfTestsToIncrementBy;
  console.log('newReportStatsNumberOfTests:', newReportStatsNumberOfTests);

  //todo this assumes that the service has not been updated. Remove ability to update the service coz why would you do this anyway?
  return db.collection(`${BASE_DOCUMENT}/reportstats`).doc(newReport.service)
  .update({
    numberOfTests: newReportStatsNumberOfTests,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  })
  .then(doc => {
    console.log('updateReportStatsOnUpdate success', doc)})
  .catch(err => {
    console.log('updateReportStatsOnUpdate error: ', err)
  });
}

exports.deleteReportWhenStatusIsUpdatedToDeleted = functions.firestore
.document(`${BASE_DOCUMENT}/reports/{id}`)
.onUpdate((change, context) => {
  if(change.after.data().status === DELETED){
    return change.after.ref.delete();
  }
});