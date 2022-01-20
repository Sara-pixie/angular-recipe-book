import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListServiceService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomato', 7)
  ];

  constructor() { }

  getIngredients(){
    //get a copy of ingredients
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    //update the copy of ingredients avaliable to the app
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    //update the copy of ingredients avaliable to the app
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
