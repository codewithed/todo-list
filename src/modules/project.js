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
  const getTodayTasks = () => {
    arr.filter((task) => task.dueDate === isToday);
  };
  const getWeeklyTasks = () => {
    arr.filter((task) => task.dueDate === isThisWeek);
  };
  return {
    projectName, arr, addTask, removeTask,
  };
};

export default Project;
