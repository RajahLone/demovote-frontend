import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Variable } from '../variable';
import { VariableService } from '../variable.service';
import { FormsModule } from '@angular/forms'; 

@Component({ selector: 'app-variable-details', imports: [FormsModule], templateUrl: './variable-details.component.html', styleUrl: './variable-details.component.css' })

export class VariableDetailsComponent implements OnInit 
{

  numeroVariable: number = 0;

  variable: Variable = new Variable();
  
  constructor(private variableService: VariableService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void 
  {
    this.numeroVariable = this.route.snapshot.params['numeroVariable'];
    this.variable = new Variable();
    this.variableService.getByIdVariable(this.numeroVariable).subscribe( data => { this.variable = data; });
  }
 
  updateVariable(id: number) { this.router.navigate(['/variable-update', id]); }
  
  goToListVariable(){ this.router.navigate(['/variable-list']); }

}
