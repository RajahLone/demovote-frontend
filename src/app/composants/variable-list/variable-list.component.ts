import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { Variable, VariableType } from '../../interfaces/variable';
import { VariableService } from '../../services/variable.service';

@Component({ selector: 'app-variable-list', imports: [MenuComponent], templateUrl: './variable-list.component.html', styleUrl: './variable-list.component.css' })

export class VariableListComponent implements OnInit, AfterViewInit
{
  
  types: VariableType[] = [];
  
  variables: Variable[] = [];

  constructor(private variableService: VariableService, private router: Router) { }

  ngOnInit(): void { this.retreiveDatas(); this.retreiveParticipants(); }
  
  ngAfterViewInit() { }

  private retreiveDatas() { this.variableService.getListVariable().subscribe(data => { this.variables = data; }); }
  private retreiveParticipants() { this.variableService.getOptionListVariableType().subscribe(data => { this.types = data; }); }

  filtrageParType(event: any) { this.router.navigate(['/variable-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000), 'type': event.target.value } }); }
  
  goToRefreshListVariable(){ this.router.navigate(['/variable-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

  goToNewVariable(){ this.router.navigate(['/variable-create']); }

  formVariable(id: number) { this.router.navigate(['/variable-details', id]); }

}
