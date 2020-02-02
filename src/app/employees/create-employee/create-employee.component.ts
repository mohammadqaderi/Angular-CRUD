import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { department } from "../../models/employee/department.model";
import { BsDatepickerConfig } from "ngx-bootstrap";
import { Employee } from "../../models/employee/employee.model";
import { EmployeeService } from "../../employee.service";
import { Router, ActivatedRoute } from "@angular/router";
import { delay } from "rxjs/operators";

@Component({
  selector: "app-create-employee",
  templateUrl: "./create-employee.component.html",
  styleUrls: ["./create-employee.component.css"]
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild("employeeForm") public createEmployeeForm: NgForm;
  editState: string;
  employee: Employee = {
    id: null,
    name: null,
    email: null,
    phoneNumber: null,
    gender: null,
    // password: null,
    // confirmPassowrd: null,
    isActive: null,
    departments: "select",
    contactPreference: null,
    dateOfBirth: null,
    photoPath: null
  };
  previewPhoto: boolean;

  datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(
    private listEmps: EmployeeService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.datePickerConfig = Object.assign(
      {},
      {
        containerClass: "theme-dark-blue",
        showWeekNumbers: false,
        minDate: new Date(2018, 0, 1),
        maxDate: new Date(2020, 1, 1),
        dateInputFormat: "DD/MM/YYYY"
      }
    );
  }
  departments: department[] = [
    {
      id: 1,
      name: "Human Resources"
    },
    {
      id: 2,
      name: "IT"
    },
    {
      id: 3,
      name: "Paroll"
    },
    {
      id: 4,
      name: "Help Desk"
    }
  ];

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      const id = +param.get("id");
      this.getEmployee(id);
    });
  }
  getEmployee(id: number) {
    if (id == 0) {
      this.editState = "Create Employee";
      this.employee = {
        id: null,
        name: null,
        email: null,
        phoneNumber: null,
        gender: null,
        // password: null,
        // confirmPassowrd: null,
        isActive: null,
        departments: "select",
        contactPreference: null,
        dateOfBirth: null,
        photoPath: null
      };
      this.createEmployeeForm.reset();
    } else {
      this.editState = "Edit Employee";
      this.listEmps.getEmployeeById(id).subscribe((employee)=> {
        this.employee = employee;
      }, (error: any)=> console.error(error))
    }
  }
  saveEmployee(): void {
    if(this.employee.id == null){
    this.listEmps.addEmployees(this.employee).subscribe((data: Employee)=> {
      console.log(JSON.stringify(data));
      this.createEmployeeForm.reset();
      this.route.navigate(["list"]);
    },
    (error: any)=> console.error(error));
  }
  else{
    this.listEmps.updateEmployee(this.employee).subscribe( ()=> {
      this.createEmployeeForm.reset();
      this.route.navigate(["list"]);
    },
    (error: any)=> console.error(error));
  }
  }
}
