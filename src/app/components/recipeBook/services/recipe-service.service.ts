import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe 1', 
    'This is a test recipe to see how it works', 
    'https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg'  
    ),
    new Recipe('A Test Recipe 2', 
    'This is a test recipe to see how it works', 
    'https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg'  
    ),
    new Recipe('A Test Recipe 3', 
    'This is a test recipe to see how it works', 
    'https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg'  
    )
  ];

  constructor() { }

  getRecipes(){
    //get a copy of recipes
    return this.recipes.slice();
  }
}
