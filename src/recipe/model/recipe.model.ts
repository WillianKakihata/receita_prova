import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose, Types } from "mongoose";
import { Ingredient } from "src/ingredient/model/ingredient.model";

@Schema()
export class Recipe {
    @Prop()
    name: string;

    @Prop()
    time_preparation: number;

    @Prop()
    aproxim_cost: number;

    @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }})
    ingredientsId: Types.ObjectId[] |Ingredient[];
}   

export const RecipeSchema = SchemaFactory.createForClass(Recipe);