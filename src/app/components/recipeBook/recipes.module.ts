import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes/recipes.component";

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailsComponent,
        RecipesComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule
    ]
})
export class RecipesModule {}