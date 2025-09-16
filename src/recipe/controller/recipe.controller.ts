import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../model/recipe.model';
import { CreateRecipeDto } from '../dto/create.recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly RecipeService: RecipeService) {}

  @Post()
  public async create(@Body() body: CreateRecipeDto) {
    return await this.RecipeService.create(body);
  }

  @Get()
  public async findAll() {
    return await this.RecipeService.findAll();
  }

  @Get('/:id')
  public async findById(@Param('id') id: string) {
    return await this.RecipeService.findBy('_id', id);
  }

  @Put('/:id')
  public async findByIdAndUpdate(
    @Param('id') id: string,
    @Body() body: Recipe,
  ) {
    return await this.RecipeService.update(id, body);
  }

  @Delete('/:id')
  public async findByIdAndDelete(@Param('id') id: string) {
    return await this.RecipeService.delete(id);
  }

  @Put('/:id/addingredient/:idIngredient')
  public async addIngredient(
    @Param('id') id: string,
    @Param('idIngredient') idIngredient: string,
  ) {
    return await this.RecipeService.addIngredients(id, idIngredient);
  }
  @Put('/:id/removeingredient/:idIngredient')
  public async removeIngredient(
    @Param('id') id: string,
    @Param('idIngredient') idIngredient: string,
  ) {
    return await this.RecipeService.removeIngredients(id, idIngredient);
  }
}
