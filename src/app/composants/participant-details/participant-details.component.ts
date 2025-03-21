import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { Participant, ParticipantEnum, ParticipantStatutList, ParticipantModePaiementList } from '../../interfaces/participant';
import { ParticipantService } from '../../services/participant.service';
import { FormsModule } from '@angular/forms'; 

@Component({ selector: 'app-participant-details', imports: [FormsModule, MenuComponent], templateUrl: './participant-details.component.html', styleUrl: './participant-details.component.css' })

export class ParticipantDetailsComponent implements OnInit, AfterViewInit 
{
  
  PS: ParticipantEnum[] = ParticipantStatutList;
  PMP: ParticipantEnum[] = ParticipantModePaiementList;
 
  numeroParticipant: number = 0;

  participant: Participant = new Participant();
  
  constructor(private participantService: ParticipantService, private route: ActivatedRoute, private router: Router, private menu: MenuComponent) { }

  ngOnInit(): void 
  {
    this.numeroParticipant = this.route.snapshot.params['numeroParticipant'];
    this.participant = new Participant();
    this.participantService.getByIdParticipant(this.numeroParticipant).subscribe( data => { this.participant = data; });
  }
  
  ngAfterViewInit() { }
 
  updateParticipant(id: number) { this.router.navigate(['/participant-update', id]); }
  
  goToListParticipant(){ this.router.navigate(['/participant-list'], { queryParams: { 'refresh': this.menu.getRandomInteger(1, 100000) } }); }

}
