import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StartupService } from '../../../services/startup.service';
import { AuthService } from '../../../services/auth.service';
import { Startup } from '../../../models/startup.model';

@Component({
  selector: 'app-registration-form',
  standalone:false,
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private startupService: StartupService,
    private authService: AuthService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      founder: ['', Validators.required],
      industry: ['', Validators.required],
      foundedDate: ['', Validators.required],
      employees: ['', [Validators.required, Validators.min(1)]],
      website: ['']
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      // Handle not logged in
    }
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const user = this.authService.getCurrentUser();
      if (!user) return;

      const startupData: Startup = {
        ...this.registrationForm.value,
        userId: user.id,
        status: 'pending'
      };

      this.startupService.registerStartup(startupData).subscribe({
        next: () => {
          this.successMessage = 'Startup registered successfully!';
          this.registrationForm.reset();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Error registering startup';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }
}