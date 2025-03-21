
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  {path: 'home', component: HomeComponent, runGuardsAndResolvers: 'always' },
  {path: 'login', component: LoginComponent, runGuardsAndResolvers: 'always' },
  {path: 'account-details', component: AccountDetailsComponent, runGuardsAndResolvers: 'always' },
  {path: 'account-update', component: AccountUpdateComponent, runGuardsAndResolvers: 'always' },
  {path: 'variable-list', component: VariableListComponent /*, canActivate: [LoggedGuard]*/, runGuardsAndResolvers: 'always'},
  {path: 'variable-create', component: VariableCreateComponent /*, canActivate: [LoggedGuard]*/, runGuardsAndResolvers: 'always'},
  {path: 'variable-details/:numeroVariable', component: VariableDetailsComponent /*, canActivate: [LoggedGuard]*/, runGuardsAndResolvers: 'always'},
  {path: 'variable-update/:numeroVariable', component: VariableUpdateComponent /*, canActivate: [LoggedGuard]*/, runGuardsAndResolvers: 'always'},
  {path: 'categorie-list', component: CategorieListComponent, runGuardsAndResolvers: 'always' },
  {path: 'categorie-create', component: CategorieCreateComponent, runGuardsAndResolvers: 'always' },
  {path: 'categorie-details/:numeroCategorie', component: CategorieDetailsComponent, runGuardsAndResolvers: 'always' },
  {path: 'categorie-update/:numeroCategorie', component: CategorieUpdateComponent, runGuardsAndResolvers: 'always' },
  {path: 'participant-list', component: ParticipantListComponent, runGuardsAndResolvers: 'always' },
  {path: 'participant-create', component: ParticipantCreateComponent, runGuardsAndResolvers: 'always' },
  {path: 'participant-details/:numeroParticipant', component: ParticipantDetailsComponent, runGuardsAndResolvers: 'always' },
  {path: 'participant-update/:numeroParticipant', component: ParticipantUpdateComponent, runGuardsAndResolvers: 'always' },
  {path: 'production-list', component: ProductionListComponent, runGuardsAndResolvers: 'always' },
  {path: 'production-create', component: ProductionCreateComponent, runGuardsAndResolvers: 'always' },
  {path: 'production-details/:numeroProduction', component: ProductionDetailsComponent, runGuardsAndResolvers: 'always' },
  {path: 'production-update/:numeroProduction', component: ProductionUpdateComponent, runGuardsAndResolvers: 'always' },
  {path: 'production-upload/:numeroProduction', component: ProductionUploadComponent, runGuardsAndResolvers: 'always' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }), BrowserModule, FormsModule],                                                                                                                                                                                                                                                                                                          
  exports: [RouterModule]
})

export class AppRoutingModule { }