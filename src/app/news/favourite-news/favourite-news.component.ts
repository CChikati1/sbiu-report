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

  markets: any = [];
  form: any;
  opcoData: { [key: string]: any[] } = {}; // Object to hold data split by OpCo
  opcoKeys: string[] = []; // List of OpCo keys for dynamic rendering
  opcoList: string[] = ['Grocery Retail', 'Retail', 'Entertainment', 'Real Estate', 'Economy'];

  search() {
    this.isLoader = true;
    this.filterredList = [];
    this.isLoader = false;
    // const selectedOpcos: string[] = this.form.get('opcoControl')?.value || [];
    const selectedMarkets: string[] = this.form.get('marketControl')?.value || [];
    // const fromDate: Date | null = this.form.get('fromDate')?.value || null;
    
    
    this.filterredList = this.newsListAll;
 
  if(selectedMarkets.length>0)
    {
    this.filterredList = this.filterredList.filter((item: FilteredItem) => 
      selectedMarkets.some(market => market.toLowerCase() === item.Market.toLowerCase())
    );
  }   

 
  const queryTextValue = this.queryText?.value;  // Get the value of the FormControl

  // Check if the queryText value is a string and not null or empty
  if (queryTextValue && typeof queryTextValue === 'string' && queryTextValue.trim().length > 0) {
    this.filterredList = this.filterredList.filter((item: FilteredItem) =>
      item.Heading.toLowerCase().includes(queryTextValue.toLowerCase())  // Perform case-insensitive filtering
    );
  }

  this.splitDataByOpCo();  
  }

  splitDataByOpCo(): void {
    // Clear existing data
    this.opcoData = {};
  
    // Get the top 10 latest records and add them as "Recent News"
    const recentNews = this.filterredList
      .filter((item: any) => item.Date)  // Filter out any item with undefined or null Date
      .sort((a: FilteredItem, b: FilteredItem) => {
        const dateA = new Date(a.Date).getTime();
        const dateB = new Date(b.Date).getTime();
        return dateB - dateA; // Sort by descending order of date
      })
      .slice(0, 10);  // Select the top 10 latest news
  
    // Add "Recent News" as a new OpCo category
    if (recentNews.length > 0) {
      this.opcoData['Recent News'] = recentNews;
    }
  
    // Initialize the "Others" category to collect items that do not match any known OpCo
    this.opcoData['Others'] = [];
  
    // Split the filteredList by OpCo, categorizing by opcoList or 'Others'
    this.filterredList.forEach((item: FilteredItem) => {
      const opco = item.OpCo;
  
      if (!opco) return; // Skip items with undefined or null OpCo
  
      // Case-insensitive comparison for OpCo
      const normalizedOpco = opco.trim().toLowerCase(); // Trim spaces and convert to lower case
      const normalizedOpcoList = this.opcoList.map(op => op.trim().toLowerCase()); // Normalize the opcoList
  
      // Check if OpCo exists in opcoList (case-insensitive)
      const matchingOpcoIndex = normalizedOpcoList.findIndex(op => op === normalizedOpco);
      if (matchingOpcoIndex !== -1) {
        const matchedOpco = this.opcoList[matchingOpcoIndex]; // Use exact match from opcoList (preserving case)
        
        // Add the item to the matched OpCo group
        if (!this.opcoData[matchedOpco]) {
          this.opcoData[matchedOpco] = [];
        }
        this.opcoData[matchedOpco].push(item);
  
        // If the item is part of the recent news, add it here as well
        if (recentNews.some((news:any) => news === item)) {
          if (!this.opcoData['Recent News']) {
            this.opcoData['Recent News'] = [];
          }
          this.opcoData['Recent News'].push(item);
        }
      } else {
        // If OpCo is not in opcoList, categorize it under 'Others'
        this.opcoData['Others'].push(item);
      }
    });
  
    // Remove 'Others' if no items match
    if (this.opcoData['Others'] && this.opcoData['Others'].length === 0) {
      delete this.opcoData['Others'];
    }
  
    // Sort opcoData keys to display them in a structured way
    this.opcoKeys = Object.keys(this.opcoData).sort((a, b) => {
      if (a === 'Recent News') return -1;  // Show Recent News at the top
      if (b === 'Recent News') return 1;
      if (a === 'Others') return 1;  // Show Others at the bottom
      if (b === 'Others') return -1;
      return a.localeCompare(b);  // Sort alphabetically for other categories
    });
  }
  

  getDistinctValues(arr: any[], key: string): string[] {
    const seen = new Set();
    return arr.filter(item => {
      const normalizedValue = item[key]?.toLowerCase();
      if (normalizedValue && !seen.has(normalizedValue)) {
        seen.add(normalizedValue);
        return true;
      }
      return false;
    }).map(item => item[key]);
  }

  convertDate(dateString: string): string {
    const [month, day, year] = dateString.split('/');
    const date = new Date(+year, +month - 1, +day);
    return this.datePipe.transform(date, 'fullDate') || '';
  }

  reset() {
    this.queryText = new FormControl('');
    // this.form.controls['opcoControl'].reset();
    this.form.controls['marketControl'].reset();
    // this.form.controls['fromDate'].reset();
    this.filterredList = [];
    this.filterredList = this.newsListAll;
    if(this.filterredList != null && this.filterredList != undefined && this.filterredList.length >0)
    {
      this.markets = this.getDistinctValues(this.filterredList, 'Market');
      this.splitDataByOpCo( );
      this.filterredList = this.filterredList.map((item: FilteredItem) => {
        // Check if item.Date is null, undefined, or invalid (empty string or invalid date)
        if (!item.Date || isNaN(new Date(item.Date).getTime())) {
          // Set FormattedDate to empty if Date is invalid
          item.FormattedDate = '';
        } else {
          // Otherwise, convert the valid Date
          item.FormattedDate = this.convertDate(item.Date);
        }
        return item;
      });
    } 
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

        this.markets = this.getDistinctValues(this.filterredList, 'Market');
        this.splitDataByOpCo();
        this.filterredList = this.filterredList.map((item: FilteredItem) => {
          // Check if item.Date is null, undefined, or invalid (empty string or invalid date)
          if (!item.Date || isNaN(new Date(item.Date).getTime())) {
            // Set FormattedDate to empty if Date is invalid
            item.FormattedDate = '';
          } else {
            // Otherwise, convert the valid Date
            item.FormattedDate = this.convertDate(item.Date);
          }
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
