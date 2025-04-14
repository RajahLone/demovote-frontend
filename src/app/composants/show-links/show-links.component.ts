import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { MenuComponent } from '../menu/menu.component';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';
import { ProductionItem, ProductionEnum } from '../../interfaces/production';
import { PresentationService } from '../../services/presentation.service';

@Component({ selector: 'app-show-links', imports: [FormsModule, MenuComponent], templateUrl: './show-links.component.html', styleUrl: './show-links.component.css' })

export class ShowLinksComponent implements OnInit
{

  @ViewChild('boutonLier', {static: false}) boutonLier!: ElementRef;
  @ViewChild('boutonRetirer', {static: false}) boutonRetirer!: ElementRef;
  @ViewChild('boutonAvancer', {static: false}) boutonAvancer!: ElementRef;
  @ViewChild('boutonReculer', {static: false}) boutonReculer!: ElementRef;

  numeroCategorie: number = 0;
  categorie: Categorie = new Categorie();

  numeroProduction: number = 0;
  linkedProductions: ProductionItem[] = [];
  unlinkedProductions: ProductionItem[] = [];

  constructor(
    private categorieService: CategorieService,
    private presentationService: PresentationService,
    private route: ActivatedRoute,
    private router: Router,
    private menu: MenuComponent,
    private renderer: Renderer2
  ) { }

  ngOnInit()
  {
    this.numeroCategorie = this.route.snapshot.params['numeroCategorie'];
    this.categorie = new Categorie();
    this.categorieService.getByIdCategorie(this.numeroCategorie).subscribe( data => { this.categorie = data; });

    this.retreiveDatas();
  }

  private retreiveDatas()
  {
    this.presentationService.getLinkedProductions(this.numeroCategorie).subscribe(data => { this.linkedProductions = data; });
    this.presentationService.getUnlinkedProductions().subscribe(data => { this.unlinkedProductions = data; });
  }

  goToListPresentations() { this.router.navigate(['/show-list'], { queryParams: { 'refresh': this.menu.getRandomInteger(1, 100000) } }); }

  changeEtatBoutonsUnlinked(event: any)
  {
    this.numeroProduction = event.target.value;

    var b: boolean = (this.numeroProduction != 0);

    if (this.boutonLier) { if (b) { this.renderer.removeClass(this.boutonLier.nativeElement, 'disabled'); } else { this.renderer.addClass(this.boutonLier.nativeElement, 'disabled'); } }
  }

  changeEtatBoutonsLinked(event: any)
  {
    this.numeroProduction = -event.target.value;

    var b: boolean = (this.numeroProduction != 0);

    if (this.boutonRetirer) { if (b) { this.renderer.removeClass(this.boutonRetirer.nativeElement, 'disabled'); } else { this.renderer.addClass(this.boutonRetirer.nativeElement, 'disabled'); } }
    if (this.boutonAvancer) { if (b) { this.renderer.removeClass(this.boutonAvancer.nativeElement, 'disabled'); } else { this.renderer.addClass(this.boutonAvancer.nativeElement, 'disabled'); } }
    if (this.boutonReculer) { if (b) { this.renderer.removeClass(this.boutonReculer.nativeElement, 'disabled'); } else { this.renderer.addClass(this.boutonReculer.nativeElement, 'disabled'); } }
  }

  lierProduction() { if (this.numeroProduction > 0) { this.presentationService.lierProduction(this.numeroCategorie, this.numeroProduction).subscribe(() => { this.retreiveDatas(); }); } }

  retirerProduction() { if (this.numeroProduction < 0) { this.presentationService.retirerProduction(this.numeroCategorie, this.numeroProduction).subscribe(() => { this.retreiveDatas(); }); } }

  avancerProduction() { if (this.numeroProduction < 0) { this.presentationService.avancerProduction(this.numeroCategorie, this.numeroProduction).subscribe(() => { this.retreiveDatas(); }); } }

  reculerProduction() { if (this.numeroProduction < 0) { this.presentationService.reculerProduction(this.numeroCategorie, this.numeroProduction).subscribe(() => { this.retreiveDatas(); }); } }

}
