import { Employee } from '../models/employee/employee.model';

export class ResolevdEmployeeList{
    constructor(public employeeList: Employee[], public error: any = null){

    }
}