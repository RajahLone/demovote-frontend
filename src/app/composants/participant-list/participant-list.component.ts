import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ParticipantList, ParticipantEnum, ParticipantStatutList } from '../../interfaces/participant';
import { ParticipantService } from '../../services/participant.service';

@Component({ selector: 'app-participant-list', imports: [], templateUrl: './participant-list.component.html', styleUrl: './participant-list.component.css' })

export class ParticipantListComponent implements OnInit, AfterViewInit
{
    
  PS: ParticipantEnum[] = ParticipantStatutList;

  participants: ParticipantList[] = [];

  constructor(private participantService: ParticipantService, private router: Router, private application: AppComponent) { }

  ngOnInit(): void { this.retreiveDatas(); }
  
  ngAfterViewInit() { this.application.menuActivateUsers(); }

  private retreiveDatas() { this.participantService.getListParticipant().subscribe(data => { this.participants = data; }); }

  getNombreJours(j1: boolean, j2: boolean, j3: boolean) 
  { 
    var nbjours: number = 0; 
    if (j1) { nbjours++; } 
    if (j2) { nbjours++; } 
    if (j3) { nbjours++; } 
  	return nbjours;
  }
  
  goToRefreshListParticipant(){ this.router.navigate(['/participant-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

  goToNewParticipant(){ this.router.navigate(['/participant-create']); }

  formParticipant(id: number) { this.router.navigate(['/participant-details', id]); }

}
