import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { DescriptionComponent } from './report/description/description.component';
import { HttpClientModule, HttpClientJsonpModule, HttpClient } from '@angular/common/http';
import { DescriptionPipe } from './utlis/description.pipe';
import { MentionModule } from 'angular-mentions';
import { AllReportsComponent } from './report/all-reports/all-reports.component';
import { InternalReportsComponent } from './report/internal-reports/internal-reports.component';
import { ExternalReportsComponent } from './report/external-reports/external-reports.component';
import { FavouriteReportsComponent } from './report/favourite-reports/favourite-reports.component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { RetailReportComponent } from './competitive/retail-report/retail-report.component';
import { ShoppingMallsReportComponent } from './competitive/shopping-malls-report/shopping-malls-report.component';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './container/home/home.component';
import { GdpComponent } from './market/gdp/gdp.component';
import { HospitalityComponent } from './market/hospitality/hospitality.component';
import { PriceComponent } from './market/price/price.component';
import { SocialComponent } from './market/social/social.component';
import { TradeMoneyComponent } from './market/trade-money/trade-money.component';
import { OthersComponent } from './market/others/others.component';
import { CityComponent } from './market/city/city.component';
import {MatInputModule} from '@angular/material/input';
import { AllnewsComponent } from './news/allnews/allnews.component';
import { DetailsComponent } from './news/details/details.component';
import { FavouriteNewsComponent } from './news/favourite-news/favourite-news.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    DescriptionComponent,
    DescriptionPipe,
    AllReportsComponent,
    InternalReportsComponent,
    ExternalReportsComponent,
    FavouriteReportsComponent,
    RetailReportComponent,
    ShoppingMallsReportComponent,
    HomeComponent,
    GdpComponent,
    HospitalityComponent,
    PriceComponent,
    SocialComponent,
    TradeMoneyComponent,
    OthersComponent,
    CityComponent,
    AllnewsComponent,
    DetailsComponent,
    FavouriteNewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    FlexLayoutModule,
    LayoutModule,
    MatCardModule,
    MentionModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule, 
    MatSelectModule, 
    ReactiveFormsModule,
    MatExpansionModule,
    MatMenuModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
