import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Recipe } from "src/recipe/model/recipe.model";

@Schema()
export class Ingredient {
    @Prop()
    name: string;

    @Prop()
    cost: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', default: null})
    recipe?: Types.ObjectId | null
}

export const ingredientsSchema = SchemaFactory.createForClass(Ingredient);