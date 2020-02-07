import {BASE_DOCUMENT} from "../constants/FireStore";

export const checkUserEmailIsValid = (email) => {
  const testEmails = [
    "powermukisa@gmail.com",
    "derekleiro@gmail.com",
    "leiro.derek@gmail.com",
    "richkitibwa@gmail.com",
  ];
  if(testEmails.includes(email)){
    return true
  }
  else return !!email.includes("@tala.co");
};

export const getTestPhaseFromPathName = (pathname) => {
  if(pathname.includes('development')){
    return 'development'
  } else if (pathname.includes('completed')) {
    return 'completed'
  }
};

export const getReportsCollectionUrl = () => {
    return BASE_DOCUMENT + '/reports'
};

export const getFeaturesCollectionUrl = () => {
  return BASE_DOCUMENT + '/features'
};

export const getFirstNameFromFullName = (fullName) => {
  return fullName ? fullName.split(' ').slice(0, -1).join(' ') : null
};

export const getAssigneeName = (report) => {
  return report.assignedTo ?
      getFirstNameFromFullName(report.assignedTo.displayName) :
      null
};

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
