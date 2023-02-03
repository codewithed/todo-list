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
    const userProjects = document.getElementById('userProjects');
    projectPrompt.setAttribute('id', 'projectPrompt');
    const addProjectBtn = document.getElementById('addProjectBtn');
    projectPrompt.classList.add('project-prompt');
    projectPrompt.innerHTML = `<input type="text" value="" placeholder="project title" id='projectTitle'>
  <div><button id="add" style="background-color: rgb(123, 237, 157);">Add</button>
<button id="cancel" style="background-color: rgb(247, 95, 95)">Cancel</button></div>`;
    userProjects.append(projectPrompt);
    addProjectBtn.style.display = 'none';

    // add or cancel buttons
    const add = document.getElementById('add');
    const cancel = document.getElementById('cancel');

    add.addEventListener('click', addProject, removeProjectPrompt);
    cancel.addEventListener('click', removeProjectPrompt);
  }

  // creates new project from projectPrompt
  function addProject() {
    const title = document.getElementById('projectTitle').value;
    if (title === undefined || title === '') {
      alert("Project name can't be empty");
    } else {
      const projectPrompt = document.getElementById('projectPrompt');
      const newProj = Project(title);
      projectList.addProject(newProj);

      // create project button
      const userProjects = document.getElementById('userProjects');
      const projectButton = document.createElement('button');
      projectButton.classList.add('project-button');
      projectButton.style.id = 'projectButton';
      projectButton.innerHTML = `<div class="left-project-panel"><i class="fa-solid fa-list"></i><span>&nbsp${title}</span></div>
    <div class="right-project-panel"><i class="fa-solid fa-xmark"></i></div>`;
      userProjects.appendChild(projectButton);
      const addProjectBtn = document.getElementById('addProjectBtn');
      addProjectBtn.style.display = 'block';
      projectPrompt.remove();
    }
  }

  // removes project prompt
  function removeProjectPrompt() {
    const addProjectBtn = document.getElementById('addProjectBtn');
    const projectPrompt = document.getElementById('projectPrompt');
    projectPrompt.remove();
    addProjectBtn.style.display = 'block';
  }

  // deletes a project
  function deleteProject(e) {
    if (e.target.style.id === 'projectButton') {
      projectList.removeProject(e.target.dataset.projectTitle);
      e.target.remove();
    }
  }

  /*
   might store all todos in the todolist instead?
   next up is to create the components and add them to the functions
   also need to implement the local storage interface
   then finally wire up the functions to the eventlisteners
   and extra tweaks
  */

  // ADD FUNCTIONS FOR GETTING TODO ITEMS

  // addd a todo task to the current project
  function addTodo(todo) {
    currentProject.addTask(todo);
  }

  // get the todo tasks in inbox
  function getInboxTasks() {
  }

  // get the todo tasks of the day
  function getDayTodoTasks() {
  }

  // function get the todo tasks of the week
  function getDayWeeksTasks() {
  }

  // loads todos of a project
  function loadTasks(project) {
  }

  // ADD EVENT LISTENERS
  const addProjectBtn = document.getElementById('addProjectBtn');
  addProjectBtn.addEventListener('click', promptProject);
}
