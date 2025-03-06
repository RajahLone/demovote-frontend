import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductionShort, ProductionEnum, ProductionTypeList } from '../production';
import { ProductionService } from '../production.service';
import { ParticipantShort } from '../participant';
import { ParticipantService } from '../participant.service';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({ selector: 'app-production-update', imports: [FormsModule], templateUrl: './production-update.component.html', styleUrl: './production-update.component.css' })

export class ProductionUpdateComponent implements OnInit
{
  
  participants: ParticipantShort[] = [];

  types: ProductionEnum[] = ProductionTypeList;
  
  @ViewChild('formRef') productionForm!: NgForm;
  
  production: ProductionShort = new ProductionShort();
  
  numeroProduction: number = 0;

  constructor(private productionService: ProductionService, private participantService: ParticipantService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void 
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
 
  private saveProduction() { this.productionService.updateProduction(this.numeroProduction, this.production).subscribe({ next: () => { this.goToListProduction(); }, error: (err: any) => { console.log(err); }, complete: () => { } }); }

  updateConfirmed() { if (this.productionForm.valid) { this.saveProduction(); } }

  deleteConfirmed() { this.productionService.deleteProduction(this.numeroProduction).subscribe(() => { this.goToListProduction(); }); }

  goToListProduction() {this.router.navigate(['/production-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }
  
  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
