const todolist = () => {
  const arr = [];
  function addProject(project) {
    todolist.push(project);
  }

  function removeProject(project) {
    todolist.splice(todolist.indexOf(project), 1);
  }
  return { arr, addProject, removeProject };
};

export default todolist;
