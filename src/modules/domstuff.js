import Todo from './Todo';
import TodoList from './todolist';
import Project from './project';
import Storage from './storage';

export default function loadUi() {
  // create default objects
  const defaultProject = Project('defaultProject');
  const currentProject = defaultProject;
  const projectList = TodoList();

  // creates projectPrompt and appends it to screen
  function promptProject() {
    const projectPrompt = document.createElement('div');
    projectPrompt.style.id = 'projectPrompt';
    const addProjectBtn = document.getElementById('addProjectBtn');
    projectPrompt.classList.add('project-prompt');
    projectPrompt.innerHTML = `<input type="text" value="" placeholder="project title" data-projectTitle>
  <div><button id="add" style="background-color: rgb(123, 237, 157);">Add</button>
<button id="cancel" style="background-color: rgb(247, 95, 95)">Cancel</button></div>`;
    addProjectBtn.style.display = 'none';
  }

  // creates new project from projectPrompt
  function addProject() {
    const projectPrompt = document.getElementById('projectPrompt');
    const newProj = Project(projectPrompt.dataset.projectTitle);
    const addProjectBtn = document.getElementById('addProjectBtn');
    projectList.addProject(newProj);
    projectPrompt.remove();
    addProjectBtn.style.display = 'none';
  }

  // create project button component
  function createProjectButton() {
    const userProjects = document.getElementById('userProjects');
    const projectButton = document.createElement('button');
    projectButton.classList.add('projectButton');
    projectButton.style.id = 'projectButton';
    projectButton.dataset.property = 'data-projectButton';
    projectButton.innerHTML = `<div class="left-project-panel"><img src="dist/images/project.svg" alt="" class="project-icon"><span></span></div>
    <div class="right-project-panel"><img src="dist/images/trash-can.svg" alt="" ></div>`;
    userProjects.appendChild(projectButton);
  }

  // removes project prompt
  function cancelProjectPromt() {
    const addProjectBtn = document.getElementById('addProjectBtn');
    const projectPrompt = document.getElementById('projectPrompt');
    projectPrompt.remove();
    addProjectBtn.style.display = 'none';
  }

  // adds task to current project
  function addTask() {
    const task = Todo(title, dueDate, description, priority, completedStatus);
    currentProject.addTask(task);
  }

  // delete task from current project
  function deleteTask(taskName) {
    currentProject.removeTask(taskName);
  }

  // delete project
  function deleteProject(projectName) {
    // delete task from current project
    projectList.removeProject(projectName);
  }

  /*
   might store all todos in the todolist instead?
   next up is to create the components and add them to the functions
   also need to implement the local  interface
   then finally wire up the functions to the eventlisteners
   and extra tweaks
  */
}
