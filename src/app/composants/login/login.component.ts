import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

import { MenuComponent } from '../menu/menu.component';
import { AccountService } from '../../services/account.service'
import { User } from '../../interfaces/user';
import { Journees } from '../../interfaces/divers';

@Component({ selector: 'app-login', imports: [FormsModule, MenuComponent], templateUrl: './login.component.html', styleUrl: './login.component.css' })

export class LoginComponent implements OnInit, AfterViewInit
{

  hello: Journees = new Journees();

  @ViewChild('formRef') loginForm!: NgForm;
  @ViewChild('userRef') userField!: NgModel; @ViewChild('userid', {static: false}) userFieldf!: ElementRef;
  @ViewChild('passRef') passField!: NgModel;

  identifiants: User = new User();

  constructor(private router : Router, private accountService : AccountService) { }

  ngOnInit()
  {
    this.hello = new Journees();
    this.accountService.salute().subscribe(data => { this.hello = data; });
  }

  ngAfterViewInit() { }

  connexion()
  {
    if (this.loginForm.valid)
    {
      this.accountService.signIn(this.identifiants).subscribe(data => { this.identifiants = data; if (this.identifiants.username === "") { this.userFieldf.nativeElement.focus(); } else if (this.identifiants.password === "<success@auth>") { this.router.navigate(['/']); } });
    }
  }

}
