import { Module } from '@nestjs/common';
import { IngredientService } from './service/ingredients.service';
import { Ingredient, ingredientsSchema } from './model/ingredient.model';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientController } from './controller/ingredient.controller';
import { Recipe, RecipeSchema } from 'src/recipe/model/recipe.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: ingredientsSchema },
      { name: Recipe.name, schema: RecipeSchema },
    ]),
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [IngredientService],
})
export class IngredientModule {}
