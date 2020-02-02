import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { EmployeeService } from "../employee.service";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class EmployeeDetailsGuardService implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.empService.getEmployeeById(+route.paramMap.get("id")).pipe(
      map(employee => {
        const existEmployee = !!employee;
        if (existEmployee) {
          return true;
        } else {
          this.router.navigate(["**"]);
        }
      }),
      catchError((err)=>{
        console.error(err);
        return of(false);
        
      })
    );
  }

  constructor(private empService: EmployeeService, private router: Router) {}
}
