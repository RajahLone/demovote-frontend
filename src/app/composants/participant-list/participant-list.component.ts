import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faFilter, faRotate, faFlagCheckered, faFilterCircleXmark, faCircleCheck, faBed, faCircleXmark, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { MenuComponent } from '../menu/menu.component';
import { ParticipantList, ParticipantEnum, ParticipantStatutList } from '../../interfaces/participant';
import { ParticipantService } from '../../services/participant.service';
import { Journees, Pagination } from '../../interfaces/divers';
import { DiversService } from '../../services/divers.service'

@Component({ selector: 'app-participant-list', imports: [FontAwesomeModule, TooltipModule, FormsModule, MenuComponent], templateUrl: './participant-list.component.html', styleUrl: './participant-list.component.css' })

export class ParticipantListComponent implements OnInit
{
  faPlus = faPlus; faFilter = faFilter; faRotate = faRotate; faFlagCheckered = faFlagCheckered; faFilterCircleXmark = faFilterCircleXmark; faCircleCheck = faCircleCheck; faBed = faBed;
  faCircleXmark = faCircleXmark; faArrowLeft = faArrowLeft; faArrowRight = faArrowRight;

  journees: Journees = new Journees();

  listeTri: number = 0;
  nomFiltre: string = "";
  statutFiltre: number = 0;
  arriveFiltre: number = 0;

  PS: ParticipantEnum[] = ParticipantStatutList;

  pagination: Pagination = new Pagination();
  pages: number[] = [1];
  participants: ParticipantList[] = [];

  @ViewChild('boutonSetArrives', {static: false}) boutonSetArrives!: ElementRef;
  @ViewChild('listeParticipants', {static: false}) listeParticipants!: ElementRef;

  selection: Array<number> = new Array<number>();

  constructor(
    private diversService: DiversService,
    private participantService: ParticipantService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) { }

  ngOnInit()
  {
    this.journees = new Journees();
    this.diversService.getJournees().subscribe(data => { this.journees = data; });

    this.goToRefreshListParticipant();
  }

  private retreiveDatas(pageVoulue: number)
  {
    this.participantService.getPagination(this.nomFiltre, this.statutFiltre, this.arriveFiltre, pageVoulue).subscribe(page =>
    {
      this.pagination = page;

      this.pages = [1];
      if (this.pagination.nombrePages > 1) { for (let i = 2; i <= this.pagination.nombrePages; i++) { this.pages.push(i); } }

      this.participantService.getListParticipant(this.nomFiltre, this.statutFiltre, this.arriveFiltre, this.listeTri, this.pagination.pageCourante, this.pagination.taillePage).subscribe(data =>
      {
         this.participants = data;
         if (this.listeParticipants) { this.listeParticipants.nativeElement.scrollTop = 0; }
      });
    });
  }

  getNombreJours(j1: boolean, j2: boolean, j3: boolean)
  {
    var nbjours: number = 0;
    if (j1) { nbjours++; }
    if (j2) { nbjours++; }
    if (j3) { nbjours++; }
  	return nbjours;
  }

  goToRefreshListParticipant() { this.retreiveDatas(this.pagination.pageCourante); }
  goToNextPage() { this.retreiveDatas(this.pagination.pageCourante + 1); }
  goToPrevPage() { this.retreiveDatas(this.pagination.pageCourante - 1); }
  goToPage(pageVoulue: number) { this.retreiveDatas(pageVoulue); }

  goToFiltrage() { this.retreiveDatas(this.pagination.pageCourante); }

  trier(event: any) { this.listeTri = event.target.value; this.retreiveDatas(this.pagination.pageCourante); }
  filtrageParNom() { this.retreiveDatas(this.pagination.pageCourante); }
  filtrageParStatut(event: any) { this.statutFiltre = event.target.value; this.retreiveDatas(this.pagination.pageCourante); }
  filtrageParArrive(event: any) { this.arriveFiltre = event.target.value; this.retreiveDatas(this.pagination.pageCourante); }
  filtrageReset() { this.nomFiltre = ""; this.statutFiltre = 0; this.arriveFiltre = 0; this.retreiveDatas(this.pagination.pageCourante); }

  goToNewParticipant() { this.router.navigate(['/participant-create']); }

  formParticipant(id: number) { this.router.navigate(['/participant-details', id]); }

  modifierSelection(event: any)
  {
    const id = event.target.id;
    if (id)
    {
      if (id.startsWith("check_"))
      {
        let nu = Number('' + id.substring(6));
        let nb = 0;

        if (this.selection.includes(nu)) { this.selection = this.selection.filter(it => it !== nu); nb = this.selection.length; } else { nb = this.selection.push(nu); }

        if (this.boutonSetArrives) { if (nb > 0) { this.renderer.removeClass(this.boutonSetArrives.nativeElement, 'disabled'); } else { this.renderer.addClass(this.boutonSetArrives.nativeElement, 'disabled'); } }
      }
    }
  }

  topperArrives() { if (this.selection.length > 0) { this.participantService.setParticipantsArrives(this.selection).subscribe(() => { this.retreiveDatas(this.pagination.pageCourante) }); } }

}
