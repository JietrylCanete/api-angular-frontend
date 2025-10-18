import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PositionService } from '@app/_services/position.service';
import { AccountService } from '@app/_services/account.service';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {
  positions: any[] = [];
  loading = true;

  constructor(
    private router: Router,
    private positionService: PositionService,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadPositions();
  }

  loadPositions(): void {
    this.loading = true;
    this.positionService.getAll().subscribe({
      next: (data) => {
        this.positions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load positions', err);
        this.loading = false;
      }
    });
  }
}
