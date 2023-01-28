import {
  toDate, isToday, isThisWeek, subDays,
} from 'date-fns';

// project factory function
const Project = (projectName) => {
  const arr = [];
  const addTask = (todo) => {
    arr.push(todo);
  };
  const removeTask = (todo) => {
    arr.splice(arr.indexOf(todo), 1);
  };
  return {
    projectName, arr, addTask, removeTask,
  };
};

export default Project;
