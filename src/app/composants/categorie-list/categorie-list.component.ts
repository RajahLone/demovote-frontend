import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';

@Component({ selector: 'app-categorie-list', imports: [MenuComponent], templateUrl: './categorie-list.component.html', styleUrl: './categorie-list.component.css'})

export class CategorieListComponent implements OnInit, AfterViewInit 
{

  categories: Categorie[] = [];

  constructor(private categorieService: CategorieService, private router: Router) { }

  ngOnInit(): void { this.retreiveDatas(); }

  ngAfterViewInit() { }

  private retreiveDatas() { this.categorieService.getListCategorie().subscribe(data => { this.categories = data; }); }

  goToRefreshListCategorie(){ window.location.reload(); }
  
  goToNewCategorie(){ this.router.navigate(['/categorie-create']); }

  formCategorie(id: number) { this.router.navigate(['/categorie-details', id]); }

}
