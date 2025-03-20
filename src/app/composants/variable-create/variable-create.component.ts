import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Variable } from '../../interfaces/variable';
import { VariableService } from '../../services/variable.service';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule, NgForm, NgModel } from '@angular/forms'; 

@Component({ selector: 'app-variable-create', imports: [FormsModule, MenuComponent], templateUrl: './variable-create.component.html', styleUrl: './variable-create.component.css' })

export class VariableCreateComponent implements OnInit, AfterViewInit
{

  @ViewChild('formRef') variableForm!: NgForm;
  @ViewChild('typeRef') typeField!: NgModel;
  @ViewChild('codeRef') codeField!: NgModel;
  
  variable: Variable = new Variable();
  
  constructor(private variableService: VariableService, private router: Router) { }

  ngOnInit(): void { }
  
  ngAfterViewInit() { }

  private saveVariable() { this.variableService.createVariable(this.variable).subscribe({ next: () => { this.goToListVariable(); }, error: (err: any) => { console.log(err); }, complete: () => { } }); }

  addVariable() { if (this.variableForm.valid) { this.saveVariable(); } }

  goToListVariable() {this.router.navigate(['/variable-list'], { queryParams: { 'refresh': this.getRandomInteger(1, 100000) } }); }
  
  private getRandomInteger(min: number, max: number) { min = Math.ceil(min); max = Math.floor(max); return Math.floor(Math.random() * (max - min)) + min; }

}
