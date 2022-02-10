import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent },
        ]),
        CommonModule
    ]
})
export class ShoppingListModule {}