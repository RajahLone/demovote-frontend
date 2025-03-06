import { Component, OnInit, ViewChild } from '@angular/core';
import { Participant, ParticipantEnum, ParticipantStatusList, ParticipantModePaiementList } from '../participant';
import { ParticipantService } from '../participant.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({ selector: 'app-participant-create', imports: [FormsModule], templateUrl: './participant-create.component.html', styleUrl: './participant-create.component.css' })

export class ParticipantCreateComponent implements OnInit
{
  
  PS: ParticipantEnum[] = ParticipantStatusList;
  PMP: ParticipantEnum[] = ParticipantModePaiementList;

  @ViewChild('formRef') participantForm!: NgForm;
  
  participant: Participant = new Participant();
  
  constructor(private participantService: ParticipantService, private router: Router) { }

  ngOnInit(): void { }

  private saveParticipant() { this.participantService.createParticipant(this.participant).subscribe({ next: () => { this.goToListParticipant(); }, error: (err: any) => { console.log(err); }, complete: () => { } }); }

  addParticipant() { if (this.participantForm.valid) { this.saveParticipant(); } }

  goToListParticipant() {this.router.navigate(['/participant-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }
  
  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
