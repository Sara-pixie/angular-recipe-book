import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../components/recipeBook/recipe.model';
import { RecipeServiceService } from '../components/recipeBook/services/recipe-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  recipesURL: string = 'https://angular-recipe-book-b5c47-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeServiceService) { }

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.recipesURL, recipes).subscribe();
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>(this.recipesURL)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
