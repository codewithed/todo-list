const newTodo = (title, dueDate, description, priority) => ({
  title,
  dueDate,
  description,
  priority,

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
});

export default newTodo;
