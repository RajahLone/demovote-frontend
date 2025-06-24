import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({ selector: 'app-categorie-create', imports: [FontAwesomeModule, FormsModule, MenuComponent], templateUrl: './categorie-create.component.html', styleUrl: './categorie-create.component.css'})

export class CategorieCreateComponent implements OnInit
{
  faXmark = faXmark; faPlus = faPlus;

  @ViewChild('formRef') categorieForm!: NgForm;

  categorie: Categorie = new Categorie();

  constructor(private categorieService: CategorieService, private router: Router, private menu: MenuComponent) { }

  ngOnInit() { }

  private saveCategorie() { this.categorieService.createCategorie(this.categorie).subscribe(() => { this.goToListCategorie(); }); }

  addCategorie() { if (this.categorieForm.valid) { this.saveCategorie(); } }

  goToListCategorie() { this.router.navigate(['/categorie-list']); }

}
