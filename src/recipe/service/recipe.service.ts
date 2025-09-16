import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Recipe } from "../model/recipe.model";
import { CreateRecipeDto } from "../dto/create.recipe.dto";

@Injectable()
export class RecipeService {
    constructor(@InjectModel(Recipe.name) private recipeRepository: Model<Recipe>) { }

    public async create(createRecipe: CreateRecipeDto): Promise<Recipe> {
        console.log(createRecipe.ingredients);
        return await this.recipeRepository.create(createRecipe);
    }

    public async findAll() {
        return await this.recipeRepository.find();
    }

    public async findBy(field: string, value: string): Promise<Recipe> {
        try {
            const item = await this.recipeRepository.findOne({ _id: value });
            if (!item) {
                throw new NotFoundException(`item with ${field} = ${value} not found`);
            }
            return item;
        } catch (error) {
            throw new error;
        }
    }

    public async update(id: string, updateItem: Recipe) {
        return await this.recipeRepository.findByIdAndUpdate(id, updateItem, {
            new: true
        });
    }

    public async delete(id: string) {
        return await this.recipeRepository.findByIdAndDelete(id, {
            new: true
        });
    }

    public async addIngredients(id: string, idIngredient: string) {
        return await this.recipeRepository.findByIdAndUpdate(
            id, {
                $push: {ingredientsId: new Types.ObjectId(idIngredient)},
                new: true
            }
        )
    }

    public async removeIngredients(id: string, idIngredient: string) {
        return await this.recipeRepository.findByIdAndUpdate(
            id, {
                $pull: {ingredientsId: new Types.ObjectId(idIngredient)},
                new: true,
                safe: true, 
                multi: false 
            }
        )
    }
}