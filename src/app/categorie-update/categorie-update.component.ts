import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../categorie';
import { CategorieService } from '../categorie.service';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({ selector: 'app-categorie-update', imports: [FormsModule], templateUrl: './categorie-update.component.html', styleUrl: './categorie-update.component.css' })

export class CategorieUpdateComponent implements OnInit
{
  @ViewChild('formRef') categorieForm!: NgForm;

  numeroCategorie: number = 0;
  
  categorie: Categorie = new Categorie();
  
  constructor(private categorieService: CategorieService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void 
  {
    this.numeroCategorie = this.route.snapshot.params['numeroCategorie'];
    this.categorieService.getByIdCategorie(this.numeroCategorie).subscribe(data => { this.categorie = data; });
  }

  updateConfirmed() { if (this.categorieForm.valid) { this.categorieService.updateCategorie(this.numeroCategorie, this.categorie).subscribe(() => { this.goToListCategorie(); }); } }

  deleteConfirmed() { this.categorieService.deleteCategorie(this.numeroCategorie).subscribe(() => { this.goToListCategorie(); }); }

  goToListCategorie(){ this.router.navigate(['/categorie-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }
  
  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
