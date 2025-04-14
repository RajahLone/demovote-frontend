import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { saveAs } from 'file-saver';

import { MenuComponent } from '../menu/menu.component';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';

import { ProductionShort, ProductionEnum, ProductionTypeList } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';

@Component({ selector: 'app-show-list', imports: [FormsModule, TooltipModule, MenuComponent], templateUrl: './show-list.component.html', styleUrl: './show-list.component.css' })

export class ShowListComponent implements OnInit
{

  categories: Categorie[] = [];

  types: ProductionEnum[] = ProductionTypeList;
  productions: ProductionShort[] = [];

  constructor(private categorieService: CategorieService, private productionService: ProductionService, private router: Router) { }

  ngOnInit() { this.retreiveDatas(); }

  private retreiveDatas()
  {
    this.categorieService.getListCategorie().subscribe(data => { this.categories = data; });
    this.productionService.getListProduction('').subscribe(data => { this.productions = data; });
  }

  goToRefreshListCategorie(){ this.retreiveDatas(); }

  formProduction(id: number) { this.router.navigate(['/production-details', id]); }

  lierProductions(id: number) { this.router.navigate(['/show-links', id]); }

  getFile(id: number, nom: string) { this.productionService.getProductionFile(id).subscribe(response => { this.saveFile(response.body, nom); }); }

  saveFile(data: any, filename?: string) { const blob = new Blob([data], {type: 'application/zip'}); saveAs(blob, filename); }

}
