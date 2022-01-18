import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeServiceService } from '../services/recipe-service.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeServiceService) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected
    .subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    })
  }

}
