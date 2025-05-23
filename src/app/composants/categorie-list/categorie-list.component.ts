import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';

@Component({ selector: 'app-categorie-list', imports: [MenuComponent], templateUrl: './categorie-list.component.html', styleUrl: './categorie-list.component.css'})

export class CategorieListComponent implements OnInit
{

  categories: Categorie[] = [];

  constructor(
    private categorieService: CategorieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { this.goToRefreshListCategorie(); }

  private retreiveDatas() { this.categorieService.getListCategorie(true).subscribe(data => { this.categories = data; }); }

  goToRefreshListCategorie() { this.retreiveDatas(); }

  goToNewCategorie() { this.router.navigate(['/categorie-create']); }

  formCategorie(id: number) { this.router.navigate(['/categorie-details', id]); }

}
