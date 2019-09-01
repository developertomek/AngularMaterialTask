import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  id: number;
  name: string;
  phone: number;
  admin: boolean;
  date: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Hydrogen', phone: 123456789, admin: true, date: 1548973623006},
  {id: 2, name: 'Helium', phone: 134567892, admin: false, date: 1549323623000},
  {id: 3, name: 'Lithium', phone: 124567893, admin: false, date: 1551323623005},
  {id: 4, name: 'Beryllium', phone: 234567891, admin: true, date: 1556323623001},
  {id: 5, name: 'Boron', phone: 345678912, admin: true, date: 1508323623009},
  {id: 6, name: 'Carbon', phone: 456789123, admin: false, date: 1509323623002},
  {id: 7, name: 'Nitrogen', phone: 567891234, admin: false, date: 1522323623008},
  {id: 8, name: 'Oxygen', phone: 678912345, admin: false, date: 1532323623004},
  {id: 9, name: 'Fluorine', phone: 789123456, admin: true, date: 1542323623002},
  {id: 10, name: 'Neon', phone: 891234567, admin: true, date: 1549923623003},
];

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'phone', 'admin', 'date', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  editRowID: any = '';
  btnDisabled: boolean = false;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  editRow(val) {
    this.editRowID = val;
  }

  isNumber(val) { 
    let result;
    return result = /^\d+$/.test(val);
  }  

  isName(val) { 
    let result;
    return result = /^[a-zA-Z ]+$/.test(val);
  }  

  isBool(val) { 
    let a = val.toString();
    if(a === "true" || a === "false") {
      return true;
    }
  }

  deleteRow(id) {
    let data = this.dataSource.data;
    const i = data.findIndex(e => e.id === id);
    if(i !== -1) {
      if(confirm(`Are you sure to delete row ${id}?`)) {
        data.splice(i, 1);
        this.dataSource.data = data;
      }
    }
  }

  isDisabled(val1,val2,val3) {
    if(val1 && val2 && val3) {
      this.btnDisabled = false;
    }
    else {
      this.btnDisabled = true;
    }
  }

}
