import {
  isToday, isThisWeek, isPast,
} from 'date-fns';

// project factory function
const Project = (projectName) => {
  const name = projectName;

  const arr = [];
  function addTask(todo) {
    arr.push(todo);
  }
  function removeTask(index) {
    arr.splice(index, 1);
  }
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
    name, arr, addTask, removeTask, getTodayTasks, getWeeklyTasks, pastDueTasks,
  };
};

export default Project;
