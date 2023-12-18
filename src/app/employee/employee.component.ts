import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { ConnectableObservable } from 'rxjs';
import { orderBy } from '@angular/fire/firestore';

declare var $:any;
declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterViewInit {

	public dataTable!: DataTable;
	public data!: string[][];

  public emplies: Employee[] = [];
  public emply: Employee = <Employee>{};
  public curIndex: number = -1;

  constructor(private emplyServ: EmployeeService) {
    this.dataTable = {
      headerRow: ['รหัส', 'ชื่อ-นามสกุล' ],
      footerRow: ['รหัส', 'ชื่อ-นามสกุล' ],
      dataRows: [],
    };
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
		let self = this;

		let table = $('#employee-table').DataTable({
			dom: 'frtip',
			responsive: true,
			columnDefs: [ { targets: [0], width: '5em', className: 'text-center' } ],
			ordering: true,
			order: [[0, 'asc']],
			language: {
				search: "_INPUT_",
				searchPlaceholder: "Search records",
			},
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
        self.emply = self.emplies[self.curIndex];
      }
		});

    self.findAll();
  }

  refresh() {
		let table = $('#employee-table').DataTable();

		table.clear();
		table.draw();

    this.data = [];
  
    this.emplies.forEach(s => {
      this.data.push([
        s.code, 
        s.fullName,
      ]);
    });

    table.rows.add(this.data)
    table.draw();
  }

  findAll() {
    this.emplyServ.findAll().subscribe(s => {
      this.emplies = s;
      this.refresh();
    });
  }

  newEmply() {
    this.emply = <Employee>{};
    this.emply.id = '';
  }

  saveEmployee() {
    console.log(this.emply);

    if(this.emply.id === '') {
      this.emplyServ.add(this.emply).then(rs => {});

    } else {
      this.emplyServ.edit(this.emply).then(rs => { console.log(rs)});
    }
  }


  removeEmployee() {

  }
}
