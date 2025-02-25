import { Component, OnInit } from '@angular/core';
import { Categorie } from '../categorie';
import { CategorieService } from '../categorie.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({ selector: 'app-categorie-create', imports: [FormsModule], templateUrl: './categorie-create.component.html', styleUrl: './categorie-create.component.css'})

export class CategorieCreateComponent 
{

  categorie: Categorie = new Categorie();
  
  constructor(private categorieService: CategorieService, private router: Router) { }

  ngOnInit(): void { }

  saveCategorie() { this.categorieService.createCategorie(this.categorie).subscribe({
        next: (params) => { console.log('params', params); this.goToListCategorie(); },
        error: (err: any) => { console.log(err); },
        complete: () => { }
      }); }

  onSubmit(){ console.log(this.categorie); this.saveCategorie(); }

  goToListCategorie() {this.router.navigate(['/categorie-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }
  
  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
