import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { MenuComponent } from '../menu/menu.component';
import { Production, ProductionEnum, ProductionTypeList } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';
import { ParticipantShort } from '../../interfaces/participant';
import { ParticipantService } from '../../services/participant.service';
import { AccountService } from '../../services/account.service'

@Component({ selector: 'app-production-create', imports: [FormsModule, MenuComponent], templateUrl: './production-create.component.html', styleUrl: './production-create.component.css' })

export class ProductionCreateComponent implements OnInit
{

  participants: ParticipantShort[] = [];

  types: ProductionEnum[] = ProductionTypeList;

  @ViewChild('formRef') productionForm!: NgForm;

  production: Production = new Production();

  constructor(
    private accountService : AccountService,
    private productionService: ProductionService,
    private participantService: ParticipantService,
    private router: Router,
    private menu: MenuComponent
  ) { }

  ngOnInit() { this.retreiveParticipants(); this.production.numeroParticipant = this.accountService.getNumeroParticipant(); }

  private retreiveParticipants() { this.participantService.getOptionListParticipant().subscribe(data => { this.participants = data; }); }

  onArchiveSelected(event: any)
  {
    const et = event.target;
    const reader = new FileReader();

    if (et.files && et.files.length > 0)
    {
      const file = et.files[0];

      this.production.nomArchive = file.name;
      this.production.numeroVersion = 1;

      reader.onloadend = async (e: any) => { if (e.target.result) { this.production.archive = e.target.result; } }

      reader.readAsDataURL(file);
		}
  }

  onVignetteSelected(event: any)
  {
    const et = event.target;
    const reader = new FileReader();

    if (et.files && et.files.length > 0)
    {
      const file = et.files[0];

      reader.onloadend = async (e: any) => { if (e.target.result) { this.production.vignette = e.target.result; } }

      reader.readAsDataURL(file);
		}
  }

  private saveProduction() { this.productionService.createProduction(this.production).subscribe(() => { this.goToListProduction(); }); }

  addProduction() { if (this.productionForm.valid) { this.saveProduction(); } }

  goToListProduction() { this.router.navigate(['/production-list', this.menu.getRandomInteger(1, 100000)]); }

}
