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
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly accountType = signal<AccountType>('candidate');
  readonly notice = signal('');

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {
    const type = this.route.snapshot.queryParamMap.get('type');
    this.selectAccountType(type === 'company' ? 'company' : 'candidate');
  }

  selectAccountType(type: AccountType): void {
    this.accountType.set(type);
    this.notice.set('');
  }

  submitLogin(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    const destination =
  this.accountType() === 'candidate' ? '/candidate' : '/recruiter';

void this.router.navigateByUrl(destination);
  }

  continueWith(provider: 'Google' | 'LinkedIn'): void {
    this.notice.set(
      `El acceso con ${provider} quedará disponible al configurar OAuth.`,
    );
  }
}