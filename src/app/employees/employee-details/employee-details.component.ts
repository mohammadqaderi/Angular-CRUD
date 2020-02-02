import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../models/employee/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
employee: Employee;
private nextId: number;
  constructor(private activatedRoute: ActivatedRoute, 
    private empService: EmployeeService, private route: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(e => {
      this.nextId = +e.get('id');
     this.empService.getEmployeeById(this.nextId).subscribe((employee) => {
       this.employee = employee
     }, (err: any)=> console.error(err));
   })
  }

  viewNextEmployee(){
    if(this.nextId < 3){
    this.nextId = this.nextId +1;
 
    }
    else{
      this.nextId = 1;
    }
    this.route.navigate(['/employees', this.nextId], {
      queryParamsHandling: 'preserve'
    });
  }


}
