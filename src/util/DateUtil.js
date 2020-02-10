import moment from "moment";

export const getDateString = (date) => {
  var dateString;
    try {
      dateString = moment(date.toDate()).calendar() //date from timestamp in firebase
    } catch {
      dateString = moment(date).calendar() //date from Date before it goes to firebase
    }
    return dateString;
};
