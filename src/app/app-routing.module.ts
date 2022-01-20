import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailsComponent } from "./components/recipeBook/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./components/recipeBook/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./components/recipeBook/recipe-start/recipe-start.component";

import { RecipesComponent } from "./components/recipeBook/recipes/recipes.component";
import { ShoppingListComponent } from "./components/shoppingList/shopping-list/shopping-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'shopping-list', component: ShoppingListComponent, children: [

    ] },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailsComponent },
        { path: ':id/edit', component: RecipeEditComponent }
    ] }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}