import { v4 as uuidv4 } from 'uuid';

class BoardModel {
  toResponse(board) {
    if (board) {
      return { ...board, id: String(board.id) };
    }
    return {};
  }

  toSave(board) {
    if (board) {
      const columnsData = board.columns.map(column => ({
        ...column,
        id: uuidv4()
      }));
      return {
        ...board,
        columns: JSON.stringify(columnsData)
      };
    }
    return {};
  }
}

export { BoardModel };
