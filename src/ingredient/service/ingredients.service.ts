import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Ingredient } from "../model/ingredient.model";
import { Model } from "mongoose";

@Injectable()
export class IngredientService {
    constructor(@InjectModel(Ingredient.name) private ingredientRepository: Model<Ingredient>) { }

    public async create(createIngredient: Ingredient): Promise<Ingredient> {
        return await this.ingredientRepository.create(createIngredient);
    }

    public async findAll() {
        return await this.ingredientRepository.find();
    }

    public async findBy(field: string, value: string) {
        try {
            const item = await this.ingredientRepository.find({ _id: value });
            if (!item) {
                throw new NotFoundException(`item with ${field} = ${value} not found`);
            }
            return item;
        } catch (error) {
            throw new error;
        }
    }

    public async update(id: string, updateItem: Ingredient) {
        return await this.ingredientRepository.findByIdAndUpdate(id, updateItem, {
            new: true
        });
    }

    public async delete(id: string) {
        return await this.ingredientRepository.findByIdAndDelete(id, {
            new: true
        });
    }
}