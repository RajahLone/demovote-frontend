import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Variable } from '../variable';
import { VariableService } from '../variable.service';

@Component({ selector: 'app-variable-list', imports: [], templateUrl: './variable-list.component.html', styleUrl: './variable-list.component.css' })

export class VariableListComponent implements OnInit
{

  variables: Variable[] = [];

  constructor(private variableService: VariableService, private router: Router) { }

  ngOnInit(): void { this.retreiveDatas(); }

  private retreiveDatas() { this.variableService.getListVariable().subscribe(data => { this.variables = data; }); }

  formVariable(id: number) { this.router.navigate(['variable-details', id]); }
 
  updateVariable(id: number) { this.router.navigate(['variable-update', id]); }

  deleteVariable(id: number) { this.variableService.deleteVariable(id).subscribe( data => { console.log(data); this.retreiveDatas(); }) }

}
