import { Module } from '@nestjs/common';
import { IngredientService } from './service/ingredients.service';
import { Ingredient, ingredientsSchema } from './model/ingredient.model';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientController } from './controller/ingredient.controller';


@Module({
  imports: [MongooseModule.forFeature([{ name: Ingredient.name, schema: ingredientsSchema }])],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [IngredientService]

})
export class IngredientModule {}
