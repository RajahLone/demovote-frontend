import { Component, OnInit } from '@angular/core';
import { Variable } from '../variable';
import { VariableService } from '../variable.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({ selector: 'app-variable-create', imports: [FormsModule], templateUrl: './variable-create.component.html', styleUrl: './variable-create.component.css' })

export class VariableCreateComponent implements OnInit
{

  variable: Variable = new Variable();
  
  constructor(private variableService: VariableService, private router: Router) { }

  ngOnInit(): void { }

  saveVariable() { this.variableService.createVariable(this.variable).subscribe( data => { console.log(data); this.goToListVariable(); }, error => console.log(error)); }

  goToListVariable() {this.router.navigate(['/variable-list']); }
  
  onSubmit(){ console.log(this.variable); this.saveVariable(); }

}
