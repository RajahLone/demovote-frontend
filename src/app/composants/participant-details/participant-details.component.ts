import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from '../menu/menu.component';
import { Participant, ParticipantEnum, ProfilList, ParticipantStatutList, ParticipantModePaiementList } from '../../interfaces/participant';
import { ParticipantService } from '../../services/participant.service';
import { Journees } from '../../interfaces/divers';
import { DiversService } from '../../services/divers.service'
import { AccountService } from '../../services/account.service';

@Component({ selector: 'app-participant-details', imports: [FormsModule, MenuComponent], templateUrl: './participant-details.component.html', styleUrl: './participant-details.component.css' })

export class ParticipantDetailsComponent implements OnInit
{

  profil: string = "";
  profils: ParticipantEnum[] = ProfilList;

  journees: Journees = new Journees();

  PS: ParticipantEnum[] = ParticipantStatutList;
  PMP: ParticipantEnum[] = ParticipantModePaiementList;

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
    this.participant = new Participant();
    this.participantService.getByIdParticipant(this.numeroParticipant).subscribe( data => { this.participant = data; });
  }

  updateParticipant(id: number) { this.router.navigate(['/participant-update', id]); }

  goToListParticipant() { this.router.navigate(['/participant-list'], { queryParams: { 'refresh': this.menu.getRandomInteger(1, 100000) } }); }

}
