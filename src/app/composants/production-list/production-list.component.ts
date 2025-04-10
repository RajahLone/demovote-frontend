import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { ProductionShort, ProductionEnum, ProductionTypeList } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';
import { saveAs } from 'file-saver';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FormsModule, NgForm } from '@angular/forms';

@Component({ selector: 'app-production-list', imports: [FormsModule, TooltipModule, MenuComponent], templateUrl: './production-list.component.html', styleUrl: './production-list.component.css' })

export class ProductionListComponent implements OnInit
{
  productions: ProductionShort[] = [];

  types: ProductionEnum[] = ProductionTypeList;
  typeFiltre: string = "";

  constructor(private productionService: ProductionService, private router: Router) { }

  ngOnInit() { this.retreiveDatas(); }

  private retreiveDatas() { this.productionService.getListProduction(this.typeFiltre).subscribe(data => { this.productions = data; }); }

  filtrageParType(event: any) { this.typeFiltre = event.target.value; this.goToRefreshListProduction(); }

  goToRefreshListProduction(){ this.retreiveDatas(); }

  goToNewProduction(){ this.router.navigate(['/production-create']); }

  formProduction(id: number) { this.router.navigate(['/production-details', id]); }

  getFile(id: number, nom: string) { this.productionService.getProductionFile(id).subscribe(response => { this.saveFile(response.body, nom); }); }

  saveFile(data: any, filename?: string) { const blob = new Blob([data], {type: 'application/zip'}); saveAs(blob, filename); }

}
