import {
  isToday, isThisWeek, isPast,
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
  const pastDueTasks = () => {
    arr.filter((task) => isPast(task.dueDate));
  };
  return {
    projectName, arr, addTask, removeTask, getTodayTasks, getWeeklyTasks, pastDueTasks,
  };
};

export default Project;
