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
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { ParticipantCreateComponent } from './participant-create/participant-create.component';
import { ParticipantDetailsComponent } from './participant-details/participant-details.component';
import { ParticipantUpdateComponent } from './participant-update/participant-update.component';
import { ProductionListComponent } from './production-list/production-list.component';
import { ProductionCreateComponent } from './production-create/production-create.component';
import { ProductionDetailsComponent } from './production-details/production-details.component';
import { ProductionUpdateComponent } from './production-update/production-update.component';

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
  {path: 'participant-list', component: ParticipantListComponent},
  {path: 'participant-create', component: ParticipantCreateComponent},
  {path: 'participant-details/:numeroParticipant', component: ParticipantDetailsComponent},
  {path: 'participant-update/:numeroParticipant', component: ParticipantUpdateComponent},
  {path: 'production-list', component: ProductionListComponent},
  {path: 'production-create', component: ProductionCreateComponent},
  {path: 'production-details/:numeroProduction', component: ProductionDetailsComponent},
  {path: 'production-update/:numeroProduction', component: ProductionUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],                                                                                                                                                                                                                                                                                                          
  exports: [RouterModule]
})

export class AppRoutingModule { }