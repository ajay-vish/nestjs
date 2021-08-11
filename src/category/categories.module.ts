import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Categorieschema } from './categories.model';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Category', schema: Categorieschema }]),
	],
	controllers: [CategoriesController],
	providers: [CategoriesService],
})
export class CategoriesModule {}
