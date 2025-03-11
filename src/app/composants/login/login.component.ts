import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';  
import { AppComponent } from '../../app.component';
import { Login } from '../../interfaces/login';  
import { AuthService } from '../../services/auth.service' 
import { FormsModule, NgForm, NgModel } from '@angular/forms'; 

@Component({ selector: 'app-login', imports: [FormsModule], templateUrl: './login.component.html', styleUrl: './login.component.css' })

export class LoginComponent implements OnInit, AfterViewInit
{

  @ViewChild('formRef') loginForm!: NgForm;
  @ViewChild('userRef') userField!: NgModel;
  @ViewChild('passRef') passField!: NgModel;

  identifiants: Login = { userid: "", userpwd: "" }
 
  constructor(private router : Router, private authService : AuthService, private application: AppComponent) { }
  
  ngOnInit() { this.authService.deconnexion(); } 
  
  ngAfterViewInit() { this.application.menuActivateLogin(); }
 
  connexion()
  {  
    if (this.loginForm.valid) 
    {
      this.authService.connexion(this.identifiants);  
      
      localStorage.setItem('isConnecte', "true");  
      localStorage.setItem('token', "from_API_javaspring");  
      
      this.router.navigate(['/']);  
    }
  } 
  
}
