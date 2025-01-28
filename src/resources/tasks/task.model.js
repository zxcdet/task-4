class TaskModel {
  toResponse(task) {
    if (task) {
      return {
        ...task,
        id: String(task.id),
        boardId: String(task.boardId)
      };
    }
    return {};
  }
}

export { TaskModel };
