import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from 'src/app/api-call.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Location,DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [DatePipe]
})

export class DetailsComponent implements OnInit {
  loginUserName: string = 'Test@test.com';
  DisplayName: string = '';
  id: number = 0;
  newsDetails: any = {};
  tagList: any = [];
  commentsList: any = [];
  attachmentList: any = [];
  descriptionHtmlContent: SafeHtml = "";
  keyinsightsHtmlContent: SafeHtml = "";
  comments: any = [];
  textComments: string = '';
  //name = 'angular-mentions';
  // items: string[] = ["Noah", "Liam", "Mason", "Jacob"];
  items: any =[];
  isLoader: boolean = false;
  favFlag: boolean = false;

  constructor(private route: ActivatedRoute,private apiservice: ApiCallService,private sanitizer: DomSanitizer, private router: Router,private _location: Location,private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.getCurrentUser();
      this.apiservice.getDigestValue();
      this.getNewsDetails();
      this.getnewsComments();
      this.getUsers();
    });
  }

  getUsers(){
    this.apiservice.getUsers().subscribe((res) => {
      if (res != null && res !== '') {
        const data = res as any;
        this.items = data.d.results;
        data.d.results.forEach((object: any) => {
          var item: any = {};
          item.Title = object.Title;
          item.Email = object.Email;
          item.Label = object.Title +" <" + object.Email +"> ";
          this.items.push(item);
        });
      }
  });
  }

  getNewsDetails(){
    this.apiservice.getNewsDetails(this.id).subscribe((res) => {
      if (res != null && res !== '') {
        const data = res as any;
        this.newsDetails = data.d.results[0];
        if (!this.newsDetails.Date || isNaN(new Date(this.newsDetails.Date).getTime())) {
          // Set FormattedDate to empty if Date is invalid
          this.newsDetails.FormattedDate = '';
        } else {
          // Otherwise, convert the valid Date
          this.newsDetails.FormattedDate =  this.convertDate(this.newsDetails.Date);
        }    
        this.descriptionHtmlContent = this.sanitizer.bypassSecurityTrustHtml(this.newsDetails.Paragraph);
       
        this.getFavorites();
      }
  });
  }
  
  convertDate(dateString: string): string {
    const [month, day, year] = dateString.split('/');
    const date = new Date(+year, +month - 1, +day);
    return this.datePipe.transform(date, 'fullDate') || '';
  }
submitComments(){
  this.isLoader = true;
  const result = this.extractWordsBetweenChars(this.textComments,"@",">");
  const emailData = this.extractWordsBetweenChars(this.textComments,"<",">");
  var i: number = 0;
  var comments: string = this.textComments
  var userEmailsToMention: any =[];
  result.forEach((obj: any )=> {
    comments = comments.replace("@"+obj + "> ", "@mention{"+i+"}");
    i++;
  });
  emailData.forEach((obj) => {
    var item: any = {};
    item.email = obj;
    userEmailsToMention.push(item);
  });
  
  this.apiservice.addComments(this.id,userEmailsToMention,comments,'News').subscribe((res) => {
    if (res != null && res !== '') {
      this.textComments = "";
      this.getnewsComments();
    }
  });
}

 extractWordsBetweenChars(str: string, startChar: string, endChar: string) {
  const regex = new RegExp(`\\${startChar}(.*?)\\${endChar}`, 'g');
  const matches = [];
  let match;
  while ((match = regex.exec(str)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}


removeAllTextAfterSubstring(str: string, substring: string) {
  const index = str.indexOf(substring);
  if (index !== -1) {
    return str.substring(0, index + substring.length);
  }
  return str;
}

  getnewsComments() {
    this.isLoader = true;
    this.comments = [];
    this.apiservice.getComments(this.id,'News').subscribe((res) => {
      if (res != null && res !== '') {
        const data = res as any;
        this.commentsList = data.d.results;
        this.commentsList.forEach((object: any) => {
          var item: any ={};
          if(object.mentions.results.length == 0){
            item.author = object.author.name;
            item.createdDate = object.createdDate;
            item.text = object.text;
          }
          else {
            item.author = object.author.name;
            item.createdDate = object.createdDate;
            var text = object.text;
            var i = 0;
            object.mentions.results.forEach((obj: any) => {
              text = text.replace("@mention&#123;"+ i +"&#125;", "<i>@" + obj.name +"</i>");
              i++;
            });
            item.text = text;
          }
          item.text = this.removeAllTextAfterSubstring(item.text,"Visit https&#58;//majidalfuttaim.sharepoint.com");
          item.text = item.text.replace("Visit https&#58;//majidalfuttaim.sharepoint.com","");
          this.comments.push(item); 
        });
        this.isLoader = false;
      }
    });
  }
  
  goBack(): void {
    this._location.back();
  }

  async getCurrentUser() {
    this.apiservice.getUserName().subscribe((res) => {
      if (res != null && res !== '') {
        const user = res as any;
        this.loginUserName = user.d.Email;
        this.DisplayName = user.d.Title;
      }
    });
  }
  
  addFavorites(){
    this.isLoader = true;
    this.apiservice.addFavorites(this.newsDetails,this.loginUserName,'News').subscribe((res)=>{
      this.isLoader = false;
      this.getFavorites();
    })
  }

  RemoveFavorites(){
    this.isLoader = true;
    this.apiservice.addFavorites(this.newsDetails,this.loginUserName,'News').subscribe((res)=>{
      this.isLoader = false;
      this.getFavorites();
    })
  }

  getFavorites(){
    this.favFlag = false;
    this.apiservice.getNewsFavorites(this.loginUserName,this.id).subscribe((res)=>{
      if (res != null && res !== '') {
        const user = res as any;
        if(user.d.results.length == 0)
          this.favFlag = true;
        else
          this.favFlag = false;
        this.isLoader = false;
      }
    });
  }

}

