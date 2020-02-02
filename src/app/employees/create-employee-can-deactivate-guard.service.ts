import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreateEmployeeComponent } from 'src/app/employees/create-employee/create-employee.component';
@Injectable({
  providedIn: 'root'
})
export class CreateEmployeeCanDeactivateGuardService implements CanDeactivate<CreateEmployeeComponent>{
  canDeactivate(component: CreateEmployeeComponent):  boolean {
    if(component.createEmployeeForm.dirty){
      return confirm('Are you sure that you want to discard the changes?');
    }
    else{
    return true;
    }
  }
}
