import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
 selectedEmployeeId: number;
 deleteConfirmation = false;
  constructor(private activatedRoute: ActivatedRoute, private route: Router,
    private empService: EmployeeService) { }
  @Input() employee: Employee;
  // @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();

  @Input() searchTerm: string;
  ngOnInit() {
    this.selectedEmployeeId = +this.activatedRoute.snapshot.paramMap.get('id');
  }
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  // handlerClick():void {
  //  this.notify.emit(this.employee);
  // }
  // getInfo(): string{
  //   return this.employee.name + ' '+ this.employee.gender;

  // }
  viewEmployee(){
    this.route.navigate(['/employees', this.employee.id], {
      queryParams: {'searchTerm': this.searchTerm}
    });
  }
  editEmployee(){
    this.route.navigate(['/edit', this.employee.id]);
  }
  deleteEmployee(){
    this.empService.deleteEmployee(this.employee.id).subscribe(
      () => console.log(`Employee with id ${this.employee.id} deleted`),
      (err: any) => console.error(err)
    );
    this.notifyDelete.emit(this.employee.id);
  }

}
