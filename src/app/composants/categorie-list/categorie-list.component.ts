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

  goToRefreshListCategorie(){ this.router.navigate(['/categorie-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }
  
  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

  goToNewCategorie(){ this.router.navigate(['/categorie-create']); }

  formCategorie(id: number) { this.router.navigate(['/categorie-details', id]); }

}
