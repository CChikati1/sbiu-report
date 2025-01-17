import { Component } from '@angular/core';
import { ApiCallService } from 'src/app/api-call.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-document-qa',
  templateUrl: './document-qa.component.html',
  styleUrls: ['./document-qa.component.scss']
})
export class DocumentQaComponent {
 
  urlSafe: SafeResourceUrl | undefined;
  item: any = [];
  isLoader: boolean = true;
  constructor(private apiservice: ApiCallService,public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.isLoader = true;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl("https://appsbiumafgsprodun01.azurewebsites.net/");
   this.isLoader= false;
  }
}
