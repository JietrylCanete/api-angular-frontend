import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '@app/_services/request.service';
import { AccountService } from '@app/_services/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-request-add-edit',
  templateUrl: './request-add-edit.component.html',
})
export class RequestAddEditComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  title!: string;
  loading = false;
  submitted = false;
  isAddMode = true;
  currentStatus: string = 'draft'; // ✅ Added

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.title = this.isAddMode ? 'Add Request' : 'Edit Request';

    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      items: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      status: ['draft']
    });

    if (!this.isAddMode) {
      this.loading = true;
      this.requestService
        .getById(this.id!)
        .pipe(first())
        .subscribe({
          next: (r: any) => {
            this.form.patchValue(r);
            this.currentStatus = r.status || 'draft'; // ✅ Track current status
            this.loading = false;

            // ✅ Disable form if status is not 'draft'
            if (this.currentStatus !== 'draft') {
              this.form.disable();
            }
          },
          error: (error: any) => {
            console.error('Error loading request:', error);
            this.loading = false;
          }
        });
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(forApproval = false): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this.loading = true;

    const account = this.accountService.accountValue;
    const formValue = { ...this.form.value, accountId: account?.id };

    if (forApproval) formValue.status = 'pending';

    if (this.isAddMode) {
      this.requestService
        .add(formValue)
        .pipe(first())
        .subscribe({
          next: () => {
            alert(forApproval ? 'Request submitted for approval.' : 'Request created successfully.');
            this.router.navigate(['/admin/requests']);
          },
          error: (error: any) => {
            console.error('Error creating request:', error);
            alert('Failed to create request.');
            this.loading = false;
          }
        });
    } else {
      this.requestService
        .update(this.id!, formValue)
        .pipe(first())
        .subscribe({
          next: () => {
            alert(forApproval ? 'Request submitted for approval.' : 'Request updated successfully.');
            this.router.navigate(['/admin/requests']);
          },
          error: (error: any) => {
            console.error('Error updating request:', error);
            alert('Failed to update request.');
            this.loading = false;
          }
        });
    }
  }

  // ✅ Added: back button logic
  onBack(): void {
    this.router.navigate(['/admin/requests']);
  }

  onCancel(): void {
    this.router.navigate(['/admin/requests']);
  }
}
