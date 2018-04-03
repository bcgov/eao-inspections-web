import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoading = false;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.loading().subscribe(loading => {
      this.isLoading = loading;
    });
  }

}
