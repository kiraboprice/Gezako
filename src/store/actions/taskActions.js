export const createTask = (task) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    firestore.collection('tasks').add({
      ...task,
      authorFirstName: 'Power',
      authorLastName: 'Mukisa',
      authorId: 12345,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_TASK_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_TASK_ERROR' }, err);
    });
  }
};
