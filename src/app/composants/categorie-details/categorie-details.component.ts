import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';
import { FormsModule } from '@angular/forms'; 

@Component({ selector: 'app-categorie-details', imports: [FormsModule, MenuComponent], templateUrl: './categorie-details.component.html', styleUrl: './categorie-details.component.css' })

export class CategorieDetailsComponent implements OnInit, AfterViewInit 
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

  ngAfterViewInit() { }
 
  updateCategorie(id: number) { this.router.navigate(['/categorie-update', id]); }
  
  goToListCategorie(){ this.router.navigate(['/categorie-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
