import Todo from './Todo';
import TodoList from './todolist';
import Project from './project';
import Storage from './storage';

export default function loadUi() {
  // create basic needed objects
  const defaultProject = Project('defaultProject');
  const currentProject = defaultProject;
  const projectList = TodoList();
  const tasksArea = document.getElementById('taskList');

  // creates project
  function createProject(projectName) {
    let name = projectName;
    name = Project(projectName);
    projectList.addProject(name);
  }

  // adds task to current project
  function addTask(title, dueDate, description, priority, completedStatus) {
    const task = Todo(title, dueDate, description, priority, completedStatus);
    currentProject.addTask(task);
  }

  // delete task from current project
  function deleteTask(taskName) {
    currentProject.removeTask(taskName);
  }

  // delete project
  function deleteProject(projectName) {
    projectList.removeProject(projectName);
  }

  /*
   might store all todos in the todolist instead?
   next up is to create the components and add them to the functions
   also need to implement the local storage interface
   then finally wire up the functions to the eventlisteners
  */
}
