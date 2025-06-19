import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { saveAs } from 'file-saver-es';

import { MenuComponent } from '../menu/menu.component';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';
import { AccountService } from '../../services/account.service';
import { BulletinService } from '../../services/bulletin.service';

@Component({ selector: 'app-poll-list', imports: [TooltipModule, MenuComponent], templateUrl: './poll-list.component.html', styleUrl: './poll-list.component.css' })

export class PollListComponent implements OnInit
{

  @ViewChild('boutonCloturer', {static: false}) boutonCloturer!: ElementRef;
  @ViewChild('imprimerResultats', {static: false}) imprimerResultats!: ElementRef;
  @ViewChild('boutonResultats', {static: false}) boutonResultats!: ElementRef;

  logged: boolean = false;
  role: string = "";

  categories: Categorie[] = [];
  affiches: number = 0;
  calcules: number = 0;

  constructor(
    private categorieService: CategorieService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private bulletinService: BulletinService,
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
      this.calcules = 0;
      this.categories = data;
      if (this.categories)
      {
        if (this.categories.length > 0)
        {
          for (let i = 0; i < this.categories.length; i++)
          {
            if (this.categories[i].pollable) { this.affiches++; }
            if (this.categories[i].computed) { this.calcules++; }
          }
        }
      }
      if (this.affiches > 0)
      {
        this.renderer.removeClass(this.boutonCloturer.nativeElement, 'disabled');
      }
      if (this.calcules > 0)
      {
        this.renderer.addClass(this.boutonCloturer.nativeElement, 'disabled');
        this.renderer.removeClass(this.imprimerResultats.nativeElement, 'disabled');
        this.renderer.removeClass(this.boutonResultats.nativeElement, 'disabled');
      }
    });
  }

  goToRefreshListCategorie() { this.retreiveDatas(); }

  voteCategorie(id: number) { this.router.navigate(['/poll-booth', id]); }

  fermerVotes() { if (this.logged && (this.role === "ADMIN")) { this.categorieService.cloreScrutins().subscribe(() => { this.goToRefreshListCategorie(); }); } }

  getResultatsPDF() { this.bulletinService.getResultatsPDF().subscribe(response => { this.savePDF(response.body, 'ranks.all.pdf'); }); }
  savePDF(data: any, filename?: string) { const blob = new Blob([data], {type: 'application/pdf'}); saveAs(blob, filename); }

  getDiaporama(id: number, nom: string) { this.bulletinService.getResultatsHTML(id).subscribe(response => { this.saveHTML(response.body, 'ranks.' + nom + '.html'); }); }
  saveHTML(data: any, filename?: string) { const blob = new Blob([data], {type: 'text/html'}); saveAs(blob, filename); }

  publierVotes() { if (this.logged && (this.role === "ADMIN")) { this.categorieService.publierVotes().subscribe(() => { this.goToRefreshListCategorie(); }); } }

}
