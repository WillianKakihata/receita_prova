import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { IngredientService } from "../service/ingredients.service";
import { Ingredient } from "../model/ingredient.model";

@Controller('ingredient')
export class IngredientController {
    constructor(
      private readonly ingredientService: IngredientService  
    ){}

    @Post()
    public async create(@Body() body: Ingredient) {
        return await this.ingredientService.create(body)
    }

    @Get()
    public async findAll() {
        return await this.ingredientService.findAll()
    }

    @Get('/:id')
    public async findById(@Param('id') id: string) {
        return await this.ingredientService.findBy('_id', id)
    }

    @Put('/:id')
    public async findByIdAndUpdate(@Param('id') id: string, @Body() body: Ingredient) {
        return await this.ingredientService.update(id, body)
    }

    @Delete('/:id')
    public async findByIdAndDelete(@Param('id') id: string) {
        return await this.ingredientService.delete(id)
    }
}