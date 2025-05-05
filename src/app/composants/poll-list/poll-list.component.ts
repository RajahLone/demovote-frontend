import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';
import { AccountService } from '../../services/account.service';

@Component({ selector: 'app-poll-list', imports: [MenuComponent], templateUrl: './poll-list.component.html', styleUrl: './poll-list.component.css' })

export class PollListComponent implements OnInit
{

  @ViewChild('boutonCloturer', {static: false}) boutonCloturer!: ElementRef;

  logged: boolean = false;
  role: string = "";

  categories: Categorie[] = [];
  affiches: number = 0;

  constructor(
    private categorieService: CategorieService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private renderer: Renderer2
  ) { }

  ngOnInit()
  {
    this.logged = this.accountService.isLogged();
    this.role = this.accountService.getRole();

    this.goToRefreshListCategorie();
  }

  private retreiveDatas()
  {
    this.categorieService.getListCategorie(false).subscribe(data => {
      this.affiches = 0;
      this.categories = data;
      if (this.categories)
      {
        if (this.categories.length > 0)
        {
          for (let i = 0; i < this.categories.length; i++) { if (this.categories[i].pollable) { this.affiches++; } }
        }
      }
      if (this.affiches > 0) { this.renderer.removeClass(this.boutonCloturer.nativeElement, 'disabled'); }
    });
  }

  goToRefreshListCategorie() { this.retreiveDatas(); }

  voteCategorie(id: number) { this.router.navigate(['/poll-booth', id]); }

  fermerVotes() { if (this.logged && (this.role === "ADMIN")) { this.categorieService.cloreScrutins().subscribe(() => { this.goToRefreshListCategorie(); }); } }

}
