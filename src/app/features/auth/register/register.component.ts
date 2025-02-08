import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators}from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor() {}
  alreadyexisting!: string;
  isLoading: boolean = false;
  authService = inject(AuthService);
  router = inject(Router);

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,10}$/),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,10}$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?:\+20|0)?1[0-25]\d{8}$/),
      ]),
    },
    this.passwordConfirm
  );

  passwordConfirm(H: AbstractControl): any {
    if (H.get('password')?.value !== H.get('rePassword')?.value) {
      return { mismatch: true };
    } else {
      return null;
    }
  }

  register(): void {
    this.isLoading = true;
    if (this.registerForm.valid) {
      // console.log(this.registerForm.value);
      this.authService.sendRegistertoApi(this.registerForm.value).subscribe({
        next: (data) => {
          console.log('success data', data);
          this.isLoading = false;
          this.alreadyexisting = data.message;
          if(data.message=='success') {
            
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.log('error', error.error.message);
          this.isLoading = false;
          this.alreadyexisting = error.error.message;
        },
        complete: () => {
          console.log('done success data');
        },
      });
    } else {
      console.log('بطل لعب يلا');
    }
  }
}
