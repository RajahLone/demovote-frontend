import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { MenuComponent } from '../menu/menu.component';
import { Participant } from '../../interfaces/participant';
import { AccountService } from '../../services/account.service'
import { Journees } from '../../interfaces/divers';
import { DiversService } from '../../services/divers.service'

@Component({ selector: 'app-account-update', imports: [FormsModule, MenuComponent], templateUrl: './account-update.component.html', styleUrl: './account-update.component.css' })

export class AccountUpdateComponent implements OnInit, AfterViewInit
{

  @ViewChild('formRef') participantForm!: NgForm;

  journees: Journees = new Journees();

  participant: Participant = new Participant();

  constructor(private diversService: DiversService, private accountService : AccountService, private router: Router, private menu: MenuComponent) { }

  ngOnInit()
  {
    this.journees = new Journees();
    this.diversService.getJournees().subscribe(data => { this.journees = data; });

    this.participant = new Participant();
    this.accountService.getProfil().subscribe(data => { this.participant = data; });
  }

  ngAfterViewInit() { }

  updateConfirmed() { if (this.participantForm.valid) { this.accountService.updateProfil(this.participant).subscribe(); this.goToHome(); } }

  goToHome(){ this.router.navigate(['/'], { queryParams: { 'refresh': this.menu.getRandomInteger(1, 100000) } }); }

}
