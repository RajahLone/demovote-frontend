import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { MenuComponent } from '../menu/menu.component';
import { Journees } from '../../interfaces/divers';
import { DiversService } from '../../services/divers.service'
import { Evenement, EvenementEnum, EvenementTypeList } from '../../interfaces/evenement';
import { EvenementService } from '../../services/evenement.service';

import { AccountService } from '../../services/account.service';

@Component({ selector: 'app-evenement-list', imports: [FontAwesomeModule, MenuComponent], templateUrl: './evenement-list.component.html', styleUrl: './evenement-list.component.css' })

export class EvenementListComponent implements OnInit
{
  faPlus = faPlus; faPenToSquare = faPenToSquare;

  journees: Journees = new Journees();

  evenements1: Evenement[] = [];
  evenements2: Evenement[] = [];
  evenements3: Evenement[] = [];

  types: EvenementEnum[] = EvenementTypeList;

  logged: boolean = false;
  role: string = "";

  constructor(
    private accountService: AccountService,
    private diversService: DiversService,
    private evenementService: EvenementService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit()
  {
    this.logged = this.accountService.isLogged();
    this.role = this.accountService.getRole();

    this.journees = new Journees();
    this.diversService.getJournees().subscribe(data =>
    {
      this.journees = data;

      if (this.journees.jour1Court) { this.evenementService.getListEvenement(this.journees.jour1Event).subscribe(data1 => { this.evenements1 = data1; }); }
      if (this.journees.jour2Court) { this.evenementService.getListEvenement(this.journees.jour2Event).subscribe(data2 => { this.evenements2 = data2; }); }
      if (this.journees.jour3Court) { this.evenementService.getListEvenement(this.journees.jour3Event).subscribe(data3 => { this.evenements3 = data3; }); }
    });
  }

  goToNewEvenement(jour: string) { this.router.navigate(['/evenement-create', jour]); }

  goToEditEvenement(id: number) { this.router.navigate(['/evenement-update', id]); }

}
