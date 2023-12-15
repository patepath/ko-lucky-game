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

  @ViewChild('txtsearch')
  txtsearch!: ElementRef<HTMLInputElement>;

  public status: number = 1;
  public qrcode$ = new Subject<string>;

  constructor() { }
  
  ngOnInit(): void {
    this.qrcode$
      .pipe(
        debounceTime(500)
      )
      .subscribe(s => {
        console.log(s);
      });
  }

  ngAfterViewInit(): void {
  }

  doQRCode(code: string) {
    this.qrcode$.next(code);
  }

  doSearch() {
    this.status = 2;
  }
}
