import { Module } from "@nestjs/common";
import { RecipeService } from "./service/recipe.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Recipe, RecipeSchema } from "./model/recipe.model";
import { RecipeController } from "./controller/recipe.controller";

@Module({
  imports: [MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }])],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
