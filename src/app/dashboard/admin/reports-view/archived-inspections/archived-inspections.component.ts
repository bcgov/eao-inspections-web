import { Component, OnInit } from '@angular/core';
import { Inspection } from '../../../../../models/inspection.model';
import { ActivatedRoute } from '@angular/router';
import * as String from '../../../../../constants/strings';
import { AdminService } from '../../../../../services/admin.service';

@Component({
  selector: 'app-archived-inspections',
  templateUrl: './archived-inspections.component.html',
  styleUrls: ['./archived-inspections.component.scss'],
  providers: [AdminService]
})
export class ArchivedInspectionsComponent implements OnInit {
  title = 'Archived Inspections';

  emptyContent = {
    image: '../../assets/inspections.png',    
    message: String.EMPTY_ARCHIVED_INSPECTIONS,
  };

  isDesc: Boolean = false;
  direction: number;
  column: string;

  data: Array<Inspection> = [];

  fields: Array<any>;
  actions: Array<any>;


  constructor(private adminService: AdminService) {
    this.fields = ['title', 'project', 'submitted', 'team', 'inspector', 'actions'];
    this.actions = ['unarchive'];
  }

  ngOnInit() {
    this.sort('updatedAt');
    this.adminService.getArchivedReport()
      .then((results) => {
        this.data = results;
      });
  }

  sort(property: string) {
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
}
