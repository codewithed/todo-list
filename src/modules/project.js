import {
  isToday, isThisWeek,
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
    arr.filter((task) => isToday(task.dueDate));
  };
  const getWeeklyTasks = () => {
    arr.filter((task) => isThisWeek(task.dueDate));
  };
  return {
    projectName, arr, addTask, removeTask, getTodayTasks, getWeeklyTasks,
  };
};

export default Project;
