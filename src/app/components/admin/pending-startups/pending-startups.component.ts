import { Component, OnInit } from '@angular/core';
import { StartupService } from '../../../services/startup.service';
import { Startup } from '../../../models/startup.model';

@Component({
  selector: 'app-pending-startups',
  standalone:false,
  templateUrl: './pending-startups.component.html',
  styleUrls: ['./pending-startups.component.css']
})
export class PendingStartupsComponent implements OnInit {
  startups: Startup[] = [];
  isLoading: boolean = true;
  showRejectionFor: string | null = null;
  rejectionReason: string = '';

  constructor(private startupService: StartupService) { }

  ngOnInit(): void {
    this.loadPendingStartups();
  }

  loadPendingStartups(): void {
    this.startupService.getAllStartups().subscribe({
      next: (startups) => {
        this.startups = startups.filter(s => s.status === 'pending');
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading startups:', error);
        this.isLoading = false;
      }
    });
  }

  approveStartup(id: string): void {
    this.startupService.approveStartup(id).subscribe({
      next: () => {
        this.loadPendingStartups();
      },
      error: (error) => {
        console.error('Error approving startup:', error);
      }
    });
  }

  showRejectionForm(id: string): void {
    this.showRejectionFor = id;
    this.rejectionReason = '';
  }

  cancelRejection(): void {
    this.showRejectionFor = null;
    this.rejectionReason = '';
  }

  rejectStartup(id: string): void {
    if (!this.rejectionReason) {
      alert('Please enter a rejection reason');
      return;
    }

    this.startupService.rejectStartup(id, this.rejectionReason).subscribe({
      next: () => {
        this.showRejectionFor = null;
        this.rejectionReason = '';
        this.loadPendingStartups();
      },
      error: (error) => {
        console.error('Error rejecting startup:', error);
      }
    });
  }
}