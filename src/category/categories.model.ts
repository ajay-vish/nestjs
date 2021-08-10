import * as mongoose from 'mongoose';

export const Categorieschema = new mongoose.Schema({
    title: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

export interface Category extends mongoose.Document {
  id: string;
  title: string;
}
