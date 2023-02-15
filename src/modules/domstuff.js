import Todo from './Todo';
import ProjectList from './projectlist';
import Project from './project';
import { saveItem, getItem, deleteItem } from './storage';

export default function loadUi() {
  // create default objects
  const defaultProject = new Project('defaultProject');
  let currentProject = defaultProject;
  const projectList = new ProjectList();

  // creates new project from projectPrompt
  function addProject(title) {
    const newProj = new Project(title);
    projectList.addProject(newProj);
  }

  // deletes a project
  function deleteProject(e) {
    if (e.target.classList.contains('fa-xmark')) {
      const projectBtn = e.target.parentElement.parentElement;
      const num = projectBtn.dataset.index;
      projectList.removeProject(num);
      projectBtn.remove();
      e.stopPropagation();
    }
  }

  // updates a todo item
  function updateTodo(e) {
    if (e.target.classList.contains('todo-title') || e.target.classList.contains('due-date')) {
      const value = e.target;
      value.style.display = 'none';

      // make input element visible
      const inputItem = e.target.parentElement.querySelector('input');
      inputItem.classList.add('active');

      // listen for enter event
      document.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          const input = inputItem.value;
          if (input === '' || input === undefined) {
            alert('Value cannot be empty');
          } else {
            inputItem.classList.remove('active');
            value.style.display = 'block';
            const index = value.parentElement.parentElement.dataset;
            value.innerText = input;

            // update todo item with new data
            if (value.classList.contains('todo-title')) {
              currentProject.arr[index].editTitle(input);
            }
            if (value.classList.contains('due-date')) {
              currentProject.arr[index].editDueDate(input);
            }
          }
        }
      });
    }
  }

  // deletes todo task
  function deleteTodo(e) {
    // remove todo component
    if (e.target.classList.contains('fa-xmark')) {
      const todo = e.target.parentElement.parentElement;
      todo.remove();
      // remove the corresponding todo object
      const num = todo.dataset.index;
      currentProject.removeTask(num);
    }
  }

  // create todo component
  function createTodoComponent(title, date) {
    const todoSection = document.getElementById('tasklist');
    const todoItem = document.createElement('button');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `<div class="left-task-panel"><i class="fa-regular fa-circle"></i><p class="todo-title">${title}</p><input type="text" class="input-task-name" data-input-task-name=""></div>
    <div class="right-task-panel"><p class='due-date'>${date}</p><input type="date" name="" id="inputDueDate" class="input-date" data-input-date><i class="fa-solid fa-xmark"></i></i></div>`;
    const index = currentProject.arr.length;
    todoItem.setAttribute('data-index', index);
    todoSection.append(todoItem);
    todoItem.addEventListener('click', deleteTodo);
    todoItem.addEventListener('click', updateTodo);
  }

  // loads todos of a project
  function loadTodos(arr) {
    arr.forEach((element) => {
      createTodoComponent(element.title, element.dueDate);
    });
  }

  // shows current project title in the todo section
  function showProjInDom(projectName) {
    const todoSection = document.getElementById('tasklist');
    todoSection.innerHTML = '';
    const projtitle = document.getElementById('projectTitle');
    projtitle.innerText = projectName;
  }

  function createProjectButton(title) {
    // create project button
    const userProjects = document.getElementById('userProjects');
    const projectButton = document.createElement('button');
    projectButton.classList.add('project-button');
    projectButton.style.id = 'projectButton';
    const projId = projectList.arr.length - 1;
    projectButton.setAttribute('data-index', projId);
    projectButton.innerHTML = `<div class="left-project-panel"><i class="fa-solid fa-list"></i><span>&nbsp${title}</span></div>
     <div class="right-project-panel"><i class="fa-solid fa-xmark"></i></div>`;
    userProjects.appendChild(projectButton);
    const addProjectBtn = document.getElementById('addProjectBtn');
    addProjectBtn.style.display = 'block';

    // add event listeners
    projectButton.addEventListener('click', (e) => {
      deleteProject(e);
      currentProject = projectList.arr[projId];
      showProjInDom(currentProject.name);
      loadTodos(currentProject.arr);
    });
  }

  // removes project prompt
  function removeProjectPrompt() {
    const addProjectBtn = document.getElementById('addProjectBtn');
    const projectPrompt = document.getElementById('projectPrompt');
    projectPrompt.remove();
    addProjectBtn.style.display = 'block';
  }

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

    add.addEventListener('click', () => {
      const title = document.getElementById('projectTitle').value;
      if (title === undefined || title === '') {
        alert("Project name can't be empty");
      }
      addProject(title);
      createProjectButton(title);
      removeProjectPrompt();
    });
    cancel.addEventListener('click', removeProjectPrompt);
  }

  // ADD FUNCTIONS FOR GETTING TODO ITEMS

  function removeTodoPrompt() {
    const todoPrompt = document.getElementById('todoPrompt');
    todoPrompt.remove();
    const addTodoBtn = document.getElementById('addTodoBtn');
    addTodoBtn.style.display = 'block';
  }

  // add a todo task to the current project
  function addTodo() {
    const todoPrompt = document.getElementById('todoPrompt');
    const taskName = document.getElementById('taskTitle').value;
    if (taskName === undefined || taskName === '' || taskName === null) {
      alert('Task name cannot be empty');
    } else {
      // create todo object
      const todo = Todo(taskName);
      currentProject.addTask(todo);
      todoPrompt.remove();

      createTodoComponent(taskName);
      const addTodoBtn = document.getElementById('addTodoBtn');
      addTodoBtn.style.display = 'block';
    }
  }

  function promptTodo() {
    // create todo prompt component
    const addTodoBtn = document.getElementById('addTodoBtn');
    addTodoBtn.style.display = 'none';
    const todoPrompt = document.createElement('div');
    todoPrompt.setAttribute('id', 'todoPrompt');
    todoPrompt.classList.add('project-prompt');
    todoPrompt.innerHTML = `<input type="text" value="" placeholder="task title" id='taskTitle'>
    <div><button id="add" style="background-color: rgb(123, 237, 157);">Add</button>
    <button id="cancel" style="background-color: rgb(247, 95, 95)">Cancel</button></div>`;
    const todoSection = document.getElementById('tasklist');
    todoSection.appendChild(todoPrompt);

    const add = document.getElementById('add');
    const cancel = document.getElementById('cancel');

    add.addEventListener('click', addTodo);
    cancel.addEventListener('click', removeTodoPrompt);
  }

  // get the todo tasks in inbox
  function getInboxTasks() {
    loadTodos(defaultProject.arr);
  }

  // ADD EVENT LISTENERS
  const addProjectBtn = document.getElementById('addProjectBtn');
  addProjectBtn.addEventListener('click', promptProject);

  const addTodoBtn = document.getElementById('addTodoBtn');
  addTodoBtn.addEventListener('click', promptTodo);

  const inboxBtn = document.getElementById('inboxBtn');
  inboxBtn.addEventListener('click', () => {
    currentProject = defaultProject;
    showProjInDom('Inbox');
    getInboxTasks();
  });

  // DEFAULT BEHAVIOUR WHEN WINDOW LOADS
  showProjInDom('Inbox');
  getInboxTasks();
}
