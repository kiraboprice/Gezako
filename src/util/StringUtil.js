import {BASE_DOCUMENT} from "../constants/FireStore";

//prod test emails
// const testEmails = [ // - UNCOMMENT THIS WHEN DEPLOYING TO PROD!!!
//   "derekleiro@gmail.com"
// ];

//stage test emails
const testEmails = [ // - COMMENT THIS OUT WHEN DEPLOYING TO PROD!!!
  "derekleiro@gmail.com",
  "leiro.derek@gmail.com",
  "richkitibwa@gmail.com",
  "angello@obel.co",
  "johnkitatta2018@gmail.com"
];

//mamaOpe email are needed since the company doesnt have a custom GSuite email domain
const mamaOpeUserEmails = [
  "powermukisa@gmail.com",
  "besufekadsm@gmail.com",
  "koburongo@gmail.com",
  "cedriclusiba@gmail.com",
  "jollankent@gmail.com",
  "turyabagye.brian@gmail.com"
];

export const checkUserEmailIsValid = (email) => {
  if (testEmails.includes(email)) {
    return true
  }

  else if (mamaOpeUserEmails.includes(email)) { //this is not permanent
    return true
  }

  else if (email.includes("@tala.co")) { //this is not permanent. we have a few company clients. // this logic can be improved by checking the db
    return true
  }

  else return false;
};

export const getCompanyNameFromEmail = (email) => {
  if (testEmails.includes(email)) {
    return "test"
  }

  else if (mamaOpeUserEmails.includes(email)) { //this is not permanent
    return "mamaope"
  }

  else if (email.includes("@tala.co")) { //this is not permanent. we have a few company clients. // this logic can be improved by checking the db
    return "tala"
  }

  else return "undefinedCompany";
};

export const getTestPhaseFromPathName = (pathname) => {
  if(pathname.includes('development')){
    return 'development'
  } else if (pathname.includes('completed')) {
    return 'completed'
  }
};

export const getReportsCollectionUrl = (company) => {
    return BASE_DOCUMENT + `${company}/reports`
};

export const getFeaturesCollectionUrl = (company) => {
  return BASE_DOCUMENT + `${company}/features`
};

export const getUsersCollectionUrl = (company) => {
  return BASE_DOCUMENT + `${company}/users`
};

export const getServiceStatsCollectionUrl = (company) => {
  return BASE_DOCUMENT + `${company}/servicestats`
};

export const getFirstNameFromFullName = (fullName) => {
  return fullName ? fullName.split(' ').slice(0, -1).join(' ') : null
};

export const getAssigneeNameForReport = (report) => {
  return report.assignedTo ?
      getFirstNameFromFullName(report.assignedTo.displayName) :
      null
};

// export const getAssigneeNameForFeatureTest = (metadata) => {
//   return metadata.assignedTo ?
//       getFirstNameFromFullName(metadata.assignedTo.displayName) :
//       null
// };

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const getServiceNameFromPathName = (pathname, section) => {
  return pathname.split(`/${section}/`)[1];
};
