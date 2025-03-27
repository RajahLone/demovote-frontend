import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { MenuComponent } from '../menu/menu.component';
import { Participant, ParticipantEnum, ParticipantStatutList, ParticipantModePaiementList } from '../../interfaces/participant';
import { ParticipantService } from '../../services/participant.service';
import { Journees } from '../../interfaces/divers';
import { DiversService } from '../../services/divers.service'

@Component({ selector: 'app-participant-create', imports: [FormsModule, MenuComponent], templateUrl: './participant-create.component.html', styleUrl: './participant-create.component.css' })

export class ParticipantCreateComponent implements OnInit, AfterViewInit
{

  journees: Journees = new Journees();

  PS: ParticipantEnum[] = ParticipantStatutList;
  PMP: ParticipantEnum[] = ParticipantModePaiementList;

  @ViewChild('formRef') participantForm!: NgForm;

  participant: Participant = new Participant();

  constructor(private diversService: DiversService, private participantService: ParticipantService, private router: Router, private menu: MenuComponent) { }

  ngOnInit()
  {
    this.journees = new Journees();
    this.diversService.getJournees().subscribe(data => { this.journees = data; });
  }

  ngAfterViewInit() { }

  private saveParticipant() { this.participantService.createParticipant(this.participant).subscribe(); this.goToListParticipant(); }

  addParticipant() { if (this.participantForm.valid) { this.saveParticipant(); } }

  goToListParticipant() {this.router.navigate(['/participant-list'], { queryParams: { 'refresh': this.menu.getRandomInteger(1, 100000) } }); }

}
