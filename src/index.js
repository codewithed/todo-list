import Project from './modules/project';
import createTodoList from './modules/todolist';
import newTodo from './modules/Todo';

// create new todolist
const projectlist = createTodoList();

// create new project
const inbox = Project('inbox');
projectlist.addProject(inbox);

const defaultProject = inbox;
