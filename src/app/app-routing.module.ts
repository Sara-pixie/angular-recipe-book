import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { AuthGuard } from "./components/auth/auth.guard";
import { RecipeDetailsComponent } from "./components/recipeBook/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./components/recipeBook/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./components/recipeBook/recipe-start/recipe-start.component";

import { RecipesComponent } from "./components/recipeBook/recipes/recipes.component";
import { RecipesResolverService } from "./components/recipeBook/services/recipes-resolver.service";
import { ShoppingListComponent } from "./components/shoppingList/shopping-list/shopping-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'shopping-list', component: ShoppingListComponent, children: [

    ] },
    { path: 'recipes', component: RecipesComponent,
    canActivate: [AuthGuard], 
    children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailsComponent, resolve: [RecipesResolverService] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
    ] },
    { path: 'auth', component: AuthComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}