import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Recipe } from "../model/recipe.model";
import { CreateRecipeDto } from "../dto/create.recipe.dto";
import { IngredientService } from "src/ingredient/service/ingredients.service";

@Injectable()
export class RecipeService {
    constructor(
        @InjectModel(Recipe.name) private recipeRepository: Model<Recipe>,
        private readonly IngredientService: IngredientService) { }

    public async create(createRecipe: CreateRecipeDto): Promise<Recipe> {
        console.log(createRecipe.ingredients);
        return await this.recipeRepository.create(createRecipe);
    }

    public async findAll() {
        return await this.recipeRepository.find();
    }

    public async findBy(field: string, value: string): Promise<Recipe> {
        try {
            const item = await this.recipeRepository.findOne({ [field]: value });
            if (!item) {
                throw new NotFoundException(`item with ${field} = ${value} not found`);
            }
            return item;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    public async update(id: string, updateItem: Recipe) {
        try {
            return await this.recipeRepository.findByIdAndUpdate(id, updateItem, {
                new: true
            });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    public async delete(id: string) {
        try {
            const recipe = await this.findBy('_id', id)
            if (!recipe) {
                new NotFoundException('id not found')
            }
            await this.IngredientService.deleteMany(recipe.ingredientsId)
            return await this.recipeRepository.findByIdAndDelete(id, {
                new: true
            });
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    public async addIngredients(id: string, idIngredient: string) {
        try {
            await this.IngredientService.receiveIdRecipe(idIngredient, id);
            return await this.recipeRepository.findByIdAndUpdate(
                id,
                { $push: { ingredientsId: new Types.ObjectId(idIngredient) } },
                { new: true }
            );
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    public async removeIngredients(id: string, idIngredient: string) {
        try {
            await this.IngredientService.removeIdRecipe(idIngredient)
            const remove = await this.recipeRepository.findByIdAndUpdate(
                id, {
                $pull: { ingredientsId: new Types.ObjectId(idIngredient) },
                safe: true,
                multi: false,
                new: true
            })
            return remove;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    
}