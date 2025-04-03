import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, FormBuilder, FormControl, FormGroupDirective, FormGroup, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';

import { MenuComponent } from '../menu/menu.component';
import { NewPassword } from '../../interfaces/user';
import { AccountService } from '../../services/account.service'

@Component({ selector: 'app-account-password', imports: [CommonModule, FormsModule, ReactiveFormsModule, MenuComponent], templateUrl: './account-password.component.html', styleUrl: './account-password.component.css' })

export class AccountPasswordComponent
{

  newpassword: NewPassword = new NewPassword();

  public form!: FormGroup;

  public passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,16}$/

  constructor(
    private accountService : AccountService,
    private router: Router,
    private menu: MenuComponent,
    private formbuilder: FormBuilder
  )
  {
    this.formInit();
  }
  private formInit()
  {
    this.form = this.formbuilder.group({
      nom: { value: '', disabled: true },
      prenom: { value: '', disabled: true },
      pseudonyme: { value: '', disabled: true },
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      confirmNewPassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      }, { validator: this.checkingPasswords });
  }
  public checkingPasswords(formGroup: FormGroup)
  {
    if (
        formGroup.controls['oldPassword'].value && formGroup.controls['newPassword'].value && formGroup.controls['confirmNewPassword'].value
        && formGroup.controls['newPassword'].value.length >= 8 && formGroup.controls['newPassword'].value.length <= 16
        && formGroup.controls['confirmNewPassword'].value.length >= 8 && formGroup.controls['confirmNewPassword'].value.length <= 16
        )
    {
     return formGroup.controls['newPassword'].value === formGroup.controls['confirmNewPassword'].value ? false : { "notMatched": true }
    }

    return false;
  }
  public checkValidations(index: string, type: string) {
    switch (type)
    {
      case 'special-character': return /[#$@!%&*?]/.test(this.form.controls[index].value);;
      case 'number': return /\d/.test(this.form.controls[index].value);
      case 'lowercase': return /[a-z]/.test(this.form.controls[index].value);
      case 'uppercase': return /[A-Z]/.test(this.form.controls[index].value);
      case 'length': return this.form.controls[index].value.length >= 8 && this.form.controls[index].value.length <= 16;
      default: return false
    }
  }

  ngOnInit()
  {
    this.accountService.getProfil().subscribe( data => {
      this.form.controls['nom'].setValue(data.nom);
      this.form.controls['prenom'].setValue(data.prenom);
      this.form.controls['pseudonyme'].setValue(data.pseudonyme);
      this.newpassword.username = data.pseudonyme;
    });
  }

  updatePasswordConfirmed()
  {
    this.newpassword.ancien = this.form.controls['oldPassword'].value;
    this.newpassword.nouveau = this.form.controls['newPassword'].value;

    this.accountService.updatePassword(this.newpassword).subscribe(data => { if (data.erreur !== "") { this.newpassword.erreur = data.erreur; } else if (data.nouveau === "<success@new>") { this.router.navigate(['/']); } });
  }

  goToAccountDetails() { this.router.navigate(['/account-details'], { queryParams: { 'refresh': this.menu.getRandomInteger(1, 100000) } }); }

}
