import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';

import { MenuComponent } from '../menu/menu.component';
import { Journees } from '../../interfaces/divers';
import { DiversService } from '../../services/divers.service'
import { Evenement, EvenementEnum, EvenementTypeList } from '../../interfaces/evenement';
import { EvenementService } from '../../services/evenement.service';

@Component({ selector: 'app-evenement-create', imports: [FontAwesomeModule, FormsModule, MenuComponent], templateUrl: './evenement-create.component.html', styleUrl: './evenement-create.component.css'})

export class EvenementCreateComponent implements OnInit
{
  faXmark = faXmark; faPlus = faPlus;

  @ViewChild('formRef') evenementForm!: NgForm;

  journees: Journees = new Journees();

  evenement: Evenement = new Evenement();

  types: EvenementEnum[] = EvenementTypeList;

  constructor(
    private diversService: DiversService,
    private evenementService: EvenementService,
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuComponent
  ) { }

  ngOnInit()
  {
    this.journees = new Journees();
    this.diversService.getJournees().subscribe(data => { this.journees = data; });

    this.evenement.jourDebut = this.route.snapshot.params['jourEvenement'];
    this.evenement.heureDebut = "00:00";
  }

  private saveEvenement() { this.evenementService.createEvenement(this.evenement).subscribe(() => { this.goToListEvenement(); }); }

  addEvenement() { if (this.evenementForm.valid) { this.saveEvenement(); } }

  goToListEvenement() { this.router.navigate(['/evenement-list']); }

}
