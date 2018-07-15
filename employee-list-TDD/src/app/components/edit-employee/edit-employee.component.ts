import { EmployeeServiceService } from './../../services/employee-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  title: string;
  currentEmployee: any;
  employeeForm: FormGroup;
  isSubmitted = false;
  result: any = null;
  emailPattern = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');

  constructor(private activeRoute: ActivatedRoute,
              private empService: EmployeeServiceService,
              private router: Router,
              private frmBuilder: FormBuilder) { }

  ngOnInit() {
    const path = this.activeRoute.snapshot.routeConfig.path;
    switch (path) {
      case 'new':
        this.currentEmployee = {};
        this.title = 'Provide new employee details';
        break;
      case 'edit':
        const queryParams = this.activeRoute.snapshot.queryParams;
        if (queryParams.id) {
          const id = parseFloat(queryParams.id);
          this.currentEmployee = this.empService.getEmployeeById(id);
          this.title = 'Editing employee details';
        } else {
          this.router.navigate(['']);
        }
        break;
    }
    if (this.currentEmployee) {
      this.employeeForm = this.frmBuilder.group({
        name: [this.currentEmployee.name, [Validators.required, Validators.minLength(3)]],
        email: [this.currentEmployee.email, [Validators.required, Validators.pattern(this.emailPattern)]],
        dob: [this.currentEmployee.dob, [Validators.required]]
      });
    }
  }
  get nameRef() { return this.employeeForm.get('name'); }
  get emailRef() { return this.employeeForm.get('email'); }
  get dobRef() { return this.employeeForm.get('dob'); }

  onFormSubmit() {
    this.isSubmitted = true;
    if (this.employeeForm.valid) {
      if (this.currentEmployee.name) {
        this.empService.updateEmployeeList(this.employeeForm.value, this.currentEmployee.id);
      } else {
        this.empService.updateEmployeeList(this.employeeForm.value);
      }
      this.router.navigate(['']);
    }
  }

}
