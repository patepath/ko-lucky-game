import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _empySrv: EmployeeService, private _route: ActivatedRoute, private _router: Router) { }

  public employee: Employee = <Employee>{};

  ngOnInit(): void {
    this._route.queryParams.subscribe(async s => {
      let id = s['id'];

      if(id) {
        this._empySrv.findById(id).then(s => {
          this.employee = <Employee>s.data();
          this.employee.id = id;
        });
      }
    });
  }

  doCheckin() {
    this._empySrv.checkin(this.employee).then(() => { 
      alert('ลงทะเบียนเรียบร้อย')
    });
  }

  doCancel() {
    this._router.navigate(['/']);
  }

}
