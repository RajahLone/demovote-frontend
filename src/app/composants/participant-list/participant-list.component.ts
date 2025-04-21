import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { MenuComponent } from '../menu/menu.component';
import { ParticipantList, ParticipantEnum, ParticipantStatutList } from '../../interfaces/participant';
import { ParticipantService } from '../../services/participant.service';
import { Journees } from '../../interfaces/divers';
import { DiversService } from '../../services/divers.service'

@Component({ selector: 'app-participant-list', imports: [TooltipModule, FormsModule, MenuComponent], templateUrl: './participant-list.component.html', styleUrl: './participant-list.component.css' })

export class ParticipantListComponent implements OnInit
{
  refresh: number = 0;

  journees: Journees = new Journees();

  listeTri: number = 0;
  nomFiltre: string = "";
  statutFiltre: number = 0;
  arriveFiltre: number = 0;

  PS: ParticipantEnum[] = ParticipantStatutList;

  participants: ParticipantList[] = [];

  constructor(
    private diversService: DiversService,
    private participantService: ParticipantService,
    private router: Router,
    private route: ActivatedRoute
  )
  {
    this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; }
    this.router.events.subscribe((evt) => { if (evt instanceof NavigationEnd) { this.router.navigated = false; window.scrollTo(0, 0); } });
  }

  ngOnInit()
  {
    this.refresh = this.route.snapshot.params['refresh'];

    this.journees = new Journees();
    this.diversService.getJournees().subscribe(data => { this.journees = data; });

    this.goToRefreshListParticipant();
  }

  private retreiveDatas() { this.participantService.getListParticipant(this.nomFiltre, this.statutFiltre, this.arriveFiltre, this.listeTri).subscribe(data => { this.participants = data; }); }

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

  trier(event: any) { this.listeTri = event.target.value; this.retreiveDatas(); }
  filtrageParNom() { this.retreiveDatas(); }
  filtrageParStatut(event: any) { this.statutFiltre = event.target.value; this.retreiveDatas(); }
  filtrageParArrive(event: any) { this.arriveFiltre = event.target.value; this.retreiveDatas(); }
  filtrageReset() { this.nomFiltre = ""; this.statutFiltre = 0; this.arriveFiltre = 0; this.retreiveDatas(); }

  goToNewParticipant() { this.router.navigate(['/participant-create']); }

  formParticipant(id: number) { this.router.navigate(['/participant-details', id]); }

}
