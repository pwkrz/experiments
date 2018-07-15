import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor() { }

  getEmployees() {
    const employees = localStorage.getItem('employees') ? localStorage.getItem('employees').split(';') : [];
    return employees.map( el => JSON.parse(el) );
  }
  getEmployeeById(id: number) {
    const employees = localStorage.getItem('employees') ? localStorage.getItem('employees').split(';') : null;
    if (employees) {
      const result = employees.find(emp => JSON.parse(emp).id === id);
      return JSON.parse(result);
    }
    return null;
  }
  updateEmployeeList(data, id = null) {
    data.id = id ? id : Math.random();
    const employeeEntry = JSON.stringify(data);
    let employees = localStorage.getItem('employees') ? localStorage.getItem('employees').split(';') : [];
    if (id) {
      employees = employees.map( emp => {
        const empId = JSON.parse(emp).id;
        return empId === id ? employeeEntry : emp;
      });
    } else {
      employees.push(employeeEntry);
    }
    localStorage.setItem('employees', employees.join(';'));
  }
  deleteEmployeeById(id) {
    let employees = localStorage.getItem('employees').split(';');
    let success;
    employees = employees.filter( emp => {
      const empId = JSON.parse(emp).id;
      if (empId === id) {
        success = true;
      }
      return empId !== id;
    });
    localStorage.setItem('employees', employees.join(';'));
    return success;
  }
}
