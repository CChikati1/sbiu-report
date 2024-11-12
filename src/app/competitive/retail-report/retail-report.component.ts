import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/api-call.service';
import {  DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-retail-report',
  templateUrl: './retail-report.component.html',
  styleUrls: ['./retail-report.component.scss']
})
export class RetailReportComponent implements OnInit {
  urlSafe: SafeResourceUrl | undefined;
  item: any = [];
  isLoader: boolean = true;
  constructor(private apiservice: ApiCallService,public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.isLoader = true;
    this.apiservice.getReportURL("Retail").subscribe(res => {
      if (res != null && res !== '') {
        const data = res as any;
        this.item = data.d.results;
        this.isLoader = false;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.item[0].URL);
      }
    });
  }

}