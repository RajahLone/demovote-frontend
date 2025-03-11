import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Participant, ParticipantEnum, ParticipantStatusList, ParticipantModePaiementList } from '../../interfaces/participant';
import { ParticipantService } from '../../services/participant.service';
import { FormsModule } from '@angular/forms'; 

@Component({ selector: 'app-participant-details', imports: [FormsModule], templateUrl: './participant-details.component.html', styleUrl: './participant-details.component.css' })

export class ParticipantDetailsComponent implements OnInit, AfterViewInit 
{
  
  PS: ParticipantEnum[] = ParticipantStatusList;
  PMP: ParticipantEnum[] = ParticipantModePaiementList;
 
  numeroParticipant: number = 0;

  participant: Participant = new Participant();
  
  constructor(private participantService: ParticipantService, private route: ActivatedRoute, private router: Router, private application: AppComponent) { }

  ngOnInit(): void 
  {
    this.numeroParticipant = this.route.snapshot.params['numeroParticipant'];
    this.participant = new Participant();
    this.participantService.getByIdParticipant(this.numeroParticipant).subscribe( data => { this.participant = data; });
  }
  
  ngAfterViewInit() { this.application.menuActivateUsers(); }
 
  updateParticipant(id: number) { this.router.navigate(['/participant-update', id]); }
  
  goToListParticipant(){ this.router.navigate(['/participant-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
