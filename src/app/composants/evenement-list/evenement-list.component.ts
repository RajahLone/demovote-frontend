import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { Journees } from '../../interfaces/divers';
import { DiversService } from '../../services/divers.service'
import { Evenement, EvenementEnum, EvenementTypeList } from '../../interfaces/evenement';
import { EvenementService } from '../../services/evenement.service';

@Component({ selector: 'app-evenement-list', imports: [MenuComponent], templateUrl: './evenement-list.component.html', styleUrl: './evenement-list.component.css' })

export class EvenementListComponent implements OnInit
{

  journees: Journees = new Journees();

  evenements1: Evenement[] = [];
  evenements2: Evenement[] = [];
  evenements3: Evenement[] = [];

  types: EvenementEnum[] = EvenementTypeList;

  constructor(
    private diversService: DiversService,
    private evenementService: EvenementService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit()
  {
    this.journees = new Journees();
    this.diversService.getJournees().subscribe(data =>
    {
      this.journees = data;

      if (this.journees.jour1Court) { this.evenementService.getListEvenement(this.journees.jour1Event).subscribe(data1 => { this.evenements1 = data1; }); }
      if (this.journees.jour2Court) { this.evenementService.getListEvenement(this.journees.jour2Event).subscribe(data2 => { this.evenements2 = data2; }); }
      if (this.journees.jour3Court) { this.evenementService.getListEvenement(this.journees.jour3Event).subscribe(data3 => { this.evenements3 = data3; }); }
    });
  }

}
