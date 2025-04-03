import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { ProductionShort, ProductionEnum, ProductionTypeList } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';
import { ParticipantShort } from '../../interfaces/participant';
import { ParticipantService } from '../../services/participant.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({ selector: 'app-production-update', imports: [FormsModule, MenuComponent], templateUrl: './production-update.component.html', styleUrl: './production-update.component.css' })

export class ProductionUpdateComponent implements OnInit
{

  participants: ParticipantShort[] = [];

  types: ProductionEnum[] = ProductionTypeList;

  @ViewChild('formRef') productionForm!: NgForm;

  production: ProductionShort = new ProductionShort();

  numeroProduction: number = 0;

  constructor(private productionService: ProductionService, private participantService: ParticipantService, private route: ActivatedRoute, private router: Router, private menu: MenuComponent) { }

  ngOnInit()
  {
    this.retreiveParticipants();
    this.numeroProduction = this.route.snapshot.params['numeroProduction'];
    this.productionService.getByIdProduction(this.numeroProduction).subscribe(data => { this.production = data; });
  }

  private retreiveParticipants() { this.participantService.getOptionListParticipant().subscribe(data => { this.participants = data; }); }

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

  private saveProduction() { this.productionService.updateProduction(this.numeroProduction, this.production).subscribe(); this.goToListProduction(); }

  updateConfirmed() { if (this.productionForm.valid) { this.saveProduction(); } }

  deleteConfirmed() { this.productionService.deleteProduction(this.numeroProduction).subscribe(); this.goToListProduction(); }

  goToListProduction() {this.router.navigate(['/production-list'], { queryParams: { 'refresh': this.menu.getRandomInteger(1, 100000) } }); }

}
