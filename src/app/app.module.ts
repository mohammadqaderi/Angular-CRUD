import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import {BsDatepickerModule} from "ngx-bootstrap";
import { AppComponent } from "./app.component";
import { ListEmployeesComponent } from "./employees/list-employees/list-employees.component";
import { CreateEmployeeComponent } from "./employees/create-employee/create-employee.component";
import {SelectRequiredValidatorDirective} from "./Shared/select-required-validator.directive";
import { ConfirmEqualValidatorDirective } from "./Shared/confirm-equal-validator.directive";
import { EmployeeService } from './employee.service';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { CreateEmployeeCanDeactivateGuardService } from 'src/app/employees/create-employee-can-deactivate-guard.service';
import { EmployeeFilterPipe } from './employees/employee-filter.pipe';
import { EmployeeListResolverService } from './employees/employee-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsGuardService } from './employees/employee-details-guard.service';
import { AccordionComponent } from './shared/accordion.component';
import {HttpClientModule} from '@angular/common/http';
import { DisplayEmployeeComponent } from './employees/display-employee/display-employee.component';
@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent,
    AccordionComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [EmployeeService, CreateEmployeeCanDeactivateGuardService,
     EmployeeListResolverService, EmployeeDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
