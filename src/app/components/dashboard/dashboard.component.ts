import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  employeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      employees: this.formBuilder.array([])
    });

    
    // Example: Add initial form controls
    this.addEmployee(); // You can add more based on your requirements
    console.log(this.employeeForm.value)
  }

  // Employee
  // Getter for easier access to the FormArray
  get getEmployeeList() {
    return this.employeeForm.get('employees') as FormArray;
  }
  getEmployee(index: number): any {
    return this.getEmployeeList.controls[index] as FormGroup;
  }

  // Projects List
  getProjectList(empIndex: number): any {
    return this.getEmployee(empIndex).get('projects') as FormArray;
  }
  // get a single project
  getProject(empIndex: number, projIndex: number): any {
    return this.getProjectList(empIndex).controls[projIndex] as FormGroup;
  }
  // get Tasks list
  getTaskList(empIndex: number, projIndex: number): any {
    return this.getProject(empIndex,projIndex).controls['tasks'] as FormGroup;
  }
  // get single task 
  // getTask(empIndex: number, projIndex: number): any {
  //   return this.getTaskList(empIndex,projIndex).controls[projIndex] as FormGroup;
  // }

  // Function to add an employee FormGroup to the FormArray
  addEmployee() {
    const employeeFormGroup = this.formBuilder.group({
      name: '',
      projects: new FormArray([])
    });

    this.getEmployeeList.push(employeeFormGroup);
  }

  // Function to add a project FormGroup to the specified employee's projects FormArray
  addProject(index: number) {
    const projectFormGroup = this.formBuilder.group({
      projectName: '',
      tasks : new FormArray([])
      // tasks: this.formBuilder.array([])
    });
    this.getEmployee(index)?.get('projects').push(projectFormGroup);
  }

  // Function to add a task FormControl to the specified employee's specified project's tasks FormArray
  addTask(empIndex: number, projIndex: number) {
    const taskFormGroup = this.formBuilder.group({
      taskName: '',
    });
    this.getProject(empIndex,projIndex).get('tasks').push(taskFormGroup);
  }

  Submit(){
    console.log(this.employeeForm.value);
  }

}
