import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { User } from './user';


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
  dataSource: MatTableDataSource<User>;

  constructor(private http: HttpClient){

  }
  
  editRowID: number;
  btnDisabled: boolean = false;

  private url: string = "/assets/data/users.json";

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.http.get(this.url)
      .subscribe(data => {
        this.dataSource.data = data as Array<User>;
    });
    this.dataSource = new MatTableDataSource<User>();
    this.dataSource.sort = this.sort;
  }

  editRow(val: number): void {
    this.editRowID = val;
  }

  isNumber(val: string): boolean { 
    return /^\d+$/.test(val);
  }  

  isName(val: string): boolean { 
    return /^[a-zA-Z ]+$/.test(val);
  }  

  deleteRow(id: number): void {
    let data: any = this.dataSource.data;
    const i: number = data.findIndex((e: { id: number; }) => e.id === id);
    if(i !== -1 && confirm(`Are you sure to delete row ${id}?`)) {
      data.splice(i, 1);
      this.dataSource.data = data;
    }
  }

  isDisabled(val1: boolean, val2: boolean): void {
    if(val1 && val2) {
      this.btnDisabled = false;
    }
    else {
      this.btnDisabled = true;
    }
  }
}