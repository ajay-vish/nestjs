import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './category/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    MongooseModule.forRoot(
      `mongodb://localhost:27017/nestjs`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
