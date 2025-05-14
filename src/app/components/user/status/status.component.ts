import { Component, OnInit } from '@angular/core';
import { StartupService } from '../../../services/startup.service';
import { AuthService } from '../../../services/auth.service';
import { Startup } from '../../../models/startup.model';

@Component({
  selector: 'app-status',
  standalone:false,
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  startups: Startup[] = [];
  isLoading: boolean = true;

  constructor(
    private startupService: StartupService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadStartups();
  }

  loadStartups(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.startupService.getUserStartups(user.id).subscribe({
      next: (startups) => {
        this.startups = startups;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading startups:', error);
        this.isLoading = false;
      }
    });
  }
}