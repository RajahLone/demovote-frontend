import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { ProductionShort, ProductionEnum, ProductionTypeList } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';
import { saveAs } from 'file-saver';

@Component({ selector: 'app-production-list', imports: [], templateUrl: './production-list.component.html', styleUrl: './production-list.component.css' })

export class ProductionListComponent implements OnInit, AfterViewInit
{
  
  productions: ProductionShort[] = [];

  types: ProductionEnum[] = ProductionTypeList;

  constructor(private productionService: ProductionService, private router: Router, private application: AppComponent) { }

  ngOnInit(): void 
  {
    this.retreiveDatas(); 
  }
  
  ngAfterViewInit() 
  {
    this.application.menuActivateProds(); 
  }

  private retreiveDatas() { this.productionService.getListProduction().subscribe(data => { this.productions = data; }); }

  goToRefreshListProduction(){ this.router.navigate(['/production-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

  goToNewProduction(){ this.router.navigate(['/production-create']); }

  formProduction(id: number) { this.router.navigate(['/production-details', id]); }

  getFile(id: number, nom: string) { this.productionService.getProductionFile(id).subscribe(response => { this.saveFile(response.body, nom); }); }
  
  saveFile(data: any, filename?: string) { const blob = new Blob([data], {type: 'application/zip'}); saveAs(blob, filename); }
  
}
