import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';

@Component({ selector: 'app-categorie-list', imports: [MenuComponent], templateUrl: './categorie-list.component.html', styleUrl: './categorie-list.component.css'})

export class CategorieListComponent implements OnInit
{
  refresh: number = 0;

  categories: Categorie[] = [];

  constructor(
    private categorieService: CategorieService,
    private router: Router,
    private route: ActivatedRoute
  )
  {
    this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; }
    this.router.events.subscribe((evt) => { if (evt instanceof NavigationEnd) { this.router.navigated = false; window.scrollTo(0, 0); } });
  }

  ngOnInit()
  {
    this.refresh = this.route.snapshot.params['refresh'];
    this.goToRefreshListCategorie();
  }

  private retreiveDatas() { this.categorieService.getListCategorie().subscribe(data => { this.categories = data; }); }

  goToRefreshListCategorie() { this.retreiveDatas(); }

  goToNewCategorie() { this.router.navigate(['/categorie-create']); }

  formCategorie(id: number) { this.router.navigate(['/categorie-details', id]); }

}
