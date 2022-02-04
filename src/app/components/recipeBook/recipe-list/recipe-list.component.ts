import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeServiceService } from '../services/recipe-service.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeServiceService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged
      .subscribe((recipes: Recipe[]) =>{
        this.recipes = recipes;
      });
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onAddNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route});
  }

}
