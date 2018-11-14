import {Component, OnInit, ViewChild} from '@angular/core';
import {filter, tap} from "rxjs/operators";
import {StudentTableService} from "../../services/student-table.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../services/project.service";
import {TableDataSource} from "angular4-material-table";
import {MatPaginator, MatTableDataSource } from "@angular/material";

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  id: string
  available
  dataSource: TableDataSource<any>

  displayedColumns: string[] = ['group', 'stu1', 'stu2', 'stu3', 'stu4', 'actionsColumn'];
  constructor(private st: StudentTableService, public route: ActivatedRoute, private prService: ProjectService) {
  }


  ngOnInit() {
    let a = 8
    this.route.params.pipe(
      filter(next => next.id != undefined),
      tap(value => {
          this.prService.getOriginalProjectId(Number(value.id)).subscribe(next => {
            this.id = next
            this.st.getTable(next).subscribe(next => {
              this.available = true
              this.dataSource = new TableDataSource<any>(next.data().students, Object);
              this.dataSource.paginator = this.paginator;
              this.dataSource.datasourceSubject.subscribe(personList => {
                this.st.saveTable(this.id, personList)
              });

            })

          })
        }
      )).subscribe()




  }

  printTable() {

  }


}

export class StudentGroup {
  group: number
  stu1
  stu2
  stu3
  stu4
}
