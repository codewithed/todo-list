import {
  isToday, isThisWeek, isPast,
} from 'date-fns';

// project factory function
function Project(projectName) {
  this.name = projectName;
  this.arr = [];
  this.addTask = (todo) => {
    this.arr.push(todo);
  };
  this.removeTask = (index) => {
    this.arr.splice(index, 1);
  };
  this.getTodayTasks = () => {
    this.filter((task) => isToday(task.dueDate));
  };
  this.getWeeklyTasks = () => {
    this.arr.filter((task) => isThisWeek(task.dueDate));
  };
  this.pastDueTasks = () => {
    this.arr.filter((task) => isPast(task.dueDate));
  };
}

export default Project;
