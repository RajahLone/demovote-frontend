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

  saveVariable() { this.variableService.createVariable(this.variable).subscribe({
        next: (params) => { console.log('params', params); this.goToListVariable(); },
        error: (err: any) => { console.log(err); },
        complete: () => { }
      }); }

  onSubmit(){ console.log(this.variable); this.saveVariable(); }

  goToListVariable() {this.router.navigate(['/variable-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }
  
  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
