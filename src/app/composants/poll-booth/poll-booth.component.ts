import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faCheck, faArrowLeft, faArrowRight, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import { MenuComponent } from '../menu/menu.component';
import { Categorie } from '../../interfaces/categorie';
import { CategorieService } from '../../services/categorie.service';
import { ProductionChoice, ProductionEnum, ProductionTypeList } from '../../interfaces/production';
import { BulletinService } from '../../services/bulletin.service';

@Component({ selector: 'app-poll-booth', imports: [FontAwesomeModule, FormsModule, MenuComponent], templateUrl: './poll-booth.component.html', styleUrl: './poll-booth.component.css' })

export class PollBoothComponent  implements OnInit
{
  faXmark = faXmark; faCheck = faCheck; faArrowLeft = faArrowLeft; faArrowRight = faArrowRight; faArrowUp = faArrowUp; faArrowDown = faArrowDown;

  @ViewChild('boutonChoisir', {static: false}) boutonChoisir!: ElementRef;
  @ViewChild('boutonEcarter', {static: false}) boutonEcarter!: ElementRef;
  @ViewChild('boutonAvancer', {static: false}) boutonAvancer!: ElementRef;
  @ViewChild('boutonReculer', {static: false}) boutonReculer!: ElementRef;

  @ViewChild('selecteurChoisis', {static: false}) selecteurChoisis!: ElementRef;
  @ViewChild('selecteurProposes', {static: false}) selecteurProposes!: ElementRef;

  numeroCategorie: number = 0;
  categorie: Categorie = new Categorie();

  types: ProductionEnum[] = ProductionTypeList;

  numeroProductionChoisie: number = 0;
  chosenProductions: ProductionChoice[] = [];

  numeroProductionPropose: number = 0;
  linkedProductions: ProductionChoice[] = [];

  nombreChoixRestant: number = 0;

  constructor(
    private categorieService: CategorieService,
    private bulletinService: BulletinService,
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
    this.resetEtatBoutonsDiscarded();
    this.resetEtatBoutonsChosen();
  }

  private retreiveDatas() { this.bulletinService.getRemainingChoices(this.numeroCategorie).subscribe(ret => { this.nombreChoixRestant = Number('' + ret); this.retreiveDatas1(); }); }
  private retreiveDatas1() { this.bulletinService.getChosenProductions(this.numeroCategorie).subscribe(data => { this.chosenProductions = data; this.retreiveDatas2(); }); }
  private retreiveDatas2() { this.bulletinService.getLinkedProductions(this.numeroCategorie).subscribe(data => { this.linkedProductions = data; this.resetSelections(); }); }
  private resetSelections() { if (this.selecteurProposes) { this.selecteurProposes.nativeElement.selectedIndex = -1; } }

  indexChiffre: number = 0;

  resetChiffre() { this.indexChiffre = 0; }
  nextChiffre(): string { if (this.indexChiffre >= 0) { this.indexChiffre++; return "#" + (this.indexChiffre);  } return ""; }

  lettresOrdre: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  indexLettre: number = 0;

  resetLettre() { this.indexLettre = 0; }
  nextLettre(): string { if ((this.indexLettre >= 0) && (this.indexLettre < 26)) { this.indexLettre++; return "#" + this.lettresOrdre[this.indexLettre - 1];  } return ""; }

  dejaChoisi(id: number): boolean { if (this.chosenProductions.length > 0) { for (let i = 0; i < this.chosenProductions.length; i++) { if (this.chosenProductions[i].numeroProduction == id) { return true; } } } return false; }

  goToListVotes() { this.router.navigate(['/poll-list']); }

  changeEtatBoutonsDiscarded(event: any)
  {
    if (this.nombreChoixRestant == -1) { this.resetEtatBoutonsDiscarded(); return; }

    this.numeroProductionPropose = event.target.value;

    var b: boolean = (this.numeroProductionPropose == 0);

    if (this.boutonChoisir) { if (b) { this.renderer.addClass(this.boutonChoisir.nativeElement, 'disabled'); } else { this.renderer.removeClass(this.boutonChoisir.nativeElement, 'disabled'); } }
  }
  resetEtatBoutonsDiscarded()
  {
    if (this.boutonChoisir) { this.renderer.addClass(this.boutonChoisir.nativeElement, 'disabled'); }
    this.numeroProductionPropose = 0;
  }

  changeEtatBoutonsChosen(event: any)
  {
    if (this.nombreChoixRestant == -1) { this.resetEtatBoutonsChosen(); return; }

    this.numeroProductionChoisie = event.target.value;

    var b: boolean = (this.numeroProductionChoisie == 0);

    if (this.boutonEcarter) { if (b) { this.renderer.addClass(this.boutonEcarter.nativeElement, 'disabled'); } else { this.renderer.removeClass(this.boutonEcarter.nativeElement, 'disabled'); } }
    if (this.boutonAvancer) { if (b) { this.renderer.addClass(this.boutonAvancer.nativeElement, 'disabled'); } else { this.renderer.removeClass(this.boutonAvancer.nativeElement, 'disabled'); } }
    if (this.boutonReculer) { if (b) { this.renderer.addClass(this.boutonReculer.nativeElement, 'disabled'); } else { this.renderer.removeClass(this.boutonReculer.nativeElement, 'disabled'); } }
  }
  resetEtatBoutonsChosen()
  {
    if (this.boutonEcarter) { this.renderer.addClass(this.boutonEcarter.nativeElement, 'disabled'); }
    if (this.boutonAvancer) { this.renderer.addClass(this.boutonAvancer.nativeElement, 'disabled'); }
    if (this.boutonReculer) { this.renderer.addClass(this.boutonReculer.nativeElement, 'disabled'); }
    this.numeroProductionChoisie = 0;
  }

  choisirProduction() { if (this.numeroProductionPropose > 0) { this.bulletinService.choisirProduction(this.numeroCategorie, this.numeroProductionPropose).subscribe(() => { this.retreiveDatas(); this.resetEtatBoutonsDiscarded(); }); } }

  ecarterProduction() { if (this.numeroProductionChoisie > 0) { this.bulletinService.ecarterProduction(this.numeroCategorie, this.numeroProductionChoisie).subscribe(() => { this.retreiveDatas(); this.resetEtatBoutonsChosen(); }); } }

  avancerProduction() { if (this.numeroProductionChoisie > 0) { this.bulletinService.avancerProduction(this.numeroCategorie, this.numeroProductionChoisie).subscribe(() => { this.retreiveDatas(); }); } }

  reculerProduction() { if (this.numeroProductionChoisie > 0) { this.bulletinService.reculerProduction(this.numeroCategorie, this.numeroProductionChoisie).subscribe(() => { this.retreiveDatas(); }); } }

  validerVote() { if (this.linkedProductions.length > 0) { this.bulletinService.validateChoices(this.numeroCategorie).subscribe(msg => { if (msg.information) { this.retreiveDatas(); } }); } }

}
