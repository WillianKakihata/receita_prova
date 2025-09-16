import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Recipe } from "src/recipe/model/recipe.model";

@Schema()
export class Ingredient {

    @Prop()
    name: string;

    @Prop()
    cost: number;

    @Prop({type: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }})
    recipe?: Recipe | Types.ObjectId
}

export const ingredientsSchema = SchemaFactory.createForClass(Ingredient);