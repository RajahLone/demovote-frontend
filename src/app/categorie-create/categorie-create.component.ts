import { Component, OnInit, ViewChild } from '@angular/core';
import { Categorie } from '../categorie';
import { CategorieService } from '../categorie.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({ selector: 'app-categorie-create', imports: [FormsModule], templateUrl: './categorie-create.component.html', styleUrl: './categorie-create.component.css'})

export class CategorieCreateComponent implements OnInit
{
  @ViewChild('formRef') categorieForm!: NgForm;

  categorie: Categorie = new Categorie();
  
  constructor(private categorieService: CategorieService, private router: Router) { }

  ngOnInit(): void { }

  private saveCategorie() { this.categorieService.createCategorie(this.categorie).subscribe({ next: () => { this.goToListCategorie(); }, error: (err: any) => { console.log(err); }, complete: () => { } }); }

  addCategorie() { if (this.categorieForm.valid) { this.saveCategorie(); } }

  goToListCategorie() {this.router.navigate(['/categorie-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }
  
  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
