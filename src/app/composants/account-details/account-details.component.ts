import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Participant } from '../../interfaces/participant';
import { AccountService } from '../../services/account.service' 
import { FormsModule } from '@angular/forms'; 

@Component({ selector: 'app-account-details', imports: [FormsModule], templateUrl: './account-details.component.html', styleUrl: './account-details.component.css' })

export class ParticipantDetailsComponent implements OnInit, AfterViewInit 
{
 
  participant: Participant = new Participant();
  
  constructor(private accountService : AccountService, private route: ActivatedRoute, private router: Router, private application: AppComponent) { }

  ngOnInit(): void 
  {
    this.participant = new Participant();
    this.accountService.getProfil().subscribe( data => { this.participant = data; });
  }
  
  ngAfterViewInit() { this.application.menuActivateUsers(); }
 
  updateProfil() { this.router.navigate(['/account-update']); }
  
  goToHome(){ this.router.navigate(['/'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
