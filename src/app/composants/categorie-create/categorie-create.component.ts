import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({ selector: 'app-categorie-create', imports: [FormsModule, MenuComponent], templateUrl: './categorie-create.component.html', styleUrl: './categorie-create.component.css'})

export class CategorieCreateComponent implements OnInit, AfterViewInit
{
  @ViewChild('formRef') categorieForm!: NgForm;

  categorie: Categorie = new Categorie();
  
  constructor(private categorieService: CategorieService, private router: Router, private menu: MenuComponent) { }

  ngOnInit(): void { }

  ngAfterViewInit() { }

  private saveCategorie() { this.categorieService.createCategorie(this.categorie).subscribe({ next: () => { this.goToListCategorie(); }, error: (err: any) => { console.log(err); }, complete: () => { } }); }

  addCategorie() { if (this.categorieForm.valid) { this.saveCategorie(); } }

  goToListCategorie() {this.router.navigate(['/categorie-list'], { queryParams: { 'refresh': this.menu.getRandomInteger(1, 100000) } }); }
  
}
