import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VariableListComponent } from './variable-list/variable-list.component';
import { VariableCreateComponent } from './variable-create/variable-create.component';
import { VariableDetailsComponent } from './variable-details/variable-details.component';
import { VariableUpdateComponent } from './variable-update/variable-update.component';
import { CategorieListComponent } from './categorie-list/categorie-list.component';
import { CategorieCreateComponent } from './categorie-create/categorie-create.component';
import { CategorieDetailsComponent } from './categorie-details/categorie-details.component';
import { CategorieUpdateComponent } from './categorie-update/categorie-update.component';

export const routes: Routes = [  
  {path: '', redirectTo: 'variable-list', pathMatch: 'full'},
  {path: 'variable-list', component: VariableListComponent},
  {path: 'variable-create', component: VariableCreateComponent},
  {path: 'variable-details/:numeroVariable', component: VariableDetailsComponent},
  {path: 'variable-update/:numeroVariable', component: VariableUpdateComponent},
  {path: 'categorie-list', component: CategorieListComponent},
  {path: 'categorie-create', component: CategorieCreateComponent},
  {path: 'categorie-details/:numeroCategorie', component: CategorieDetailsComponent},
  {path: 'categorie-update/:numeroCategorie', component: CategorieUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],                                                                                                                                                                                                                                                                                                          
  exports: [RouterModule]
})

export class AppRoutingModule { }