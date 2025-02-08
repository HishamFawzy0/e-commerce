import { NavbarComponent } from './../../layout/navbar/navbar.component';
import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  alreadyexisting!: string;
  isLoading: boolean = false;
  authService = inject(AuthService);
  router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,Validators.pattern(/^[A-Z][a-zA-Z0-9]{5,10}$/),]),
  });

  Login(): void {
    this.isLoading = true;
    if (this.loginForm.valid) {
      
      this.authService.sendLogintoApi(this.loginForm.value).subscribe({
        next: (data) => {
          console.log( data);
          if(data.message=='success') {
            localStorage.setItem('token', data.token);
            
            this.authService.saveData();
            this.router.navigate(['/home']);
          }
          this.isLoading = false;
          
        },
        error: (error) => {
          console.log( error.error.message);
          this.isLoading = false;
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
