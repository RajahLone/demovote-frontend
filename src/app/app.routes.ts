import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VariableListComponent } from './variable-list/variable-list.component';
import { VariableCreateComponent } from './variable-create/variable-create.component';
import { VariableUpdateComponent } from './variable-update/variable-update.component';
import { VariableDetailsComponent } from './variable-details/variable-details.component';

export const routes: Routes = [  
  {path: 'variable-list', component: VariableListComponent},
  {path: 'variable-create', component: VariableCreateComponent},
  {path: '', redirectTo: 'variable-list', pathMatch: 'full'},
  {path: 'variable-update/:numeroVariable', component: VariableUpdateComponent},
  {path: 'variable-details/:numeroVariable', component: VariableDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],                                                                                                                                                                                                                                                                                                          
  exports: [RouterModule]
})

export class AppRoutingModule { }