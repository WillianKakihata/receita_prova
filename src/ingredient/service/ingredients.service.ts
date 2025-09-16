import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Ingredient } from "../model/ingredient.model";
import { Model, Types } from "mongoose";
import { Recipe } from "src/recipe/model/recipe.model";

@Injectable()
export class IngredientService {
    constructor(
        @InjectModel(Ingredient.name) private ingredientRepository: Model<Ingredient>,
        @InjectModel(Recipe.name) private recipeRepository: Model<Recipe>
    ) { }

    public async create(createIngredient: Ingredient): Promise<Ingredient> {
        try {
            const ingredient = await this.ingredientRepository.create(createIngredient);
            const ingredientPopulated = await this.ingredientRepository
                .findById(ingredient._id)
                .populate('recipe')
                .exec();
            return ingredientPopulated
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    public async findAll() {
        try {
            return await this.ingredientRepository.find();
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    public async findBy(field: string, value: string) {
        try {
            const item = await this.ingredientRepository.find({ [field]: value });
            if (!item) {
                throw new NotFoundException(`item with ${field} = ${value} not found`);
            }
            return item;
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    public async update(id: string, updateItem: Ingredient) {
        try {
            return await this.ingredientRepository.findByIdAndUpdate(id, updateItem, {
                new: true
            }).exec();
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    public async deleteMany(ids: Types.ObjectId[]) {
        try {
            return this.ingredientRepository.deleteMany({ _id: { $in: ids.map(id => id.toString()) } }).exec();
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    public async delete(id: string) {
        try {
            const recipe = await this.ingredientRepository.findById(id);
            await this.removeIngredients(recipe.recipe._id.toString(), id)
            return await this.ingredientRepository.findByIdAndDelete(id, {
                new: true
            });
        } catch (error) {
            throw new BadRequestException(error)
        }

    }

    public async removeIngredients(id: string, idIngredient: string) {
        try {
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

    public async receiveIdRecipe(id: string, idRecipe: string) {
        try {
            const ingredient = await this.ingredientRepository.findById(id);
            if (!ingredient) {
                throw new NotFoundException('Ingredient not found!');
            }

            if (ingredient.recipe) {
                throw new BadRequestException('Ingredient found in recipe!');
            }
            return await this.ingredientRepository.findByIdAndUpdate(
                id, {
                $set: { recipe: new Types.ObjectId(idRecipe) },
                new: true
            }
            )
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    public async removeIdRecipe(id: string) {
        try {
            return await this.ingredientRepository.findByIdAndUpdate(
                id, {
                $set: { recipe: null } ,
                new: true,
            })
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}