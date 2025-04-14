import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from '../menu/menu.component';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';

@Component({ selector: 'app-categorie-details', imports: [FormsModule, MenuComponent], templateUrl: './categorie-details.component.html', styleUrl: './categorie-details.component.css' })

export class CategorieDetailsComponent implements OnInit
{

  numeroCategorie: number = 0;

  categorie: Categorie = new Categorie();

  constructor(private categorieService: CategorieService, private route: ActivatedRoute, private router: Router, private menu: MenuComponent) { }

  ngOnInit()
  {
    this.numeroCategorie = this.route.snapshot.params['numeroCategorie'];
    this.categorie = new Categorie();
    this.categorieService.getByIdCategorie(this.numeroCategorie).subscribe( data => { this.categorie = data; });
  }

  updateCategorie(id: number) { this.router.navigate(['/categorie-update', id]); }

  goToListCategorie(){ this.router.navigate(['/categorie-list'], { queryParams: { 'refresh': this.menu.getRandomInteger(1, 100000) } }); }

}
