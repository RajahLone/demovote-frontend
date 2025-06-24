import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

import { MenuComponent } from '../menu/menu.component';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';

@Component({ selector: 'app-categorie-update', imports: [FontAwesomeModule, FormsModule, MenuComponent], templateUrl: './categorie-update.component.html', styleUrl: './categorie-update.component.css' })

export class CategorieUpdateComponent implements OnInit
{
  faXmark = faXmark; faCheck = faCheck; faTrash = faTrash;

  @ViewChild('formRef') categorieForm!: NgForm;

  numeroCategorie: number = 0;

  categorie: Categorie = new Categorie();

  constructor(private categorieService: CategorieService, private route: ActivatedRoute, private router: Router, private menu: MenuComponent) { }

  ngOnInit()
  {
    this.numeroCategorie = this.route.snapshot.params['numeroCategorie'];
    this.categorieService.getByIdCategorie(this.numeroCategorie).subscribe(data => { this.categorie = data; });
  }

  updateConfirmed() { if (this.categorieForm.valid) { this.categorieService.updateCategorie(this.numeroCategorie, this.categorie).subscribe(() => { this.goToListCategorie(); }); } }

  deleteConfirmed() { this.categorieService.deleteCategorie(this.numeroCategorie).subscribe(() => { this.goToListCategorie(); }); }

  goToListCategorie() { this.router.navigate(['/categorie-list']); }

}
