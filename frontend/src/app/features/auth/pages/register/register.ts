import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

type AccountType = 'candidate' | 'company';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
})
export class Register {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly accountType = signal<AccountType>('candidate');
  readonly notice = signal('');

  readonly registerForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
    companyName: new FormControl('', { nonNullable: true }),
    contactName: new FormControl('', { nonNullable: true }),
    companySize: new FormControl('', { nonNullable: true }),
    country: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    acceptTerms: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  constructor() {
    const type = this.route.snapshot.queryParamMap.get('type');
    this.setAccountType(type === 'company' ? 'company' : 'candidate');
  }

  setAccountType(type: AccountType): void {
    this.accountType.set(type);
    this.notice.set('');

    const { firstName, lastName, companyName, contactName, companySize } =
      this.registerForm.controls;

    firstName.clearValidators();
    lastName.clearValidators();
    companyName.clearValidators();
    contactName.clearValidators();
    companySize.clearValidators();

    if (type === 'candidate') {
      firstName.setValidators([Validators.required]);
      lastName.setValidators([Validators.required]);
    } else {
      companyName.setValidators([Validators.required]);
      contactName.setValidators([Validators.required]);
      companySize.setValidators([Validators.required]);
    }

    firstName.updateValueAndValidity();
    lastName.updateValueAndValidity();
    companyName.updateValueAndValidity();
    contactName.updateValueAndValidity();
    companySize.updateValueAndValidity();
  }

  submitRegistration(): void {
  this.registerForm.markAllAsTouched();

  if (this.registerForm.invalid) {
    this.notice.set(
      'Completa los campos obligatorios, revisa el correo y la contraseña, y acepta los términos.',
    );
    return;
  }

  this.notice.set('');

  const destination =
    this.accountType() === 'candidate' ? '/candidate' : '/recruiter';

  void this.router.navigateByUrl(destination);
}
}