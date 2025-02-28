import { Component, OnInit, ViewChild } from '@angular/core';
import { Production, ProductionTypeEnum } from '../production';
import { ProductionService } from '../production.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({ selector: 'app-production-create', imports: [FormsModule], templateUrl: './production-create.component.html', styleUrl: './production-create.component.css' })

export class ProductionCreateComponent implements OnInit 
{
  
  PT = ProductionTypeEnum;

  @ViewChild('formRef') productionForm!: NgForm;
  
  production: Production = new Production();
  
  constructor(private productionService: ProductionService, private router: Router) { }

  ngOnInit(): void 
  { 
    this.production.type = this.PT.EXECUTABLE;
  }

  private saveProduction() { this.productionService.createProduction(this.production).subscribe({ next: () => { this.goToListProduction(); }, error: (err: any) => { console.log(err); }, complete: () => { } }); }

  addProduction() { if (this.productionForm.valid) { this.saveProduction(); } }

  goToListProduction() {this.router.navigate(['/production-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }
  
  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
