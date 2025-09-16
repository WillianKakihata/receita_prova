import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientModule } from './ingredient/ingredient.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeModule } from './recipe/recipe.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    RecipeModule,
    IngredientModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
