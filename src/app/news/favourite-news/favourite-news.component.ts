import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiCallService } from 'src/app/api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite-news',
  templateUrl: './favourite-news.component.html',
  styleUrls: ['./favourite-news.component.scss']
})

export class FavouriteNewsComponent  implements OnInit{
  loginUserName: string = 'Test@test.com';
  DisplayName: string = '';
  newsListAll: any = [];
  filterredList: any = [];
  isLoader: boolean = false;
  market = new FormControl('');
  businessUnit = new FormControl('');
  author = new FormControl('');
  industry = new FormControl('');
  queryText = new FormControl('');
  

  search() {
    this.isLoader = true;
    this.filterredList = [];
    this.isLoader = false;
    if (
      this.queryText.value == '' &&
      this.market.value == '' &&
      this.businessUnit.value == '' &&
      this.author.value == '' &&
      this.industry.value == ''
    ) {
      this.filterredList = this.newsListAll;
      this.isLoader = false;
    }
    else{
      if (this.queryText.value != null) {
        var query = this.queryText.value;
        this.apiservice.searchNewsFreeText(query).subscribe((res) => {
          if (res != null && res !== '') {
            const text = res as any;
            const arrayRowFilter =
              text.PrimaryQueryResult.RelevantResults.Table.Rows;
            for (const item of arrayRowFilter) {
              const itemID: number = Number(item.Cells[0].Value);
              const arrayFilter = this.newsListAll.filter(
                (report: { Id: number }) => report.Id === itemID
              );
              for (const item of arrayFilter) {
                this.filterredList.push(item);
              }
            }
            this.isLoader = false;
          }
        });
      } else {
        this.isLoader = false;
      }
    }
  }

  

  reset() {
    this.queryText = new FormControl('');
    this.filterredList = [];
    this.filterredList = this.newsListAll;
  }
  constructor(private apiservice: ApiCallService, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUser();
    
  }

  async getFavNewsListItems() {
    this.isLoader = true;
    this.apiservice.getNewsAllFavorites(this.loginUserName).subscribe((res) => {
      if (res != null && res !== '') {
        const data = res as any;
        this.newsListAll = data.d.results;
        this.filterredList = data.d.results;
        console.log(this.filterredList );
        this.isLoader = false;
      }
    });
  }

  async getCurrentUser() {
    this.apiservice.getUserName().subscribe((res) => {
      if (res != null && res !== '') {
        const user = res as any;
        this.loginUserName = user.d.Email;
        this.DisplayName = user.d.Title;
        this.getFavNewsListItems();
      }
    });
  }

  navigateDetailPage(item: any) {
    console.log(item);
    this.router.navigate(['/news/details'], {
      queryParams: { id: item.NewsID },
    });
  }

}
