import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from '../categorie';
import { CategorieService } from '../categorie.service';

@Component({ selector: 'app-categorie-list', imports: [], templateUrl: './categorie-list.component.html', styleUrl: './categorie-list.component.css'})

export class CategorieListComponent implements OnInit 
{

  categories: Categorie[] = [];

  constructor(private categorieService: CategorieService, private router: Router) { }

  ngOnInit(): void { this.retreiveDatas(); }

  private retreiveDatas() { this.categorieService.getListCategorie().subscribe(data => { this.categories = data; }); }

  formCategorie(id: number) { this.router.navigate(['/categorie-details', id]); }
 
  goToRefreshListCategorie(){ this.retreiveDatas(); }

  goToNewCategorie(){ this.router.navigate(['/categorie-create']); }

}
