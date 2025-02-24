import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Variable } from '../variable';
import { VariableService } from '../variable.service';
import { FormsModule } from '@angular/forms'; 

@Component({ selector: 'app-variable-update', imports: [FormsModule], templateUrl: './variable-update.component.html', styleUrl: './variable-update.component.css' })

export class VariableUpdateComponent implements OnInit
{
  
  numeroVariable: number = 0;
  
  variable: Variable = new Variable();
  
  constructor(private variableService: VariableService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void 
  {
    this.numeroVariable = this.route.snapshot.params['numeroVariable'];
    this.variableService.getByIdVariable(this.numeroVariable).subscribe(data => { this.variable = data; }, error => console.log(error));
  }

  updateConfirmed(id: number) { this.variableService.updateVariable(this.numeroVariable, this.variable).subscribe(data => { this.goToListVariable(); }, error => console.log(error)); }

  deleteConfirmed(id: number) { this.variableService.deleteVariable(id).subscribe(data => { console.log(data); }, error => console.log(error)); this.goToListVariable(); }

  goToListVariable(){ this.router.navigate(['/variable-list']); }

}
