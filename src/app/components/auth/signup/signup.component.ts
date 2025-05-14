import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone:false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  selectedRole: string = 'user';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  selectRole(role: string): void {
    this.selectedRole = role;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { username, password } = this.signupForm.value;
      this.authService.signup(username, password, this.selectedRole).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Error creating account';
        }
      });
    }
  }
}