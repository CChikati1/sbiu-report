import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/api-call.service';
interface Report {
  Industry: any;
  Title: string;
  ShortDescriptio: string;
  Authors: string;
  PublicationDate: string;
  ReportType: string;
  ImageUrl?: string;
  FormattedDate?: string;
}

@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.scss'],
})



export class AllReportsComponent implements OnInit {
  loginUserName: string = 'Test@test.com';
  DisplayName: string = '';
  reportListAll: any = [];
  filterredList: any = [];
  isLoader: boolean = false;
  market = new FormControl('');
  businessUnit = new FormControl('');
  author = new FormControl('');
  industry = new FormControl('');
  queryText = new FormControl('');
  reportData: { [key: string]: Report[] } = {};
  reportKeys: string[] = [];
  marketList: string[] = [
    'UAE',
    'KSA',
    'Global',
    'Dubai',
    'Riyadh',
    'GCC',
    'MENA',
    'Egypt',
    'Kuwait',
    'Oman',
    'Qatar',
    'Bahrain',
    'USA',
    'Middle East',
    'Europe',
  ];
  businessUnitList: string[] = [
    'Banking',
    'Banks',
    'Company Research',
    'Consumer & Retail',
    'Country Rating',
    'Credit Rating',
    'Economy',
    'ESG', 
    'Sustainable', 
    'Sustainability',
    'Grocery Retail',
    'Holding',
    'Hospitality',
    'Infrastructure',
    'IPO',
    'Macro-Economic',
    'Office',
    'Real Estate',
    'Residential',
    'Real Estate',
    'Retail',
    'Tourism',
  ];
  authorList: string[] = [
    'Alpen Capital',
    'CBRE',
    'EFG Hermes',
    'EIU',
    'Emirates NBD',
    'Euromonitor',
    'Fitch',
    'HSBC',
    'IMF',
    'International Advisory Group',
    'Kamco Invest',
    'Knight Frank',
    'MAF',
    'McKinsey & Company',
    'Moodys',
    'PWC',
    'S&P',
    'Saudi Aramco',
    'Savills Research',
    'Spinneys',
    'United Securities LLC',
  ];
  industryList: string[] = [
    'Banking',
    'Consumer',
    'Consumer & Retail',
    'Country Risk',
    'Credit Rating',
    'Economy',
    'ESG - Holding ',
    'Hospitality',
    'Infrastructure',
    'Macroeconomic',
    'Oil',
    'Real Estate',
    'Retail',
    'Sustainability',
    'Tourism',
  ];

  search() {
    console.log("Search starts");
    this.isLoader = true;
    this.filterredList = [];
    this.filterRow();
    this.isLoader = false;
    console.log("Search emd");
    if (
      this.queryText.value == '' &&
      this.market.value == '' &&
      this.businessUnit.value == '' &&
      this.author.value == '' &&
      this.industry.value == ''
    ) {
      this.filterredList = this.reportListAll;
      this.isLoader = false;
    }
    else{
      if (this.queryText.value != null && this.queryText.value != '') {
        var query = this.queryText.value;
        this.apiservice.searchFreeText(query).subscribe((res) => {
          if (res != null && res !== '') {
            const text = res as any;
            const arrayRowFilter =
              text.PrimaryQueryResult.RelevantResults.Table.Rows;
            for (const item of arrayRowFilter) {
              const itemID: number = Number(item.Cells[0].Value);
              const arrayFilter = this.reportListAll.filter(
                (report: { Id: number }) => report.Id === itemID
              );
              for (const item of arrayFilter) {
                this.filterredList.push(item);
              }
            }
            this.filterRow();
            this.isLoader = false;
          }
        });
      } else {
        this.filterRow();
        this.isLoader = false;
      }
    }
    this.groupReportsByReportType();
  }

  filterRow() {
    const selectedMarketList = this.market.value;
    console.log(this.reportListAll);
    if (Array.isArray(selectedMarketList)) {
      selectedMarketList.forEach((market: string) => {
        const arrayFilter = this.reportListAll.filter(
          (report: { Market: { results: string[] } }) =>
            report.Market.results.includes(market)
        );
        for (const item of arrayFilter) {
          this.filterredList.push(item);
        }
      //  this.groupReportsByReportType();
      });
    }
    
    const selectedBusinessUnit = this.businessUnit.value;
    console.log(selectedBusinessUnit);
    if (Array.isArray(selectedBusinessUnit)) {
      selectedBusinessUnit.forEach((businessUnit: string) => {
        const arrayFilter = this.reportListAll.filter(
          (report: { BusinessUnit: { results: string[] } }) =>
            report.BusinessUnit.results.includes(businessUnit)
        );
        for (const item of arrayFilter) {
          this.filterredList.push(item);
        }
      //  this.groupReportsByReportType();
      });
    }

    const selectedAuthors = this.author.value;
    if (Array.isArray(selectedAuthors)) {
      selectedAuthors.forEach((author: string) => {
        const arrayFilter = this.reportListAll.filter(
          (report: { Authors: string }) => report.Authors === author
        );
        for (const item of arrayFilter) {
          this.filterredList.push(item);
        }
       // this.groupReportsByReportType();
      });
    }

    const selectedIndustry = this.industry.value;
    if (Array.isArray(selectedIndustry)) {
      selectedIndustry.forEach((industry: string) => {
        const arrayFilter = this.reportListAll.filter(
          (report: { Industry: string }) => report.Industry === industry
        );
        for (const item of arrayFilter) {
          this.filterredList.push(item);
        }
       // this.groupReportsByReportType();
      });
    }
  }

  reset() {
    this.market = new FormControl('');
    this.author = new FormControl('');
    this.industry = new FormControl('');
    this.businessUnit = new FormControl('');
    this.queryText = new FormControl('');
    this.filterredList = [];
    this.filterredList = this.reportListAll;
    this.groupReportsByReportType();
  }

  constructor(private apiservice: ApiCallService, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getReportsListItems();
  }

  async getReportsListItems() {
    this.isLoader = true;
    this.apiservice.getAllReportsListItem().subscribe((res) => {
      if (res != null && res !== '') {
        const data = res as any;
        this.reportListAll = data.d.results;
        this.filterredList = data.d.results;
        this.groupReportsByReportType();
        this.isLoader = false;
      }
    });
  }

  groupReportsByReportType() {
    this.reportData = {};
    this.reportKeys = [];
    this.reportData = this.filterredList.reduce((groups: { [x: string]: Report[]; }, report: Report) => {
      const reportelm = report.ReportType; // Assuming "Industry" represents "report"
      if (!groups[reportelm]) {
        groups[reportelm] = [];
      }
      groups[reportelm].push(report);
      return groups;
    }, {} as { [key: string]: Report[] });
  
    this.reportKeys = Object.keys(this.reportData); // Get the list of report keys
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

  navigateDetailPage(item: any) {
    this.router.navigate(['/reports/detail-page'], {
      queryParams: { id: item.ID },
    });
  }
}
