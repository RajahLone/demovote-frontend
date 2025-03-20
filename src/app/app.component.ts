import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountService } from './services/account.service';  

@Component({ selector: 'app-root', imports: [RouterOutlet], templateUrl: './app.component.html', styleUrl: './app.component.css' })

export class AppComponent implements OnInit 
{
  title = 'demovote';

  logged: boolean = false;

  constructor(private accountService: AccountService) { }  
  
  ngOnInit() 
  { 
    this.logged = this.accountService.isLogged(); 
  }
  
}

