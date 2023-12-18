import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subject, count, debounceTime, filter } from 'rxjs';


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

  constructor() {
   }
  
  ngOnInit(): void {
    this.qrcode$
      .pipe(
        debounceTime(100),
        filter(s => s.length == 4)
      )
      .subscribe(s => {
        this.status = 3;
      }
    );

    this.code$
      .pipe(
        debounceTime(600),
        filter(s => s.length == 4)
      )
      .subscribe(s => {
        console.log(s);
      }
    );
  }

  ngAfterViewInit(): void {
    this.txtqrcode.nativeElement.focus();

  }

  doQRCode(qrcode: string) {
    this.qrcode$.next(qrcode);
  }

  doCodeChange(code: string) {
    this.code$.next(code);
  }

  resetQRCode() {
    this.txtqrcode.nativeElement.value = '';
    this.txtqrcode.nativeElement.focus();
  }

  doSearch() {
    this.status = 2;

    setTimeout(() => {
      this.txtcode.nativeElement.value = '';
      this.txtcode.nativeElement.focus();
    }, 100);
  }

  doCancel() {
    this.status = 1;

    setTimeout(() => {
      this.txtqrcode.nativeElement.value = '';
      this.txtqrcode.nativeElement.focus();
    }, 100);
  }
}

