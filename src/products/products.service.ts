import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel('Product') private readonly productModel: Model<Product>,
	) {}

	async insertProduct(title: string, desc: string, cId: string, price: number) {
		let result;
		try {
			const newProduct = new this.productModel({
				title,
				description: desc,
				category: cId,
				price,
			});
			result = await newProduct.save();
		} catch (err) {
			throw new NotFoundException('Could not find category by given Id.');
		}
		return result.id as string;
	}

	async getProducts() {
		const products = await this.productModel.find().populate('category').exec();
		return products.map((prod) => ({
			id: prod.id,
			title: prod.title,
			category: prod.category,
			description: prod.description,
			price: prod.price,
		}));
	}

	async getSingleProduct(productId: string) {
		const product = await this.findProduct(productId);
		return {
			id: product.id,
			title: product.title,
			category: product.category,
			description: product.description,
			price: product.price,
		};
	}

	async updateProduct(
		productId: string,
		title: string,
		desc: string,
		price: number,
	) {
		const updatedProduct = await this.findProduct(productId);
		if (title) {
			updatedProduct.title = title;
		}
		if (desc) {
			updatedProduct.description = desc;
		}
		if (price) {
			updatedProduct.price = price;
		}
		updatedProduct.save();
	}

	async deleteProduct(prodId: string) {
		const result = await this.productModel.deleteOne({ _id: prodId }).exec();
		if (result.n === 0) {
			throw new NotFoundException('Could not find product.');
		}
	}

	async deleteProductsByCategoryId(catId: string) {
		await this.productModel.deleteMany({ category: catId }).exec();
	}

	private async findProduct(id: string): Promise<Product> {
		let product;
		try {
			product = await this.productModel
				.findById(id)
				.populate('category')
				.exec();
		} catch (error) {
			throw new NotFoundException('Could not find product.');
		}
		if (!product) {
			throw new NotFoundException('Could not find product.');
		}
		return product;
	}
}
