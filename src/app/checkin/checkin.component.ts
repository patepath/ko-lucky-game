import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subject, count, debounceTime, filter, switchMap } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit, AfterViewInit {
  @ViewChild('txtqrcode')
  txtqrcode!: ElementRef<HTMLInputElement>;

  @ViewChild('txtcode')
  txtcode!: ElementRef<HTMLInputElement>;


  public status: number = 1;

  public qrcode$ = new Subject<string>;
  public code$ = new Subject<string>;
  public employees: Employee[] = [];
  public employee: Employee = <Employee>{};

  constructor(
    private _emplySrv: EmployeeService,
    private _router: Router
  ) {
  }
  
  ngOnInit(): void {
//    this.qrcode$
//      .pipe(
//        debounceTime(100),
//        filter(s => s.length == 4),
//        switchMap(s => this._emplySrv.findByCode(s))
//      )
//      .subscribe(s => {
//        console.log(s);
//        console.log(this.status);
//        this.status = 3;
//        this.employee = s[0];
//      }
//    );

    this.code$
      .pipe(
        debounceTime(500),
        switchMap(s => this._emplySrv.findByName(s))
      )
      .subscribe(val => {
        this.employees = val;
      }
    );
  }

  ngAfterViewInit(): void {
    this.txtqrcode.nativeElement.focus();

  }

  doQRCode(qrcode: string) {
    if(qrcode.length == 4) {
      this._emplySrv.findByCode(qrcode).subscribe(s => {
        if(s.length>0) {
          
          //this.status = 3;
          this.employee = s[0];
          this._router.navigate(['/register'], { queryParams: { id: this.employee.id }});
          this.txtqrcode.nativeElement.value = '';
        }
      });
    }
  }

  doCodeChange(code: string) {
    this.code$.next(code);
  }

  selectEmply(id: string) {
    this._router.navigate(['/register'], { queryParams: { id: id }});
  }

  resetQRCode() {
    this.txtqrcode.nativeElement.value = '';
    this.txtqrcode.nativeElement.focus();
  }

  doSearch() {
    this.status = 2;
    
    this._emplySrv.findAll().subscribe(s => this.employees=s);

    setTimeout(() => {
      this.txtcode.nativeElement.value = '';
      this.txtcode.nativeElement.focus();
    }, 100);
  }

  async doCheckin() {
    await this._emplySrv.checkin(this.employee).then(s => { });
    this.doCancel();
  }

  doCancel() {
    this.status = 1;

    setTimeout(() => {
      this.resetQRCode();
    }, 200);
  }
}

