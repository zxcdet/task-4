class TaskModel {
  toResponse(task) {
    if (task) {
      return {
        ...task,
        id: task.id.toString(),
        boardId: task.boardId.toString()
      };
    }
    return {};
  }
}

export { TaskModel };
