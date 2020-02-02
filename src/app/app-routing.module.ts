import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListEmployeesComponent } from "./employees/list-employees/list-employees.component";
import { CreateEmployeeComponent } from "./employees/create-employee/create-employee.component";
import { EmployeeDetailsComponent } from "./employees/employee-details/employee-details.component";
import { CreateEmployeeCanDeactivateGuardService } from "src/app/employees/create-employee-can-deactivate-guard.service";
import { EmployeeListResolverService } from "./employees/employee-list-resolver.service";
import { PageNotFoundComponent } from "./page-not-found.component";
import { EmployeeDetailsGuardService } from "./employees/employee-details-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "/list", pathMatch: "full" },
  
  {
    path: "edit/:id",
    component: CreateEmployeeComponent,
    canDeactivate: [CreateEmployeeCanDeactivateGuardService]
  },
  { 
    path: "employees/:id",
     component: EmployeeDetailsComponent,
     canActivate: [EmployeeDetailsGuardService]
     },
  {
    path: "list",
    component: ListEmployeesComponent,
    resolve: { employeelist: EmployeeListResolverService }
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
