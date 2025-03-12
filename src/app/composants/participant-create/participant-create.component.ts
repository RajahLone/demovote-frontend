import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Participant, ParticipantEnum, ParticipantStatutList, ParticipantModePaiementList } from '../../interfaces/participant';
import { ParticipantService } from '../../services/participant.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({ selector: 'app-participant-create', imports: [FormsModule], templateUrl: './participant-create.component.html', styleUrl: './participant-create.component.css' })

export class ParticipantCreateComponent implements OnInit, AfterViewInit
{
  
  PS: ParticipantEnum[] = ParticipantStatutList;
  PMP: ParticipantEnum[] = ParticipantModePaiementList;

  @ViewChild('formRef') participantForm!: NgForm;
  
  participant: Participant = new Participant();
  
  constructor(private participantService: ParticipantService, private router: Router, private application: AppComponent) { }

  ngOnInit(): void { }
  
  ngAfterViewInit() { this.application.menuActivateUsers(); }

  private saveParticipant() { this.participantService.createParticipant(this.participant).subscribe({ next: () => { this.goToListParticipant(); }, error: (err: any) => { console.log(err); }, complete: () => { } }); }

  addParticipant() { if (this.participantForm.valid) { this.saveParticipant(); } }

  goToListParticipant() {this.router.navigate(['/participant-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }
  
  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
