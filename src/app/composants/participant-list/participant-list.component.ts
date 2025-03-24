import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { ParticipantList, ParticipantEnum, ParticipantStatutList } from '../../interfaces/participant';
import { ParticipantService } from '../../services/participant.service';
import { FormsModule, NgForm } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({ selector: 'app-participant-list', imports: [TooltipModule, FormsModule, MenuComponent], templateUrl: './participant-list.component.html', styleUrl: './participant-list.component.css' })

export class ParticipantListComponent implements OnInit, AfterViewInit
{

  nomFiltre: string = "";
  statutFiltre: number = 0;
  arriveFiltre: number = 0;

  PS: ParticipantEnum[] = ParticipantStatutList;

  participants: ParticipantList[] = [];

  constructor(private participantService: ParticipantService, private router: Router) { }

  ngOnInit(): void { this.retreiveDatas(); }

  ngAfterViewInit() { }

  private retreiveDatas() { this.participantService.getListParticipant(this.nomFiltre, this.statutFiltre, this.arriveFiltre).subscribe(data => { this.participants = data; }); }

  getNombreJours(j1: boolean, j2: boolean, j3: boolean)
  {
    var nbjours: number = 0;
    if (j1) { nbjours++; }
    if (j2) { nbjours++; }
    if (j3) { nbjours++; }
  	return nbjours;
  }

  goToRefreshListParticipant() { this.retreiveDatas(); }

  goToFiltrage() { this.retreiveDatas(); }

  filtrageParNom() { this.retreiveDatas(); }
  filtrageParStatut(event: any) { this.statutFiltre = event.target.value; this.retreiveDatas(); }
  filtrageParArrive(event: any) { this.arriveFiltre = event.target.value; this.retreiveDatas(); }
  filtrageReset() { this.nomFiltre = ""; this.statutFiltre = 0; this.arriveFiltre = 0; this.retreiveDatas(); }

  goToNewParticipant() { this.router.navigate(['/participant-create']); }

  formParticipant(id: number) { this.router.navigate(['/participant-details', id]); }

}
