import Todo from './Todo';
import TodoList from './TodoList';
import Project from './Project';
import Storage from './Storage';

export default function loadUi() {
  // add dom manipulation logic
  const tasklist = document.getElementById('tasklist');
  const projectBtns = document.querySelectorAll('#projectBtn');
  const addProjectBtn = document.getElementById('addProjectBtn');
  let addingProj = false;

  // add behaviour for when project button is clicked

  // add behaviour when addProject is clicked
  const projectSection = document.getElementById('userProjects');
  function addProjToDom() {
    const projectPrompt = document.createElement('div');
    projectPrompt.classList.add('project-prompt');
    projectPrompt.innerHTML = `<input type="text" value="" placeholder="project title" data-project-title>
  <div><button id="add" style="background-color: rgb(123, 237, 157);">Add</button>
<button id="cancel" style="background-color: rgb(247, 95, 95)">Cancel</button></div>`;
    projectSection.appendChild(projectPrompt);
    addProjectBtn.style.display = 'none';
    addingProj = true;
  }
}
