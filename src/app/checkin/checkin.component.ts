import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Subject, count, debounceTime, filter } from 'rxjs';

//declare var $:any;
//
//declare interface DataTable {
//    headerRow: string[];
//    footerRow: string[];
//    dataRows: string[][];
//}

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

//	public dataTable!: DataTable;
//	public data!: string[][];

  public status: number = 1;

  public qrcode$ = new Subject<string>;
  public code$ = new Subject<string>;

  constructor() {
//		this.dataTable = {
//			headerRow: ['รหัส', 'ชื่อ-นามสกุล' ],
//			footerRow: ['รหัส', 'ชื่อ-นามสกุล' ],
//			dataRows: [],
//		};
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

//		let self = this;
//
//		let table = $('#employee-table').DataTable({
//			dom: 'rtip',
//			buttons: [ 'copy', 'csv', 'excel', 'print' ],
//			responsive: true,
//			columnDefs: [ { targets: [0], width: '5em', className: 'text-center' } ],
//			ordering: false,
//			order: [[0, 'desc']],
//			language: {
//				search: "_INPUT_",
//				searchPlaceholder: "Search records",
//			},
//			pagingType: "full_numbers",
//		});
//
//		table.on('click', 'td', function(this: any) {
//			let $tr = $(this).closest('tr');
//
//			var data = table.row($tr).data();
//		});
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

