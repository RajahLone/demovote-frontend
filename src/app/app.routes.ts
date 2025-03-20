import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { MenuComponent } from './composants/menu/menu.component';    
import { HomeComponent } from './composants/home/home.component';    
import { LoginComponent } from './composants/login/login.component';    
import { AccountDetailsComponent } from './composants/account-details/account-details.component';
import { AccountUpdateComponent } from './composants/account-update/account-update.component';
//import { LoggedGuard } from './guards/logged.guard';    
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
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'account-details', component: AccountDetailsComponent },
  {path: 'account-update', component: AccountUpdateComponent },
  {path: 'variable-list', component: VariableListComponent /*, canActivate: [LoggedGuard]*/},
  {path: 'variable-create', component: VariableCreateComponent /*, canActivate: [LoggedGuard]*/},
  {path: 'variable-details/:numeroVariable', component: VariableDetailsComponent /*, canActivate: [LoggedGuard]*/},
  {path: 'variable-update/:numeroVariable', component: VariableUpdateComponent /*, canActivate: [LoggedGuard]*/},
  {path: 'categorie-list', component: CategorieListComponent },
  {path: 'categorie-create', component: CategorieCreateComponent },
  {path: 'categorie-details/:numeroCategorie', component: CategorieDetailsComponent },
  {path: 'categorie-update/:numeroCategorie', component: CategorieUpdateComponent },
  {path: 'participant-list', component: ParticipantListComponent },
  {path: 'participant-create', component: ParticipantCreateComponent },
  {path: 'participant-details/:numeroParticipant', component: ParticipantDetailsComponent },
  {path: 'participant-update/:numeroParticipant', component: ParticipantUpdateComponent },
  {path: 'production-list', component: ProductionListComponent },
  {path: 'production-create', component: ProductionCreateComponent },
  {path: 'production-details/:numeroProduction', component: ProductionDetailsComponent },
  {path: 'production-update/:numeroProduction', component: ProductionUpdateComponent },
  {path: 'production-upload/:numeroProduction', component: ProductionUploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],                                                                                                                                                                                                                                                                                                          
  exports: [RouterModule]
})

export class AppRoutingModule { }