import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './composants/login/login.component';    
import { AuthGuard } from './guards/auth.guard';    
import { VariableListComponent } from './composants/variable-list/variable-list.component';
import { VariableCreateComponent } from './composants/variable-create/variable-create.component';
import { VariableDetailsComponent } from './composants/variable-details/variable-details.component';
import { VariableUpdateComponent } from './composants/variable-update/variable-update.component';
import { CategorieListComponent } from './composants/categorie-list/categorie-list.component';
import { CategorieCreateComponent } from './composants/categorie-create/categorie-create.component';
import { CategorieDetailsComponent } from './composants/categorie-details/categorie-details.component';
import { CategorieUpdateComponent } from './composants/categorie-update/categorie-update.component';
import { ParticipantListComponent } from './composants/participant-list/participant-list.component';
import { ParticipantCreateComponent } from './composants/participant-create/participant-create.component';
import { ParticipantDetailsComponent } from './composants/participant-details/participant-details.component';
import { ParticipantUpdateComponent } from './composants/participant-update/participant-update.component';
import { ProductionListComponent } from './composants/production-list/production-list.component';
import { ProductionCreateComponent } from './composants/production-create/production-create.component';
import { ProductionDetailsComponent } from './composants/production-details/production-details.component';
import { ProductionUpdateComponent } from './composants/production-update/production-update.component';
import { ProductionUploadComponent } from './composants/production-upload/production-upload.component';

export const routes: Routes = [  
  {path: '', redirectTo: 'production-list', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
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
  {path: 'production-upload/:numeroProduction', component: ProductionUploadComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],                                                                                                                                                                                                                                                                                                          
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }