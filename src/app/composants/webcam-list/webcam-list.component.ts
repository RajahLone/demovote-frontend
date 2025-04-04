import { Component, OnInit } from '@angular/core';

import { MenuComponent } from '../menu/menu.component';

@Component({ selector: 'app-webcam-list', imports: [MenuComponent], templateUrl: './webcam-list.component.html', styleUrl: './webcam-list.component.css' })

export class WebcamListComponent implements OnInit
{

  // TODO : téléchargement depuis l'API et non pas directement

  constructor() { }

  ngOnInit() { }

}
