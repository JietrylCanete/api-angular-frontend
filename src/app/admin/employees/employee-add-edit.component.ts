import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@app/_services/employee.service';
import { AccountService } from '@app/_services/account.service';
import { DepartmentService } from '@app/_services/department.service';
import { PositionService } from '@app/_services/position.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html'
})
export class EmployeeAddEditComponent implements OnInit {
  form!: FormGroup;
  EmployeeID!: string;
  isAddMode = true;
  loading = false;
  submitted = false;

  accounts: any[] = [];
  departments: any[] = [];
  positions: any[] = [];
  managers: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private accountService: AccountService,
    private departmentService: DepartmentService,
    private positionService: PositionService
  ) {}

  ngOnInit(): void {
    this.EmployeeID = this.route.snapshot.params['id'];
    this.isAddMode = !this.EmployeeID;

    this.form = this.formBuilder.group({
      accountId: ['', Validators.required],
      departmentId: ['', Validators.required],
      positionId: [null, Validators.required],
      headEmployeeId: [null],
      hireDate: ['', Validators.required],
      status: ['active', Validators.required]
    });

    // Load dropdown data
    this.accountService.getAll().pipe(first()).subscribe(accounts => (this.accounts = accounts));
    this.departmentService.getAll().pipe(first()).subscribe(departments => (this.departments = departments));

    this.positionService.getAll().pipe(first()).subscribe(pos => {
      this.positions = pos;
      this.employeeService.getAll().pipe(first()).subscribe(all => {
        this.managers = all.filter(
          (e: any) => e.Position && e.Position.name && e.Position.name.toLowerCase() === 'manager'
        );
      });
    });

    // Watch position changes to adjust Head requirement
    this.form.get('positionId')!.valueChanges.subscribe(() => this.updateHeadValidator());

    if (!this.isAddMode && this.EmployeeID) {
      this.employeeService.getById(this.EmployeeID).pipe(first()).subscribe(emp => {
        this.form.patchValue({
          accountId: emp.accountId ?? emp.Account?.id,
          departmentId: emp.departmentId ?? emp.Department?.id,
          positionId: emp.positionId ?? emp.Position?.id,
          headEmployeeId: emp.headEmployeeId ?? emp.Head?.EmployeeID ?? null,
          hireDate: emp.hireDate ? emp.hireDate.split('T')[0] : emp.hireDate,
          status: emp.status || 'active'
        });
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  /** Utility: returns true if selected position is 'manager' */
  isManagerSelected(): boolean {
    const posId = this.form.get('positionId')?.value;
    const pos = this.positions.find(p => p.id === +posId);
    return pos && pos.name?.toLowerCase() === 'manager';
  }

  /** Sets or clears validator for Head field based on position */
  private updateHeadValidator(): void {
    const headControl = this.form.get('headEmployeeId')!;
    if (this.isManagerSelected()) {
      headControl.setValue(null);
      headControl.clearValidators();
    } else {
      headControl.setValidators([Validators.required]);
    }
    headControl.updateValueAndValidity();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      alert('Please fill all required fields!');
      return;
    }

    this.loading = true;

    if (this.isAddMode) this.createEmployee();
    else this.updateEmployee();
  }

  private createEmployee(): void {
    this.employeeService.create(this.form.value).subscribe({
      next: () => {
        alert('Employee created successfully!');
        this.router.navigate(['/admin/employees']);
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  private updateEmployee(): void {
    this.employeeService.update(this.EmployeeID, this.form.value).subscribe({
      next: () => {
        alert('Employee updated successfully!');
        this.router.navigate(['/admin/employees']);
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
