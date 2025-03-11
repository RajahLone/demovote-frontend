import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Variable } from '../../interfaces/variable';
import { VariableService } from '../../services/variable.service';
import { FormsModule } from '@angular/forms'; 

@Component({ selector: 'app-variable-details', imports: [FormsModule], templateUrl: './variable-details.component.html', styleUrl: './variable-details.component.css' })

export class VariableDetailsComponent implements OnInit, AfterViewInit
{

  numeroVariable: number = 0;

  variable: Variable = new Variable();
  
  constructor(private variableService: VariableService, private route: ActivatedRoute, private router: Router, private application: AppComponent) { }

  ngOnInit(): void 
  {
    this.numeroVariable = this.route.snapshot.params['numeroVariable'];
    this.variable = new Variable();
    this.variableService.getByIdVariable(this.numeroVariable).subscribe( data => { this.variable = data; });
  }
  
  ngAfterViewInit() { this.application.menuActivateParams(); }
 
  updateVariable(id: number) { this.router.navigate(['/variable-update', id]); }
  
  goToListVariable(){ this.router.navigate(['/variable-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
