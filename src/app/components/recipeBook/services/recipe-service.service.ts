import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListServiceService } from '../../shoppingList/services/shopping-list-service.service';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Schnitzel', 
    'A super tasty Shnitzel - just awesome!', 
    'https://upload.wikimedia.org/wikipedia/commons/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG',
    [
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20)
    ]  
    ),
    new Recipe('Big Fat Burger', 
    'The name says it all', 
    'https://cilipipp.si/storage/_sites/cilipipp/app/media/Recepti/domaci-burger.jpg',
    [
      new Ingredient('Bread', 2),
      new Ingredient('Meat', 1),
      new Ingredient('Veggies', 5)
    ]  
    ),
    new Recipe('American Pancakes', 
    'The fluffiest of them all!', 
    'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/fluffyamericanpancak_74828_16x9.jpg',
    [
      new Ingredient('Shugar', 0.05),
      new Ingredient('Salt', 0.01),
      new Ingredient('Egg', 2),
      new Ingredient('Flour', 0.4),
      new Ingredient('Milk', 0.4),
      new Ingredient('Maple Syrup', 1)
    ]  
    )
  ];

  constructor(private shoppingListService: ShoppingListServiceService) { }

  getRecipes(){
    //get a copy of recipes
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
