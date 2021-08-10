import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './categories.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async insertCategory(title: string) {
    const newCategory = new this.categoryModel({
      title
    });
    const result = await newCategory.save();
    return result.id as string;
  }

  async getCategories() {
    const Categories = await this.categoryModel.find().exec();
    return Categories.map(catItem => ({
      id: catItem.id,
      title: catItem.title
    }));
  }

  async getSingleCategory(CategoryId: string) {
    const Category = await this.findCategory(CategoryId);
    return {
      id: Category.id,
      title: Category.title
    };
  }

  async updateCategory(
    CategoryId: string,
    title: string,
  ) {
    const updatedCategory = await this.findCategory(CategoryId);
    if (title) {
      updatedCategory.title = title;
    }
    updatedCategory.save();
  }

  async deleteCategory(catId: string) {
    const result = await this.categoryModel.deleteOne({_id: catId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find Category.');
    }else{
      return true;
    }
  }

  private async findCategory(id: string): Promise<Category> {
    let Category;
    try {
      Category = await this.categoryModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Category.');
    }
    if (!Category) {
      throw new NotFoundException('Could not find Category.');
    }
    return Category;
  }
}
