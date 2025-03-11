import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ProductionShort, ProductionEnum, ProductionTypeList } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';
import { FormsModule } from '@angular/forms'; 

@Component({ selector: 'app-production-details', imports: [FormsModule], templateUrl: './production-details.component.html', styleUrl: './production-details.component.css' })

export class ProductionDetailsComponent implements OnInit, AfterViewInit
{
  
  numeroProduction: number = 0;

  types: ProductionEnum[] = ProductionTypeList;
  
  production: ProductionShort = new ProductionShort();
  
  constructor(private productionService: ProductionService, private route: ActivatedRoute, private router: Router, private application: AppComponent) { }

  ngOnInit(): void 
  { 
    this.numeroProduction = this.route.snapshot.params['numeroProduction'];
    this.production = new ProductionShort();
    this.productionService.getByIdProduction(this.numeroProduction).subscribe( data => { this.production = data; });
  }
  
  ngAfterViewInit() { this.application.menuActivateProds(); }

  updateArchive(id: number) { this.router.navigate(['/production-upload', id]); }
  
  updateProduction(id: number) { this.router.navigate(['/production-update', id]); }

  goToListProduction() {this.router.navigate(['/production-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }
  
  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
