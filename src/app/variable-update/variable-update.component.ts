import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Variable } from '../variable';
import { VariableService } from '../variable.service';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({ selector: 'app-variable-update', imports: [FormsModule], templateUrl: './variable-update.component.html', styleUrl: './variable-update.component.css' })

export class VariableUpdateComponent implements OnInit
{

  @ViewChild('formRef') variableForm!: NgForm;

  numeroVariable: number = 0;
  
  variable: Variable = new Variable();
  
  constructor(private variableService: VariableService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void 
  {
    this.numeroVariable = this.route.snapshot.params['numeroVariable'];
    this.variableService.getByIdVariable(this.numeroVariable).subscribe(data => { this.variable = data; });
  }

  updateConfirmed() { if (this.variableForm.valid) { this.variableService.updateVariable(this.numeroVariable, this.variable).subscribe(() => { this.goToListVariable(); }); } }

  deleteConfirmed() { this.variableService.deleteVariable(this.numeroVariable).subscribe(() => { this.goToListVariable(); }); }

  goToListVariable(){ this.router.navigate(['/variable-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }

  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
