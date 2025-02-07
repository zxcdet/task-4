class BoardModel {
  toResponse(board) {
    if (board) {
      return {
        ...board,
        id: board.id.toString()
      };
    }
    return {};
  }
}

export { BoardModel };
