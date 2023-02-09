function ProjectList() {
  this.arr = [];

  this.addProject = (project) => {
    this.arr.push(project);
  };

  this.removeProject = (index) => {
    this.arr.splice(index, 1);
  };
}

export default ProjectList;
