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

export const getReportPhaseFromPathName = (pathname) => {
  if(pathname.includes('development')){
    return 'development'
  } else if (pathname.includes('completed')) {
    return 'completed'
  }
};

export const getFirstNameFromFullName = (fullName) => {
  return fullName ? fullName.split(' ').slice(0, -1).join(' ') : null
};

export const getAssigneeName = (report) => {
  return report.assignedTo ?
      getFirstNameFromFullName(report.assignedTo.displayName) :
      null
};
