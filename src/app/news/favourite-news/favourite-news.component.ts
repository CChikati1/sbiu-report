import { Component, OnInit } from '@angular/core';
import { FormControl , FormBuilder} from '@angular/forms';
import { ApiCallService } from 'src/app/api-call.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

interface FilteredItem {
  Date: string;  // assuming the date is a string initially
  Heading:string,
  Paragraph : string,
  FormattedDate: string,
  OpCo: string,
  Market:string,
  ImageUrl:string  
}

@Component({
  selector: 'app-favourite-news',
  templateUrl: './favourite-news.component.html',
  styleUrls: ['./favourite-news.component.scss'],
  providers: [DatePipe]
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
  opcos: any = [];
  markets: any = [];
  form: any;
  opcoData: { [key: string]: any[] } = {}; // Object to hold data split by OpCo
  opcoKeys: string[] = []; // List of OpCo keys for dynamic rendering

  search() {
    this.isLoader = true;
    this.filterredList = [];
    this.isLoader = false;
    const selectedOpcos: string[] = this.form.get('opcoControl')?.value || [];
    const selectedMarkets: string[] = this.form.get('marketControl')?.value || [];
    const fromDate: Date | null = this.form.get('fromDate')?.value || null;
    
    
    this.filterredList = this.newsListAll;
    if(selectedOpcos.length>0)
    {
      this.filterredList = this.filterredList.filter((item: FilteredItem) => 
      selectedOpcos.some(opco => opco.toLowerCase() === item.OpCo.toLowerCase())
    );
  }
  if(selectedMarkets.length>0)
    {
    this.filterredList = this.filterredList.filter((item: FilteredItem) => 
      selectedMarkets.some(market => market.toLowerCase() === item.Market.toLowerCase())
    );
  }   

  if (fromDate) {
    const fromDateObj = new Date(fromDate); // Convert FromDate to Date object if it's a string
    this.filterredList = this.filterredList.filter((item: FilteredItem) => {
      const itemDate = new Date(item.Date); // Assuming FormattedDate is a string or Date object
      return itemDate >= fromDateObj;
    });
  }
  var opco = this.getDistinctValues(this.filterredList, 'OpCo');
  // this.markets = this.getDistinctValues(this.filterredList, 'Market');
  this.splitDataByOpCo(opco);  
  }

  splitDataByOpCo(opcos: any): void {
    // Clear existing data
    this.opcoData = {};
  
    // Split the filteredList by OpCo
    this.filterredList.forEach((item: FilteredItem) => {
      const opco = item.OpCo;
      if (!this.opcoData[opco]) {
        this.opcoData[opco] = [];
      }
      this.opcoData[opco].push(item);
    });
  
    // Sort each OpCo's data by date in descending order
    Object.keys(this.opcoData).forEach((opco) => {
      this.opcoData[opco].sort((a: FilteredItem, b: FilteredItem) => {
        return new Date(b.Date).getTime() - new Date(a.Date).getTime();
      });
    });
  
    // Extract OpCo keys for rendering
    this.opcoKeys = Object.keys(this.opcoData);
  }
  

  

  getDistinctValues(arr: any[], key: string): string[] {
    return [...new Set(arr.map(item => item[key]))];
  }

  convertDate(dateString: string): string {
    const [month, day, year] = dateString.split('/');
    const date = new Date(+year, +month - 1, +day);
    return this.datePipe.transform(date, 'fullDate') || '';
  }

  reset() {
    this.queryText = new FormControl('');
    this.form.controls['opcoControl'].reset();
    this.form.controls['marketControl'].reset();
    this.form.controls['fromDate'].reset();
    this.filterredList = [];
    this.filterredList = this.newsListAll;
    this.opcos = this.getDistinctValues(this.filterredList, 'OpCo');
    this.markets = this.getDistinctValues(this.filterredList, 'Market');
    this.splitDataByOpCo(this.opcos );
    this.filterredList = this.filterredList.map((item: FilteredItem) => {
      item.FormattedDate = this.convertDate(item.Date);
      return item;
    });    
  }
  constructor(private apiservice: ApiCallService, private router: Router, private datePipe: DatePipe,private fb: FormBuilder) {
    this.form = this.fb.group({
      opcoControl: [[]], // Initialize with an empty array for the multi-select
      marketControl: [[]], // Initialize with an empty array for the multi-select
      fromDate: [''] // Initialize the date control
  });
  }

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
        this.opcos = this.getDistinctValues(this.filterredList, 'OpCo');
        this.markets = this.getDistinctValues(this.filterredList, 'Market');
        this.splitDataByOpCo(this.opcos );
        this.filterredList = this.filterredList.map((item: FilteredItem) => {
          item.FormattedDate = this.convertDate(item.Date);
          return item;
        });        
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
