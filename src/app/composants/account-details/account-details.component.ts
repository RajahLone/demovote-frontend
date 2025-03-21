import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { Participant } from '../../interfaces/participant';
import { AccountService } from '../../services/account.service' 
import { FormsModule } from '@angular/forms'; 

@Component({ selector: 'app-account-details', imports: [FormsModule, MenuComponent], templateUrl: './account-details.component.html', styleUrl: './account-details.component.css' })

export class AccountDetailsComponent implements OnInit, AfterViewInit 
{
 
  participant: Participant = new Participant();
  
  constructor(private accountService : AccountService, private router: Router, private menu: MenuComponent) { }

  ngOnInit() 
  {
    this.participant = new Participant();
    this.accountService.getProfil().subscribe( data => { this.participant = data; });
  }
  
  ngAfterViewInit() { }
 
  updateProfil() { this.router.navigate(['/account-update']); }
  
  goToHome(){ this.router.navigate(['/'], { queryParams: { 'refresh': this.menu.getRandomInteger(1, 100000) } }); }

}
