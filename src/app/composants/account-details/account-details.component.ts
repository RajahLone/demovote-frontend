import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from '../menu/menu.component';
import { Participant } from '../../interfaces/participant';
import { AccountService } from '../../services/account.service'
import { Journees } from '../../interfaces/divers';
import { DiversService } from '../../services/divers.service'

@Component({ selector: 'app-account-details', imports: [FormsModule, MenuComponent], templateUrl: './account-details.component.html', styleUrl: './account-details.component.css' })

export class AccountDetailsComponent implements OnInit, AfterViewInit
{

  journees: Journees = new Journees();

  participant: Participant = new Participant();

  constructor(private diversService: DiversService, private accountService : AccountService, private router: Router, private menu: MenuComponent) { }

  ngOnInit()
  {
    this.journees = new Journees();
    this.diversService.getJournees().subscribe(data => { this.journees = data; });

    this.participant = new Participant();
    this.accountService.getProfil().subscribe( data => { this.participant = data; });
  }

  ngAfterViewInit() { }

  updateProfil() { this.router.navigate(['/account-update']); }

  goToHome(){ this.router.navigate(['/'], { queryParams: { 'refresh': this.menu.getRandomInteger(1, 100000) } }); }

}
