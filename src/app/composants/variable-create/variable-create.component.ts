import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Variable } from '../../interfaces/variable';
import { VariableService } from '../../services/variable.service';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({ selector: 'app-variable-create', imports: [FormsModule, MenuComponent], templateUrl: './variable-create.component.html', styleUrl: './variable-create.component.css' })

export class VariableCreateComponent implements OnInit
{

  @ViewChild('formRef') variableForm!: NgForm;
  @ViewChild('typeRef') typeField!: NgModel;
  @ViewChild('codeRef') codeField!: NgModel;

  variable: Variable = new Variable();

  constructor(private variableService: VariableService, private router: Router, private menu: MenuComponent) { }

  ngOnInit() { }

  private saveVariable() { this.variableService.createVariable(this.variable).subscribe(() => { this.goToListVariable(); }); }

  addVariable() { if (this.variableForm.valid) { this.saveVariable(); } }

  goToListVariable() { this.router.navigate(['/variable-list', this.menu.getRandomInteger(1, 100000)]); }

}
