import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { MenuComponent } from '../menu/menu.component';
import { Participant, ParticipantEnum, ProfilList, ParticipantStatutList, ParticipantModePaiementList } from '../../interfaces/participant';
import { Journees } from '../../interfaces/divers';
import { ParticipantService } from '../../services/participant.service';
import { DiversService } from '../../services/divers.service'
import { AccountService } from '../../services/account.service';

@Component({ selector: 'app-participant-update', imports: [FormsModule, MenuComponent], templateUrl: './participant-update.component.html', styleUrl: './participant-update.component.css' })

export class ParticipantUpdateComponent implements OnInit
{

  profil: string = "";
  profils: ParticipantEnum[] = ProfilList;

  journees: Journees = new Journees();

  PS: ParticipantEnum[] = ParticipantStatutList;
  PMP: ParticipantEnum[] = ParticipantModePaiementList;

  @ViewChild('formRef') participantForm!: NgForm;

  numeroParticipant: number = 0;
  participant: Participant = new Participant();

  constructor(
    private diversService: DiversService,
    private participantService: ParticipantService,
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuComponent,
    private accountService: AccountService
  ) { }

  ngOnInit()
  {
    this.profil = this.accountService.getRole();

    this.journees = new Journees();
    this.diversService.getJournees().subscribe(data => { this.journees = data; });

    this.numeroParticipant = this.route.snapshot.params['numeroParticipant'];
    this.participantService.getByIdParticipant(this.numeroParticipant).subscribe(data => { this.participant = data; });
  }

  updateConfirmed() { if (this.participantForm.valid) { this.participantService.updateParticipant(this.numeroParticipant, this.participant).subscribe(() => { this.goToListParticipant(); }); } }

  deleteConfirmed() { this.participantService.deleteParticipant(this.numeroParticipant).subscribe(() => { this.goToListParticipant(); }); }

  goToListParticipant() { this.router.navigate(['/participant-list']); }

}
