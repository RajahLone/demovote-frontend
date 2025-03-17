import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { Router } from '@angular/router';  
import { AccountService } from './services/account.service';  
import { TooltipModule } from 'ngx-bootstrap/tooltip'; 

@Component({ selector: 'app-root', imports: [RouterOutlet, FormsModule, TooltipModule], templateUrl: './app.component.html', styleUrl: './app.component.css' })

export class AppComponent implements OnInit 
{
  title = 'demovote';

  logged: boolean = false;

  @ViewChild('menu_home', {static: false}) menuItemHome!: ElementRef;
  @ViewChild('menu_login', {static: false}) menuItemLogin!: ElementRef;
  @ViewChild('menu_account', {static: false}) menuItemAccount!: ElementRef;
  @ViewChild('menu_logout', {static: false}) menuItemLogout!: ElementRef;
  @ViewChild('menu_agenda', {static: false}) menuItemAgenda!: ElementRef;
  @ViewChild('menu_webcams', {static: false}) menuItemWebcams!: ElementRef;
  @ViewChild('menu_chat', {static: false}) menuItemChat!: ElementRef;
  @ViewChild('menu_users', {static: false}) menuItemUsers!: ElementRef;
  @ViewChild('menu_compos', {static: false}) menuItemCompos!: ElementRef;
  @ViewChild('menu_prods', {static: false}) menuItemProds!: ElementRef;
  @ViewChild('menu_shows', {static: false}) menuItemShows!: ElementRef;
  @ViewChild('menu_votes', {static: false}) menuItemVotes!: ElementRef;
  @ViewChild('menu_results', {static: false}) menuItemResults!: ElementRef;
  @ViewChild('menu_params', {static: false}) menuItemParams!: ElementRef;

  constructor(private router: Router, private accountService: AccountService, private renderer: Renderer2) { }  
  
  ngOnInit() 
  { 
    this.logged = this.accountService.isLogged(); 
  }
  
  logout() 
  {  
    this.accountService.logout();  
    this.router.navigate(['/']);  
  } 
  
  menuActivateHome(): void { this.renderer.addClass(this.menuItemHome.nativeElement, "active"); }
  menuActivateLogin(): void { this.renderer.addClass(this.menuItemLogin.nativeElement, "active"); } 
  menuActivateAccount(): void { this.renderer.addClass(this.menuItemAccount.nativeElement, "active"); }
  menuActivateLogout(): void { this.renderer.addClass(this.menuItemLogout.nativeElement, "active"); }
  menuActivateAgenda(): void { this.renderer.addClass(this.menuItemAgenda.nativeElement, "active"); }
  menuActivateWebcams(): void { this.renderer.addClass(this.menuItemWebcams.nativeElement, "active"); }
  menuActivateChat(): void { this.renderer.addClass(this.menuItemChat.nativeElement, "active"); }
  menuActivateUsers(): void { this.renderer.addClass(this.menuItemUsers.nativeElement, "active"); }
  menuActivateCompos(): void { this.renderer.addClass(this.menuItemCompos.nativeElement, "active"); }
  menuActivateProds(): void { this.renderer.addClass(this.menuItemProds.nativeElement, "active"); }
  menuActivateShows(): void { this.renderer.addClass(this.menuItemShows.nativeElement, "active"); }
  menuActivateVotes(): void { this.renderer.addClass(this.menuItemVotes.nativeElement, "active"); }
  menuActivateResults(): void { this.renderer.addClass(this.menuItemResults.nativeElement, "active"); }
  menuActivateParams(): void { this.renderer.addClass(this.menuItemParams.nativeElement, "active"); }
  
}

