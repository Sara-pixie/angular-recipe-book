import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListServiceService } from '../services/shopping-list-service.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientChange$: Subscription;

  constructor(private shoppingListService: ShoppingListServiceService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChange$ = this.shoppingListService.ingredientsChanged
    .subscribe((ingredients: Ingredient[])=>{
      this.ingredients = ingredients;
    })
  }

  ngOnDestroy(): void {
    this.ingredientChange$.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }

}
