import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faPen, faKey } from '@fortawesome/free-solid-svg-icons';

import { MenuComponent } from '../menu/menu.component';
import { Participant, ParticipantEnum, ProfilList } from '../../interfaces/participant';
import { AccountService } from '../../services/account.service'
import { Journees } from '../../interfaces/divers';
import { DiversService } from '../../services/divers.service'

@Component({ selector: 'app-account-details', imports: [FontAwesomeModule, FormsModule, MenuComponent], templateUrl: './account-details.component.html', styleUrl: './account-details.component.css' })

export class AccountDetailsComponent implements OnInit
{
  faXmark = faXmark; faPen = faPen; faKey = faKey;

  profil: string = "";
  profils: ParticipantEnum[] = ProfilList;

  journees: Journees = new Journees();

  participant: Participant = new Participant();

  constructor(
    private diversService: DiversService,
    private accountService : AccountService,
    private router: Router,
    private menu: MenuComponent
  ) { }

  ngOnInit()
  {
    this.profil = this.accountService.getRole();

    this.journees = new Journees();
    this.diversService.getJournees().subscribe(data => { this.journees = data; });

    this.participant = new Participant();
    this.accountService.getProfil().subscribe( data => { this.participant = data; });
  }

  updateProfil() { this.router.navigate(['/account-update']); }

  updateMotDePasse() { this.router.navigate(['/account-password']); }

  goToHome() { this.router.navigate(['/'], { queryParams: { 'refresh': this.menu.getRandomInteger(1, 100000) } }); }

}
