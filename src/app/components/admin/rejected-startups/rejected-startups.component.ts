import { Component, OnInit } from '@angular/core';
import { StartupService } from '../../../services/startup.service';
import { RejectedStartup } from '../../../models/rejected-startup.model';

@Component({
  selector: 'app-rejected-startups',
  standalone:false,
  templateUrl: './rejected-startups.component.html',
  styleUrls: ['./rejected-startups.component.css']
})
export class RejectedStartupsComponent implements OnInit {
  startups: RejectedStartup[] = [];
  isLoading: boolean = true;

  constructor(private startupService: StartupService) { }

  ngOnInit(): void {
    this.loadRejectedStartups();
  }

  loadRejectedStartups(): void {
    this.startupService.getRejectedStartups().subscribe({
      next: (startups) => {
        this.startups = startups;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading rejected startups:', error);
        this.isLoading = false;
      }
    });
  }
}