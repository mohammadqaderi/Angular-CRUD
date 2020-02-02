import { Injectable } from '@angular/core';
import { Employee } from '../models/employee/employee.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { map, catchError } from 'rxjs/operators';
import { ResolevdEmployeeList } from './resolved-employeelist.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeListResolverService implements Resolve<Employee[] | string> {
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ): Observable<Employee[] | string>{
return this.empServive.getEmployees()
.pipe(
  catchError((err: string)=> of(err))

)
}
  constructor(private empServive: EmployeeService) { }
}
