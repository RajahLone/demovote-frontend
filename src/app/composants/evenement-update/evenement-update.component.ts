import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import { MenuComponent } from '../menu/menu.component';
import { Journees } from '../../interfaces/divers';
import { DiversService } from '../../services/divers.service'
import { Evenement, EvenementEnum, EvenementTypeList } from '../../interfaces/evenement';
import { EvenementService } from '../../services/evenement.service';

@Component({ selector: 'app-evenement-update', imports: [FontAwesomeModule, FormsModule, MenuComponent], templateUrl: './evenement-update.component.html', styleUrl: './evenement-update.component.css' })

export class EvenementUpdateComponent implements OnInit
{
  faXmark = faXmark; faCheck = faCheck; faTrash = faTrash;

  @ViewChild('formRef') evenementForm!: NgForm;

  journees: Journees = new Journees();

  numeroEvenement: number = 0;

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

    this.numeroEvenement = this.route.snapshot.params['numeroEvenement'];
    this.evenementService.getByIdEvenement(this.numeroEvenement).subscribe(data => { this.evenement = data; });
  }

  updateConfirmed() { if (this.evenementForm.valid) { this.evenementService.updateEvenement(this.numeroEvenement, this.evenement).subscribe(() => { this.goToListEvenement(); }); } }

  deleteConfirmed() { this.evenementService.deleteEvenement(this.numeroEvenement).subscribe(() => { this.goToListEvenement(); }); }

  goToListEvenement() { this.router.navigate(['/evenement-list']); }

}
