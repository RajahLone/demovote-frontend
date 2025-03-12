import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Participant, ParticipantEnum, ParticipantStatutList } from '../../interfaces/participant';
import { ParticipantService } from '../../services/participant.service';

@Component({ selector: 'app-participant-list', imports: [], templateUrl: './participant-list.component.html', styleUrl: './participant-list.component.css' })

export class ParticipantListComponent implements OnInit, AfterViewInit
{
    
  PS: ParticipantEnum[] = ParticipantStatutList;

  participants: Participant[] = [];

  constructor(private participantService: ParticipantService, private router: Router, private application: AppComponent) { }

  ngOnInit(): void { this.retreiveDatas(); }
  
  ngAfterViewInit() { this.application.menuActivateUsers(); }

  private retreiveDatas() { this.participantService.getListParticipant().subscribe(data => { this.participants = data; }); }

  goToRefreshListParticipant(){ this.router.navigate(['/participant-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

  goToNewParticipant(){ this.router.navigate(['/participant-create']); }

  formParticipant(id: number) { this.router.navigate(['/participant-details', id]); }

}
