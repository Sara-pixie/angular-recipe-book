import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', loadChildren: () => import('./components/recipeBook/recipes.module').then(x => x.RecipesModule) },
    { path: 'shopping-list', loadChildren: () => import('./components/shoppingList/shopping-list.module').then(x => x.ShoppingListModule) },
    { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(x => x.AuthModule) }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}