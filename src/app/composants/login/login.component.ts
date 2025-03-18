import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';  
import { AppComponent } from '../../app.component';
import { User } from '../../interfaces/user';  
import { AccountService } from '../../services/account.service' 
import { FormsModule, NgForm, NgModel } from '@angular/forms'; 

@Component({ selector: 'app-login', imports: [FormsModule], templateUrl: './login.component.html', styleUrl: './login.component.css' })

export class LoginComponent implements OnInit, AfterViewInit
{

  @ViewChild('formRef') loginForm!: NgForm;
  @ViewChild('userRef') userField!: NgModel; @ViewChild('userid', {static: false}) userFieldf!: ElementRef;
  @ViewChild('passRef') passField!: NgModel;

  identifiants: User = new User();
 
  constructor(private router : Router, private accountService : AccountService, private application: AppComponent) { }
  
  ngOnInit() { } 
  
  ngAfterViewInit() { this.application.menuActivateLogin(); }
 
  connexion()
  {  
    if (this.loginForm.valid) 
    {
      this.accountService.signIn(this.identifiants).subscribe(data => { this.identifiants = data; if (this.identifiants.username === "") { this.userFieldf.nativeElement.focus(); } }); 
      // if ok then this.router.navigate(['/']);  
    }
  } 
  
}
