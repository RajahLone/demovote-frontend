import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { ProductionShort, ProductionEnum, ProductionTypeList } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';
import { saveAs } from 'file-saver';
import { TooltipModule } from 'ngx-bootstrap/tooltip'; 

@Component({ selector: 'app-production-list', imports: [TooltipModule, MenuComponent], templateUrl: './production-list.component.html', styleUrl: './production-list.component.css' })

export class ProductionListComponent implements OnInit, AfterViewInit
{
  
  productions: ProductionShort[] = [];

  types: ProductionEnum[] = ProductionTypeList;

  constructor(private productionService: ProductionService, private router: Router) { }

  ngOnInit() { this.retreiveDatas(); }
  
  ngAfterViewInit() { }

  private retreiveDatas() { this.productionService.getListProduction().subscribe(data => { this.productions = data; }); }

  goToRefreshListProduction(){ window.location.reload(); }

  goToNewProduction(){ this.router.navigate(['/production-create']); }

  formProduction(id: number) { this.router.navigate(['/production-details', id]); }

  getFile(id: number, nom: string) { this.productionService.getProductionFile(id).subscribe(response => { this.saveFile(response.body, nom); }); }
  
  saveFile(data: any, filename?: string) { const blob = new Blob([data], {type: 'application/zip'}); saveAs(blob, filename); }
  
}
