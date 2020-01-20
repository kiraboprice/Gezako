const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.createUser = functions.firestore
.document('company/tala/completedreports/{reportId}')
.onCreate((snap, context) => {
  const report = snap.data();
  //get the prevNumberOfTests
  const prevNumberOfTests = report.prevNumberOfTests;
  const numberOfTests = report.prevNumberOfTests;
  //update the test count for this service
  const service = report.service;
  updateNumberOfTestsForService(service, prevNumberOfTests, numberOfTests);

  //update this report's prevNumberOfTests to the current numberOfTests
  return updatePrevNumberOfTestsForReport(context.params.reportId, numberOfTests);
});


function updateNumberOfTestsForService (service, prevNumberOfTests, numberOfTests) {
  //first get current value
  //then build new object to push as update

  return admin.firestore().collection(`company/tala/reportstats/${service}`)
  .update()
  .then(doc => console.log('updateNumberOfTestsForService', doc))
}