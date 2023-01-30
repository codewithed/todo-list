const newTodo = (title, dueDate, description, priority, completedStatus) => ({
  title,
  dueDate,
  description,
  priority,
  completedStatus,

  editTitle(newTitle) {
    this.title = newTitle;
  },
  editDescription(newDesc) {
    this.description = newDesc;
  },
  editPriority(newPriority) {
    this.priority = newPriority;
  },
  editDueDate(newDueDate) {
    this.dueDate = newDueDate;
  },
  editCompletedStatus(newCompletedStatus) {
    this.completedStatus = newCompletedStatus;
  },
});

export default newTodo;
