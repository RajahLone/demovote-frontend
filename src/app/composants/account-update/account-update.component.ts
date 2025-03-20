import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { Participant } from '../../interfaces/participant';
import { AccountService } from '../../services/account.service' 
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({ selector: 'app-account-update', imports: [FormsModule, MenuComponent], templateUrl: './account-update.component.html', styleUrl: './account-update.component.css' })

export class AccountUpdateComponent implements OnInit, AfterViewInit
{
  
  @ViewChild('formRef') participantForm!: NgForm;
 
  participant: Participant = new Participant();
  
  constructor(private accountService : AccountService, private router: Router) { }

  ngOnInit() { this.accountService.getProfil().subscribe(data => { this.participant = data; }); }
  
  ngAfterViewInit() { }

  updateConfirmed() { if (this.participantForm.valid) { this.accountService.updateProfil(this.participant).subscribe(() => { this.goToHome(); }); } }

  goToHome(){ this.router.navigate(['/'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
