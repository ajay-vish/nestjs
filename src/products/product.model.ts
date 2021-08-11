import * as mongoose from 'mongoose';
import { Categorieschema as Category } from 'src/category/categories.model';
export const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		category: {
			type: mongoose.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		price: { type: Number, required: true },
	},
	{
		timestamps: true,
	},
);

export interface Product extends mongoose.Document {
	id: string;
	title: string;
	category: object;
	description: string;
	price: number;
}
