
const initState = {
  tasks: [
    {id: '1', title: 'Task  1', content: 'Task  1 stuff'},
    {id: '2', title: 'Task  2', content: 'Task  2 stuff'},
    {id: '3', title: 'Task  3', content: 'Task  3 stuff'}
  ]
}


const taskReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TASK_SUCCESS':
      console.log('create task success', action.task);
      return state;

    case 'CREATE_TASK_ERROR':
      console.log('create task error', action.err);
      return state;

    default:
      return state;

  }
};

export default taskReducer;