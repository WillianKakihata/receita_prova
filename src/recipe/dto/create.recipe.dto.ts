import { IsNotEmpty } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  time_preparation: number;
  @IsNotEmpty()
  aproxim_cost: number;
  @IsNotEmpty()
  ingredients: string[];
}
