import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Variable } from '../variable';
import { VariableService } from '../variable.service';

@Component({ selector: 'app-variable-list', imports: [], templateUrl: './variable-list.component.html', styleUrl: './variable-list.component.css' })

export class VariableListComponent implements OnInit
{
  
  types = new Set();
  
  variables: Variable[] = [];

  constructor(private variableService: VariableService, private router: Router) { }

  ngOnInit(): void { this.retreiveDatas(); }

  private retreiveDatas() 
  { 
    this.variableService.getListVariable().subscribe(data => {
      this.variables = data; 
      
      data.forEach((element: any) => { if (!this.types.has(element.type)) { this.types.add(element.type); } });
    });
  }

  formVariable(id: number) { this.router.navigate(['/variable-details', id]); }
 
  goToListVariable(){ this.router.navigate(['/variable-list']); }

  goToNewVariable(){ this.router.navigate(['/variable-create']); }

}
