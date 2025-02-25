import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../categorie';
import { CategorieService } from '../categorie.service';
import { FormsModule } from '@angular/forms'; 

@Component({ selector: 'app-categorie-details', imports: [FormsModule], templateUrl: './categorie-details.component.html', styleUrl: './categorie-details.component.css' })

export class CategorieDetailsComponent implements OnInit 
{

  numeroCategorie: number = 0;

  categorie: Categorie = new Categorie();
  
  constructor(private categorieService: CategorieService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void 
  {
    this.numeroCategorie = this.route.snapshot.params['numeroCategorie'];
    this.categorie = new Categorie();
    this.categorieService.getByIdCategorie(this.numeroCategorie).subscribe( data => { this.categorie = data; });
  }
 
  updateCategorie(id: number) { this.router.navigate(['/categorie-update', id]); }
  
  goToListCategorie(){ this.router.navigate(['/categorie-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
