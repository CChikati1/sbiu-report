import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/api-call.service';
import {  DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-consumerspending',
  templateUrl: './exchangerates.component.html',
  styleUrls: ['./exchangerates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  urlSafe: SafeResourceUrl | undefined;
  item: any = [];
  isLoader: boolean = true;
  constructor(private apiservice: ApiCallService,public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.isLoader = true;
    this.apiservice.getReportURL("ExchangeRates").subscribe(res => {
      if (res != null && res !== '') {
        const data = res as any;
        this.item = data.d.results;
        this.isLoader = false;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.item[0].URL);
      }
    });
  }

}