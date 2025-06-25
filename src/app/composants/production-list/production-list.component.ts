import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { saveAs } from 'file-saver-es';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faRotate, faComment, faQuestion, faVideo, faMusic, faImage, faSquareBinary, faDownload, faUserTie } from '@fortawesome/free-solid-svg-icons';

import { MenuComponent } from '../menu/menu.component';
import { ProductionShort, ProductionEnum, ProductionTypeList } from '../../interfaces/production';
import { ProductionService } from '../../services/production.service';

@Component({ selector: 'app-production-list', imports: [FontAwesomeModule, FormsModule, TooltipModule, MenuComponent], templateUrl: './production-list.component.html', styleUrl: './production-list.component.css' })

export class ProductionListComponent implements OnInit
{
  faPlus = faPlus; faRotate = faRotate; faComment = faComment; faQuestion = faQuestion; faVideo = faVideo; faMusic = faMusic; faImage = faImage; faSquareBinary = faSquareBinary;
  faDownload = faDownload; faUserTie = faUserTie;

  productions: ProductionShort[] = [];

  listeTri: number = 0;

  types: ProductionEnum[] = ProductionTypeList;
  typeFiltre: string = "";
  soloFiltre: number = 0;

  constructor(
    private productionService: ProductionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { this.goToRefreshListProduction(); }

  private retreiveDatas() { this.productionService.getListProduction(this.listeTri, this.typeFiltre, this.soloFiltre).subscribe(data => { this.productions = data; }); }

  trier(event: any) { this.listeTri = event.target.value; this.retreiveDatas(); }
  filtrageParType(event: any) { this.typeFiltre = event.target.value; this.goToRefreshListProduction(); }
  filtrageParSolo(event: any) { this.soloFiltre = event.target.value; this.goToRefreshListProduction(); }

  goToRefreshListProduction() { this.retreiveDatas(); }

  goToNewProduction() { this.router.navigate(['/production-create']); }

  formProduction(id: number) { this.router.navigate(['/production-details', id]); }

  getFile(id: number, nom: string) { this.productionService.getProductionFile(id).subscribe(response => { this.saveFile(response.body, nom); }); }

  saveFile(data: any, filename?: string) { const blob = new Blob([data], {type: 'application/zip'}); saveAs(blob, filename); }

}
