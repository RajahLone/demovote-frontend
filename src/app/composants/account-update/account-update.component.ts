import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Participant } from '../../interfaces/participant';
import { AccountService } from '../../services/account.service' 
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({ selector: 'app-account-update', imports: [FormsModule], templateUrl: './account-update.component.html', styleUrl: './account-update.component.css' })

export class ParticipantUpdateComponent implements OnInit, AfterViewInit
{
  
  @ViewChild('formRef') participantForm!: NgForm;
 
  participant: Participant = new Participant();
  
  constructor(private accountService : AccountService, private route: ActivatedRoute, private router: Router, private application: AppComponent) { }

  ngOnInit(): void 
  {
    this.accountService.getProfil().subscribe(data => { this.participant = data; });
  }
  
  ngAfterViewInit() { this.application.menuActivateUsers(); }

  updateConfirmed() { if (this.participantForm.valid) { this.accountService.updateProfil(this.participant).subscribe(() => { this.goToHome(); }); } }

  goToHome(){ this.router.navigate(['/'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
