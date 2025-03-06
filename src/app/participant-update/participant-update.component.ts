import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Participant, ParticipantEnum, ParticipantStatusList, ParticipantModePaiementList } from '../participant';
import { ParticipantService } from '../participant.service';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({ selector: 'app-participant-update', imports: [FormsModule], templateUrl: './participant-update.component.html', styleUrl: './participant-update.component.css' })

export class ParticipantUpdateComponent implements OnInit
{
  
  PS: ParticipantEnum[] = ParticipantStatusList;
  PMP: ParticipantEnum[] = ParticipantModePaiementList;

  @ViewChild('formRef') participantForm!: NgForm;

  numeroParticipant: number = 0;
  
  participant: Participant = new Participant();
  
  constructor(private participantService: ParticipantService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void 
  {
    this.numeroParticipant = this.route.snapshot.params['numeroParticipant'];
    this.participantService.getByIdParticipant(this.numeroParticipant).subscribe(data => { this.participant = data; });
  }

  updateConfirmed() { if (this.participantForm.valid) { this.participantService.updateParticipant(this.numeroParticipant, this.participant).subscribe(() => { this.goToListParticipant(); }); } }

  deleteConfirmed() { this.participantService.deleteParticipant(this.numeroParticipant).subscribe(() => { this.goToListParticipant(); }); }

  goToListParticipant(){ this.router.navigate(['/participant-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
