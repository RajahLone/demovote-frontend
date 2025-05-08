import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';

import { MenuComponent } from '../menu/menu.component';
import { Categorie } from '../../interfaces/categorie';
import { ProductionVote } from '../../interfaces/production';
import { CategorieService } from '../../services/categorie.service';
import { BulletinService } from '../../services/bulletin.service';
import { ProductionService } from '../../services/production.service';

@Component({ selector: 'app-result-list', imports: [MenuComponent], templateUrl: './result-list.component.html', styleUrl: './result-list.component.css' })

export class ResultListComponent implements OnInit
{

  categories: Categorie[] = [];
  nombreVotants: number[] = [];
  productions: ProductionVote[][] = [[]];

  constructor(
    private categorieService: CategorieService,
    private router: Router,
    private route: ActivatedRoute,
    private bulletinService: BulletinService,
    private productionService: ProductionService
  ) { }

  ngOnInit() { this.goToRefreshListCategorie(); }

  private retreiveDatas()
  {
    this.categorieService.getListCategorie(false).subscribe(datac => {
      this.categories = datac;
      if (this.categories)
      {
        if (this.categories.length > 0)
        {
          for (let i = 0; i < this.categories.length; i++)
          {
            this.bulletinService.getResultats(this.categories[i].numeroCategorie).subscribe(datap => { this.productions[i] = datap; });
            this.bulletinService.getNombreVotants(this.categories[i].numeroCategorie).subscribe(datav => { this.nombreVotants[i] = Number('' + datav); });
          }
        }
      }
    });
  }

  positionReelle: number = 1;
  positionCachee: number = 1;
  resetPositions() { this.positionReelle = 1; this.positionCachee = 1; }
  setPositionReelle(c: number, p: number)
  {
    if (p > 0)
    {
      if ((this.productions[c][p].nombrePoints == this.productions[c][p - 1].nombrePoints) && (this.productions[c][p].nombreFirst == this.productions[c][p - 1].nombreFirst)) { }
      else { this.positionReelle = this.positionCachee; }
    }
    else { this.positionReelle = this.positionCachee; }
  }
  incrementePosition() { this.positionCachee++; }

  goToRefreshListCategorie() { this.retreiveDatas(); }

  getFile(id: number, groupe: string, titre: string) { this.productionService.getProductionFile(id).subscribe(response => { this.saveFile(response.body, 'prod.' + groupe + ' - ' + titre + '.zip'); }); }
  saveFile(data: any, filename?: string) { const blob = new Blob([data], {type: 'application/zip'}); saveAs(blob, filename); }

}
