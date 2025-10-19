import { Component, OnInit } from '@angular/core';
import { RequestService } from '@app/_services/request.service';
import { AccountService } from '@app/_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-request-list',
  templateUrl: './manager-request-list.component.html',
})
export class ManagerRequestListComponent implements OnInit {
  requests: any[] = [];
  loading = false;

  constructor(
    private requestService: RequestService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  /**
   * Safely parse JSON stored in items (if any).
   * Returns array or null.
   */
  tryParseJson(value: string | null | undefined): any[] | null {
    if (!value || typeof value !== 'string') return null;
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  loadRequests(): void {
    const account = this.accountService.accountValue;
    if (!account?.id) {
      console.warn('⚠️ No account ID found for manager.');
      this.requests = [];
      return;
    }

    const accountId = Number(account.id);
    if (!accountId) {
      console.warn('⚠️ Invalid account id:', account.id);
      this.requests = [];
      return;
    }

    this.loading = true;
    this.requestService.getForApproval(accountId).subscribe({
      next: (res: any[]) => {
        this.requests = res || [];
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading requests:', err);
        this.loading = false;
      },
    });
  }

  approve(req: any): void {
    // NOTE: backend stores PK as requestId (not id)
    const id = req?.requestId ?? req?.id; // fallback to id if present
    if (!id) {
      console.error('Missing request id/requestId for approve', req);
      alert('Invalid request ID. Cannot approve.');
      return;
    }

    this.requestService.updateStatus(id, 'approved').subscribe({
      next: () => {
        // update locally so UI reflects change immediately
        req.status = 'approved';
        alert(`Request #${id} approved.`);
      },
      error: (err: any) => {
        console.error('Failed to approve', err);
        alert('Failed to approve request.');
      },
    });
  }

  reject(req: any): void {
    const id = req?.requestId ?? req?.id;
    if (!id) {
      console.error('Missing request id/requestId for reject', req);
      alert('Invalid request ID. Cannot reject.');
      return;
    }

    this.requestService.updateStatus(id, 'rejected').subscribe({
      next: () => {
        req.status = 'rejected';
        alert(`Request #${id} rejected.`);
      },
      error: (err: any) => {
        console.error('Failed to reject', err);
        alert('Failed to reject request.');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/requests']);
  }
}
