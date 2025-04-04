import { Component, OnInit } from '@angular/core';

import { MenuComponent } from '../menu/menu.component';
import { Journees } from '../../interfaces/divers';
import { DiversService } from '../../services/divers.service'

@Component({ selector: 'app-event-list', imports: [MenuComponent], templateUrl: './event-list.component.html', styleUrl: './event-list.component.css' })

export class EventListComponent implements OnInit
{

  journees: Journees = new Journees();

  constructor(private diversService: DiversService) { }

  ngOnInit()
  {
    this.journees = new Journees();
    this.diversService.getJournees().subscribe(data => { this.journees = data; });
  }

}
