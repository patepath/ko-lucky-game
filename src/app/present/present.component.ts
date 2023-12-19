import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Present } from '../models/present';
import { PresentService } from '../services/present.service';
import { ThisReceiver } from '@angular/compiler';

declare var $:any;
declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.css']
})
export class PresentComponent implements OnInit, AfterViewInit {

	public dataTable!: DataTable;
	public data!: string[][];

  public presents: Present[] = [];
  public present: Present = <Present>{};
  public curIndex: number = -1;

  constructor(private _presentSrv: PresentService) { 
    this.dataTable = {
      headerRow: ['ชื่อของขวัญ', 'จำนวน' ],
      footerRow: ['ชื่อของขวัญ', 'จำนวน' ],
      dataRows: [],
    };
    
    this.present.id = '';
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
		let self = this;

		let table = $('#present-table').DataTable({
			dom: 'frtip',
			responsive: true,
			language: {
				search: "_INPUT_",
				searchPlaceholder: "Search records",
			},
			columnDefs: [ { 
        targets: [1], width: '5em', className: 'text-center' } 
      ],
      paging: true,
      pageLenght: 10,
			pagingType: "full_numbers",
		});

    table.on('mouseover', 'tr', function(this: any) {
      $(this).css('cursor', 'pointer');
			$(this).css('font-weight', 'bold');
    })

    table.on('mouseout', 'tr', function(this: any) {
			$(this).css('font-weight', 'normal');
    })

		table.on('click', 'td', function(this: any) {
      self.curIndex = table.row(this).index();

      if(self.curIndex > -1) {
        self.present = self.presents[self.curIndex];
      }
		});

    self.findAll();
  }

  refresh() {
		let table = $('#present-table').DataTable();
		table.clear();
    this.data = [];
  
    if(this.presents.length > 0) {
      this.presents.forEach(s => {
        this.data.push([
          s.name,
          String(s.qty),
        ]);
      });

      table.rows.add(this.data)
    }

    table.draw();
  }

  findAll() {
    this._presentSrv.findAll().subscribe(s => {
      this.presents = s;
      this.refresh();
    });
  }

  newPresent() {
    this.present = <Present>{};
    this.present.id = '';
  }

  savePresent() {
    if(this.present.id == '') {
      this._presentSrv.add(this.present).then(rs => {
        this.newPresent();
      });

    } else {
      this._presentSrv.edit(this.present).then(rs => { 
        this.newPresent();
      });
    }

  }
 
  removePresent() {

    if(this.present.id != '') {
      if(confirm("ต้องการที่จะลบข้อมูลของขวัญหรือไม่?")) {
        this._presentSrv.remove(this.present).then(rs => {
          this.newPresent();
        }) 
      }
    }
  }
}
