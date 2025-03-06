import { Component, OnInit, ViewChild } from '@angular/core';
import { Production, ProductionEnum, ProductionTypeList } from '../production';
import { ProductionService } from '../production.service';
import { ParticipantShort } from '../participant';
import { ParticipantService } from '../participant.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({ selector: 'app-production-create', imports: [FormsModule], templateUrl: './production-create.component.html', styleUrl: './production-create.component.css' })

export class ProductionCreateComponent implements OnInit 
{
  
  participants: ParticipantShort[] = [];

  types: ProductionEnum[] = ProductionTypeList;
  
  @ViewChild('formRef') productionForm!: NgForm;
  
  production: Production = new Production();
  
  constructor(private productionService: ProductionService, private participantService: ParticipantService, private router: Router) { }

  ngOnInit(): void 
  { 
    this.retreiveParticipants();
  }

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
 
  private saveProduction() { this.productionService.createProduction(this.production).subscribe({ next: () => { this.goToListProduction(); }, error: (err: any) => { console.log(err); }, complete: () => { } }); }

  addProduction() { if (this.productionForm.valid) { this.saveProduction(); } }

  goToListProduction() {this.router.navigate(['/production-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }
  
  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
