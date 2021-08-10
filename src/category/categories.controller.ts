import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './../products/products.service';

import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly CategoriesService: CategoriesService) {}

  @Post()
  async addCategory(
    @Body('title') catTitle: string
  ) {
    const generatedId = await this.CategoriesService.insertCategory(
      catTitle
    );
    return { id: generatedId };
  }

  @Get()
  async getAllCategories() {
    const Categories = await this.CategoriesService.getCategories();
    return Categories;
  }

  @Get(':id')
  getCategory(@Param('id') catId: string) {
    return this.CategoriesService.getSingleCategory(catId);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') catId: string,
    @Body('title') catTitle: string
  ) {
    await this.CategoriesService.updateCategory(catId, catTitle);
    return null;
  }

  @Delete(':id')
  async removeCategory(@Param('id') catId: string) {
      let result = await this.CategoriesService.deleteCategory(catId);
      return result;
  }
}
