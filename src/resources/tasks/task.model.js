import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      default: null
    },
    boardId: {
      type: String
    },
    columnId: String,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default() {
        return this._id;
      }
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret._id;
      }
    }
  }
);
const Task = mongoose.model('Task', taskSchema);

export { Task };
