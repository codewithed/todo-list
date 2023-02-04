function ProjectList() {
  const arr = [];
  function addProject(project) {
    arr.push(project);
  }

  function removeProject(project) {
    arr.splice(arr.indexOf(project), 1);
  }
  return { arr, addProject, removeProject };
}

export default ProjectList;
