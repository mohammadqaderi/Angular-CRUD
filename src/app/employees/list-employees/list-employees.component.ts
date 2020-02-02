import { Component, OnInit } from "@angular/core";
import { Employee } from "../../models/employee/employee.model";
import { EmployeeService } from "../../employee.service";
import { Router, ActivatedRoute } from "@angular/router";
import { delay } from "rxjs/operators";
import { Observable } from "rxjs";
import { ResolevdEmployeeList } from "../resolved-employeelist.model";
@Component({
  selector: "app-list-employees",
  templateUrl: "./list-employees.component.html",
  styleUrls: ["./list-employees.component.css"]
})
export class ListEmployeesComponent implements OnInit {
employees: Employee[];
error: string;
filteredEmployees: Employee[];
// childData: Employee;
  constructor(private route: Router,
    private activatedRoute: ActivatedRoute) {
      const resolvedData: Employee[] | string = this.activatedRoute.snapshot.data["employeelist"];
      if(Array.isArray(resolvedData)){
        this.employees = resolvedData;
      }else{
        this.error = resolvedData;
      }
      if(this.activatedRoute.snapshot.queryParamMap.has("searchTerm")){
        this.searchTerm = this.activatedRoute.snapshot.queryParamMap.get("searchTerm");
      }  else{
        this.filteredEmployees = this.employees;
      }
      
     }
 private _searchTerm: string;
 get searchTerm():string {
   return this._searchTerm;
 }
 set searchTerm(value: string) {
   this._searchTerm = value;
   this.filteredEmployees = this.filter(value);
}
filter(searchValue: string): Employee[]{
return this.employees.filter(e =>
  e.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);
}
  ngOnInit() {

  }
  
  // handleNotify(eventData: Employee){
  //   this.childData = eventData;

  // }
  onClick(empId: number){
    this.route.navigate(["/employees", empId], {
      queryParams: {"searchTerm": this.searchTerm, "testParam": "testValue"}
    });
  }
  // pipeChanges(){
  //   this.employees[0].name = 'Jordan';
  //   this.filteredEmployees = this.filter(this.searchTerm);
  //   // const newEmployeeArray: Employee[] = Object.assign([], this.employees);
  //   // this.employees = newEmployeeArray;
  // }

  onDeleteNotification(id: number){
    const index = this.filteredEmployees.findIndex(e => e.id === id);
    if(index !== -1){
      this.filteredEmployees.splice(index, 1);
    
    }
  }
}
