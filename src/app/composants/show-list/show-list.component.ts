import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { saveAs } from 'file-saver-es';

import { MenuComponent } from '../menu/menu.component';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';

import { ProductionShort, ProductionEnum, ProductionTypeList } from '../../interfaces/production';
import { PresentationService } from '../../services/presentation.service';
import { ProductionService } from '../../services/production.service';

@Component({ selector: 'app-show-list', imports: [FormsModule, TooltipModule, MenuComponent], templateUrl: './show-list.component.html', styleUrl: './show-list.component.css' })

export class ShowListComponent implements OnInit
{

  categories: Categorie[] = [];

  types: ProductionEnum[] = ProductionTypeList;
  productions: ProductionShort[] = [];

  constructor(
    private categorieService: CategorieService,
    private presentationService: PresentationService,
    private productionService: ProductionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { this.goToRefreshListCategorie(); }

  private retreiveDatas()
  {
    this.categorieService.getListCategorie(false).subscribe(data => { this.categories = data; });
    this.presentationService.getListProduction().subscribe(data => { this.productions = data; });
  }

  lettresOrdre: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  indexLettre: number = 0;

  resetLettre() { this.indexLettre = 0; }
  nextLettre(): string { if ((this.indexLettre >= 0) && (this.indexLettre < 26)) { this.indexLettre++; return "#" + this.lettresOrdre[this.indexLettre - 1];  } return ""; }

  goToRefreshListCategorie() { this.retreiveDatas(); }

  lierProductions(id: number) { this.router.navigate(['/show-links', id]); }
  formPresentation(id: number) { this.router.navigate(['/show-upload', id]); }

  getVersionPDF() { this.presentationService.getPresentationPDF().subscribe(response => { this.savePDF(response.body, 'shows.all.pdf'); }); }
  savePDF(data: any, filename?: string) { const blob = new Blob([data], {type: 'application/pdf'}); saveAs(blob, filename); }

  getDiaporama(id: number, nom: string) { this.presentationService.getPresentationHTML(id).subscribe(response => { this.saveHTML(response.body, 'shows.' + nom + '.html'); }); }
  saveHTML(data: any, filename?: string) { const blob = new Blob([data], {type: 'text/html'}); saveAs(blob, filename); }

  getFile(id: number, nom: string) { this.productionService.getProductionFile(id).subscribe(response => { this.saveFile(response.body, nom); }); }
  saveFile(data: any, filename?: string) { const blob = new Blob([data], {type: 'application/zip'}); saveAs(blob, filename); }

  ouvrirScrutin(id: number) { this.categorieService.ouvrirScrutin(id).subscribe(() => { this.goToRefreshListCategorie(); }); }

}
