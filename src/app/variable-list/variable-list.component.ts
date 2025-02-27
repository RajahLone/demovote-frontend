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

  goToRefreshListVariable(){ this.router.navigate(['/variable-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

  goToNewVariable(){ this.router.navigate(['/variable-create']); }

  formVariable(id: number) { this.router.navigate(['/variable-details', id]); }

}
