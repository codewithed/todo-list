import Project from './modules/project';
import createTodoList from './modules/todolist';
import newTodo from './modules/Todo';
import addProjToDom from './modules/domstuff';

// create new todolist
const projectlist = createTodoList();

// create new project
const inbox = Project('inbox');
projectlist.addProject(inbox);

// set default project
const defaultProject = inbox;

const addProjectBtn = document.getElementById('addProjectBtn');
addProjectBtn.addEventListener('click', addProjToDom);
