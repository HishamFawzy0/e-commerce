import { Component } from '@angular/core';
import{FormControl, FormGroup, ReactiveFormsModule, Validators}from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,10]$/),
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,10]$/),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(01)[0125][0-9]{8}$/),
    ]),
  });

  register(): void {
    console.log(this.registerForm);
  }
}
