import mongoose from 'mongoose';
import { Task } from '../tasks/task.model.js';

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    columns: [
      {
        title: {
          type: String,
          required: true
        },
        order: {
          type: Number,
          required: true
        },
        id: {
          type: mongoose.Schema.Types.ObjectId,
          default() {
            return this._id;
          }
        }
      }
    ],
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
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        if (ret.columns) {
          ret.columns.forEach(item => {
            delete item._id;
          });
        }
      }
    }
  }
);
boardSchema.pre('findOneAndDelete', async function(next) {
  try {
    const boardId = this.getQuery()._id;
    await Task.deleteMany({ boardId });
    next();
  } catch (err) {
    next(err);
  }
});
const Board = mongoose.model('BoardSchema', boardSchema);

export { Board };
