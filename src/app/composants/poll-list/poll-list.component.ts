import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';

@Component({ selector: 'app-poll-list', imports: [MenuComponent], templateUrl: './poll-list.component.html', styleUrl: './poll-list.component.css' })

export class PollListComponent implements OnInit
{

  categories: Categorie[] = [];

  constructor(
    private categorieService: CategorieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { this.goToRefreshListCategorie(); }

  private retreiveDatas() { this.categorieService.getListCategorie(false).subscribe(data => { this.categories = data; }); }

  goToRefreshListCategorie() { this.retreiveDatas(); }

  voteCategorie(id: number) { this.router.navigate(['/poll-booth', id]); }

}
