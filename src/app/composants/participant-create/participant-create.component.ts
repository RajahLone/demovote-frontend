import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';

import { MenuComponent } from '../menu/menu.component';
import { Participant, ParticipantEnum, ProfilList, ParticipantStatutList, ParticipantModePaiementList } from '../../interfaces/participant';
import { Journees } from '../../interfaces/divers';
import { ParticipantService } from '../../services/participant.service';
import { DiversService } from '../../services/divers.service'
import { AccountService } from '../../services/account.service';

@Component({ selector: 'app-participant-create', imports: [FontAwesomeModule, FormsModule, MenuComponent], templateUrl: './participant-create.component.html', styleUrl: './participant-create.component.css' })

export class ParticipantCreateComponent implements OnInit
{
  faXmark = faXmark; faPlus = faPlus;

  profil: string = "";
  profils: ParticipantEnum[] = ProfilList;

  journees: Journees = new Journees();

  PS: ParticipantEnum[] = ParticipantStatutList;
  PMP: ParticipantEnum[] = ParticipantModePaiementList;

  @ViewChild('formRef') participantForm!: NgForm;

  participant: Participant = new Participant();

  constructor(
    private diversService: DiversService,
    private participantService: ParticipantService,
    private router: Router,
    private menu: MenuComponent,
    private accountService: AccountService
  ) { }

  ngOnInit()
  {
    this.profil = this.accountService.getRole();

    this.journees = new Journees();
    this.diversService.getJournees().subscribe(data => { this.journees = data; });
  }

  private saveParticipant() { this.participantService.createParticipant(this.participant).subscribe(() => { this.goToListParticipant(); }); }

  addParticipant() { if (this.participantForm.valid) { this.saveParticipant(); } }

  goToListParticipant() { this.router.navigate(['/participant-list']); }

}
