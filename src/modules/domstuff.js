import Todo from './Todo';
import ProjectList from './projectlist';
import Project from './project';
import Storage from './storage';

export default function loadUi() {
  // create default objects
  const defaultProject = new Project('defaultProject');
  const projectToday = new Project('projectToday');
  const projectThisWeek = new Project('projectThisWeek');
  let currentProject = defaultProject;
  const projectList = new ProjectList();

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

    add.addEventListener('click', addProject);
    cancel.addEventListener('click', removeProjectPrompt);
  }

  // loads todos of a project
  function loadTodos() {
    currentProject.arr.forEach((element) => {
      // create todo component
      const todoSection = document.getElementById('tasklist');
      const todoItem = document.createElement('button');
      todoItem.classList.add('todo-item');
      todoItem.innerHTML = `<div class="left-task-panel"><i class="fa-regular fa-circle"></i><p>${element.title}</p><input type="text" class="input-task-name" data-input-task-name=""></div>
      <div class="right-task-panel"><p id='dueDate'>${element.dueDate}</p><input type="date" name="" id="inputDueDate" class="input-date" data-input-date><i class="fa-solid fa-xmark"></i></i></div>`;
      const index = currentProject.arr.length;
      todoItem.setAttribute('data-index', index);
      todoSection.append(todoItem);
      todoItem.addEventListener('click', deleteTodo);
    });
  }

  // creates new project from projectPrompt
  function addProject() {
    const title = document.getElementById('projectTitle').value;
    if (title === undefined || title === '') {
      alert("Project name can't be empty");
    } else {
      const projectPrompt = document.getElementById('projectPrompt');
      const newProj = new Project(title);
      projectList.addProject(newProj);

      // create project button
      const userProjects = document.getElementById('userProjects');
      const projectButton = document.createElement('button');
      projectButton.classList.add('project-button');
      projectButton.style.id = 'projectButton';
      projectButton.setAttribute('data-index', projectList.arr.length - 1);
      projectButton.innerHTML = `<div class="left-project-panel"><i class="fa-solid fa-list"></i><span>&nbsp${title}</span></div>
     <div class="right-project-panel"><i class="fa-solid fa-xmark"></i></div>`;
      userProjects.appendChild(projectButton);
      const addProjectBtn = document.getElementById('addProjectBtn');

      addProjectBtn.style.display = 'block';
      projectPrompt.remove();

      // add event listeners
      projectButton.addEventListener('click', () => {
        currentProject = newProj;
        const todoSection = document.getElementById('tasklist');
        todoSection.innerHTML = '';
        const projtitle = document.getElementById('projectTitle');
        projtitle.innerText = newProj.name;

        loadTodos();
      });
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
      const { index } = e.target.dataset.index;
      projectList.removeProject(index);
      e.target.remove();
    }
  }

  // ADD FUNCTIONS FOR GETTING TODO ITEMS

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

  // deletes todo task
  function deleteTodo(e) {
    if (e.target.classList.contains('fa-xmark') || e.target.classList.contains('fa-circle')) {
      // remove todo component
      const todo = e.target.parentElement.parentElement;
      todo.remove();
      // remove the corresponding todo object
      const num = todo.dataset.index;
      currentProject.removeTask(num);
    }
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

      // create todo component
      const todoItem = document.createElement('button');
      todoItem.classList.add('todo-item');
      todoItem.innerHTML = `<div class="left-task-panel"><i class="fa-regular fa-circle"></i><p>${taskName}</p><input type="text" class="input-task-name" data-input-task-name=""></div>
      <div class="right-task-panel"><p id='dueDate'>No Date</p><input type="date" name="" id="inputDueDate" class="input-date" data-input-date><i class="fa-solid fa-xmark"></i></i></div>`;
      const todoSection = document.getElementById('tasklist');
      const index = currentProject.arr.length - 1;
      todoItem.setAttribute('data-index', index);
      todoSection.append(todoItem);
      todoItem.addEventListener('click', deleteTodo);
      const addTodoBtn = document.getElementById('addTodoBtn');
      addTodoBtn.style.display = 'block';
    }
  }

  function removeTodoPrompt() {
    const todoPrompt = document.getElementById('todoPrompt');
    todoPrompt.remove();
    const addTodoBtn = document.getElementById('addTodoBtn');
    addTodoBtn.style.display = 'block';
  }

  // get the todo tasks in inbox
  function getInboxTasks() {

  }

  // get the todo tasks of the day
  function getDaysTasks() {
  }

  // function get the todo tasks of the week
  function getWeeksTasks() {
  }

  // ADD EVENT LISTENERS
  const addProjectBtn = document.getElementById('addProjectBtn');
  addProjectBtn.addEventListener('click', promptProject);

  const addTodoBtn = document.getElementById('addTodoBtn');
  addTodoBtn.addEventListener('click', promptTodo);
}
