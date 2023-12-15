import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

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

  constructor() { }
  
  ngOnInit(): void {
    this.qrcode$
      .pipe(
        debounceTime(500)
      )
      .subscribe(s => {
        console.log(s);
      }
    );

    this.code$
      .pipe(
        debounceTime(600)
      )
      .subscribe(s => {
        console.log(s);
      }
    );
  }

  ngAfterViewInit(): void {
  }

  doQRCode(qrcode: string) {
    this.qrcode$.next(qrcode);
  }

  doCodeChange(code: string) {
    this.code$.next(code);
  }

  doSearch() {
    this.status = 2;
  }
}
