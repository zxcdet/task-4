import mongoose from 'mongoose';

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
            return this._iwd;
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
const Board = mongoose.model('BoardSchema', boardSchema);

export { Board };
