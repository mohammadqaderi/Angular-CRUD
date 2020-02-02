import { Injectable } from "@angular/core";
import { Employee } from "./models/employee/employee.model";
import { Observable } from "rxjs";
import { of, throwError } from "rxjs";
import { delay, catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  private url: string = "http://localhost:3000/employees";
  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.url)
      .pipe(catchError(this.handleError));
  }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error("Client Side Error:" + errorResponse.error.message);
      console.error("Server Side Error:" + errorResponse);
    } else {
      return throwError(
        "There is a problem with a service, we are working on it, please try again later"
      );
    }
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/${id}`)
    .pipe(catchError(this.handleError));
  }
  addEmployees(employee: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(this.url, employee, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
      .pipe(catchError(this.handleError));
  }
  updateEmployee(employee: Employee): Observable<void> {
    return this.http
      .put<void>(`${this.url}/${employee.id}`, employee, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
      .pipe(catchError(this.handleError));
  }
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
    .pipe(catchError(this.handleError));
  }
}
