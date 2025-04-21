
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './composants/home/home.component';
import { LoginComponent } from './composants/login/login.component';
import { EventListComponent } from './composants/event-list/event-list.component';
import { WebcamListComponent } from './composants/webcam-list/webcam-list.component';
import { ChatComponent } from './composants/chat/chat.component';
import { AccountDetailsComponent } from './composants/account-details/account-details.component';
import { AccountUpdateComponent } from './composants/account-update/account-update.component';
import { AccountPasswordComponent } from './composants/account-password/account-password.component';
import { AdminGuard } from './guards/admin.guard';
import { OrgaGuard } from './guards/orga.guard';
import { UserGuard } from './guards/user.guard';
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
import { ShowListComponent } from './composants/show-list/show-list.component';
import { ShowLinksComponent } from './composants/show-links/show-links.component';
import { ShowUploadComponent } from './composants/show-upload/show-upload.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, runGuardsAndResolvers: 'always' },
  {path: 'login', component: LoginComponent, runGuardsAndResolvers: 'always' },
  {path: 'event-list', component: EventListComponent, runGuardsAndResolvers: 'always' },
  {path: 'webcam-list', component: WebcamListComponent, runGuardsAndResolvers: 'always' },
  {path: 'chat', component: ChatComponent, canActivate: [UserGuard], runGuardsAndResolvers: 'always' },
  {path: 'account-details', component: AccountDetailsComponent, canActivate: [UserGuard], runGuardsAndResolvers: 'always' },
  {path: 'account-update', component: AccountUpdateComponent, canActivate: [UserGuard], runGuardsAndResolvers: 'always' },
  {path: 'account-password', component: AccountPasswordComponent, canActivate: [UserGuard], runGuardsAndResolvers: 'always' },
  {path: 'variable-list/:refresh', component: VariableListComponent, canActivate: [AdminGuard], runGuardsAndResolvers: 'always'},
  {path: 'variable-create', component: VariableCreateComponent, canActivate: [AdminGuard], runGuardsAndResolvers: 'always'},
  {path: 'variable-details/:numeroVariable', component: VariableDetailsComponent, canActivate: [AdminGuard], runGuardsAndResolvers: 'always'},
  {path: 'variable-update/:numeroVariable', component: VariableUpdateComponent, canActivate: [AdminGuard], runGuardsAndResolvers: 'always'},
  {path: 'categorie-list/:refresh', component: CategorieListComponent, canActivate: [AdminGuard], runGuardsAndResolvers: 'always' },
  {path: 'categorie-create', component: CategorieCreateComponent, canActivate: [AdminGuard], runGuardsAndResolvers: 'always' },
  {path: 'categorie-details/:numeroCategorie', component: CategorieDetailsComponent, canActivate: [AdminGuard], runGuardsAndResolvers: 'always' },
  {path: 'categorie-update/:numeroCategorie', component: CategorieUpdateComponent, canActivate: [AdminGuard], runGuardsAndResolvers: 'always' },
  {path: 'participant-list/:refresh', component: ParticipantListComponent, canActivate: [OrgaGuard], runGuardsAndResolvers: 'always' },
  {path: 'participant-create', component: ParticipantCreateComponent, canActivate: [OrgaGuard], runGuardsAndResolvers: 'always' },
  {path: 'participant-details/:numeroParticipant', component: ParticipantDetailsComponent, canActivate: [OrgaGuard], runGuardsAndResolvers: 'always' },
  {path: 'participant-update/:numeroParticipant', component: ParticipantUpdateComponent, canActivate: [OrgaGuard], runGuardsAndResolvers: 'always' },
  {path: 'production-list/:refresh', component: ProductionListComponent, canActivate: [UserGuard], runGuardsAndResolvers: 'always' },
  {path: 'production-create', component: ProductionCreateComponent, canActivate: [UserGuard], runGuardsAndResolvers: 'always' },
  {path: 'production-details/:numeroProduction', component: ProductionDetailsComponent, canActivate: [UserGuard], runGuardsAndResolvers: 'always' },
  {path: 'production-update/:numeroProduction', component: ProductionUpdateComponent, canActivate: [UserGuard], runGuardsAndResolvers: 'always' },
  {path: 'production-upload/:numeroProduction', component: ProductionUploadComponent, canActivate: [UserGuard], runGuardsAndResolvers: 'always' },
  {path: 'show-list/:refresh', component: ShowListComponent, canActivate: [AdminGuard], runGuardsAndResolvers: 'always' },
  {path: 'show-links/:numeroCategorie', component: ShowLinksComponent, canActivate: [AdminGuard], runGuardsAndResolvers: 'always' },
  {path: 'show-upload/:numeroProduction', component: ShowUploadComponent, canActivate: [AdminGuard], runGuardsAndResolvers: 'always' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }), BrowserModule, FormsModule],
  exports: [RouterModule],
})

export class AppRoutingModule { }
