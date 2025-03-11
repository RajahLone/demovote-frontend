import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { Variable, VariableType } from '../../interfaces/variable';
import { VariableService } from '../../services/variable.service';

@Component({ selector: 'app-variable-list', imports: [], templateUrl: './variable-list.component.html', styleUrl: './variable-list.component.css' })

export class VariableListComponent implements OnInit, AfterViewInit
{
  
  types: VariableType[] = [];
  
  variables: Variable[] = [];

  constructor(private variableService: VariableService, private router: Router, private application: AppComponent) { }

  ngOnInit(): void { this.retreiveDatas(); this.retreiveParticipants(); }
  
  ngAfterViewInit() { this.application.menuActivateParams(); }

  private retreiveDatas() { this.variableService.getListVariable().subscribe(data => { this.variables = data; }); }
  private retreiveParticipants() { this.variableService.getOptionListVariableType().subscribe(data => { this.types = data; }); }

  filtrageParType(event: any) { this.router.navigate(['/variable-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000), 'type': event.target.value } }); }
  
  goToRefreshListVariable(){ this.router.navigate(['/variable-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

  goToNewVariable(){ this.router.navigate(['/variable-create']); }

  formVariable(id: number) { this.router.navigate(['/variable-details', id]); }

}
