import { EmployeeServiceService } from './../../services/employee-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: any[];

  constructor(private router: Router, private empService: EmployeeServiceService) { }

  ngOnInit() {
    this.employees = this.empService.getEmployees();
  }
  onDelete(id) {
    this.empService.deleteEmployeeById(id);
    this.employees = this.empService.getEmployees();
  }
}
