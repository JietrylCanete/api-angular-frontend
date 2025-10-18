import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionService } from '@app/_services/position.service';
import { AccountService } from '@app/_services/account.service';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './position-add-edit.component.html'
})
export class PositionAddEditComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  isAddMode = true;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private positionService: PositionService,
    public accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['active', Validators.required]
    });

    if (!this.isAddMode) {
      this.positionService.getById(this.id!).pipe(first()).subscribe(pos => {
        this.form.patchValue(pos);
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    this.loading = true;

    const save$ = this.isAddMode
      ? this.positionService.create(this.form.value)
      : this.positionService.update(this.id!, this.form.value);

    save$.subscribe({
      next: () => this.router.navigate(['/admin/positions']),
      error: () => (this.loading = false)
    });
  }
}
