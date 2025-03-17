import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';  
import { AppComponent } from '../../app.component';
import { User } from '../../interfaces/user';  
import { AccountService } from '../../services/account.service' 
import { FormsModule, NgForm, NgModel } from '@angular/forms'; 

@Component({ selector: 'app-login', imports: [FormsModule], templateUrl: './login.component.html', styleUrl: './login.component.css' })

export class LoginComponent implements OnInit, AfterViewInit
{

  @ViewChild('formRef') loginForm!: NgForm;
  @ViewChild('userRef') userField!: NgModel;
  @ViewChild('passRef') passField!: NgModel;

  identifiants: User = new User();
 
  constructor(private router : Router, private accountService : AccountService, private application: AppComponent) { }
  
  ngOnInit() { } 
  
  ngAfterViewInit() { this.application.menuActivateLogin(); }
 
  connexion()
  {  
    if (this.loginForm.valid) 
    {
      console.log(this.accountService.login(this.identifiants));
      // if then this.router.navigate(['/']);  
    }
  } 
  
}
