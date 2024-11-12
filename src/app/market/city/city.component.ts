import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/api-call.service';
import {  DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent  implements OnInit {
  urlSafe: SafeResourceUrl | undefined;
  item: any = [];
  isLoader: boolean = true;
  constructor(private apiservice: ApiCallService,public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.isLoader = true;
    this.apiservice.getReportURL("City").subscribe(res => {
      if (res != null && res !== '') {
        const data = res as any;
        this.item = data.d.results;
        this.isLoader = false;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.item[0].URL);
      }
    });
  }

}